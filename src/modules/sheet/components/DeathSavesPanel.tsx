import type { CharacterVitals, DeathSaves } from "../../archives/types";

export function DeathSavesPanel({ vitals, saves, onMark, onReset }: {
  vitals: CharacterVitals;
  saves: DeathSaves;
  onMark: (type: "success" | "failure") => void;
  onReset: () => void;
}) {
  const active = vitals.currentHitPoints === 0;
  const finished = saves.successes >= 3 || saves.failures >= 3;
  return <section className="gf-death-saves" aria-label="Todesrettungswürfe">
    <div className="gf-death-saves__head">
      <h3>Todesrettungswürfe</h3>
      <span>{!active ? "Nur bei 0 TP erforderlich" : saves.successes >= 3 ? "Stabil (0 TP)" : saves.failures >= 3 ? "3 Fehlschläge · SL entscheiden lassen" : "Bei 0 TP"}</span>
    </div>
    <div className="gf-death-saves__tracks">
      <div><strong>Erfolge</strong><span aria-label={`${saves.successes} von 3 Erfolgen`}>{[1, 2, 3].map((value) => <span key={value} className={value <= saves.successes ? "gf-death-saves__success" : ""} aria-hidden="true" />)}</span>
        <button type="button" disabled={!active || finished} onClick={() => onMark("success")}>+ Erfolg</button></div>
      <div><strong>Fehlschläge</strong><span aria-label={`${saves.failures} von 3 Fehlschlägen`}>{[1, 2, 3].map((value) => <span key={value} className={value <= saves.failures ? "gf-death-saves__failure" : ""} aria-hidden="true" />)}</span>
        <button type="button" disabled={!active || finished} onClick={() => onMark("failure")}>+ Fehlschlag</button></div>
    </div>
    <div className="gf-death-saves__actions">
      <button type="button" disabled={saves.successes === 0 && saves.failures === 0} onClick={onReset}>Zurücksetzen</button>
    </div>
    <p>Eine natürliche 1 zählt als zwei Fehlschläge, eine natürliche 20 gibt 1 TP zurück. Bei anderen Würfen ist 10 oder höher ein Erfolg.</p>
  </section>;
}
