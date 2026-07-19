import { auditContent, type AuditIssue } from "./contentAudit";
import { getRuleCoverageReport, type RuleCoverageCheck } from "./ruleCoverageAudit";
import { phase1Coverage } from "../content/phase1";
import { migrateCharacterArchiveEntry } from "../migrations/characterSchema";
import type { CharacterArchiveEntry } from "../modules/archives/types";

export interface ProjectHealthReport {
  generatedAt: string;
  content: ReturnType<typeof auditContent>;
  rules: RuleCoverageCheck[];
  migration: {
    ok: boolean;
    details: string;
  };
  phase1Pending: Record<string, number>;
  passed: number;
  failed: number;
}

function verifyMigrationIdempotence(): ProjectHealthReport["migration"] {
  const fixture: CharacterArchiveEntry = {
    id: "rc1-migration-fixture",
    fileNumber: "RC1",
    name: "Prüfakte",
    ancestry: "Mensch",
    ancestryId: "human",
    className: "Kämpfer",
    classId: "fighter",
    level: 1,
    summary: "Interner RC1-Migrationstest",
    status: "draft",
    updatedAt: "2026-01-01T00:00:00.000Z",
    abilityScores: {
      strength: 15,
      dexterity: 14,
      constitution: 13,
      intelligence: 12,
      wisdom: 10,
      charisma: 8,
    },
  };

  const first = migrateCharacterArchiveEntry(fixture).character;
  const second = migrateCharacterArchiveEntry(first).character;
  const stable = JSON.stringify({
    schemaVersion: first.schemaVersion,
    baseAbilityScores: first.baseAbilityScores,
    abilityScores: first.abilityScores,
    ancestryBonusChoices: first.ancestryBonusChoices,
    equipmentIds: first.equipmentIds,
  }) === JSON.stringify({
    schemaVersion: second.schemaVersion,
    baseAbilityScores: second.baseAbilityScores,
    abilityScores: second.abilityScores,
    ancestryBonusChoices: second.ancestryBonusChoices,
    equipmentIds: second.equipmentIds,
  });

  return {
    ok: stable,
    details: stable
      ? "Migration ist bei wiederholtem Laden stabil."
      : "Migration verändert eine bereits migrierte Akte erneut.",
  };
}

export function getProjectHealthReport(): ProjectHealthReport {
  const content = auditContent();
  const rules = getRuleCoverageReport();
  const migration = verifyMigrationIdempotence();
  const failedRules = rules.filter((entry) => !entry.ok).length;
  const failed = content.issues.length + failedRules + (migration.ok ? 0 : 1);
  const passed = rules.length - failedRules + (migration.ok ? 1 : 0);

  return {
    generatedAt: new Date().toISOString(),
    content,
    rules,
    migration,
    phase1Pending: phase1Coverage.pendingForPhase2,
    passed,
    failed,
  };
}

export function runProjectHealthAudit(): void {
  const report = getProjectHealthReport();
  const title = `[GrimForge RC1 Health] ${report.failed === 0 ? "OK" : `${report.failed} Hinweise`}`;
  console.groupCollapsed(title);
  console.table(report.rules);
  console.info("Migration", report.migration);
  if (report.content.issues.length > 0) console.table(report.content.issues);
  console.info("Bestand", report.content.totals);
  console.info("Offen aus Phase 1", report.phase1Pending);
  console.groupEnd();
}

export type { AuditIssue };
