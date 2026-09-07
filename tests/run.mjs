import { build } from "vite";
import { spawnSync } from "node:child_process";
await build({ configFile: false, logLevel: "warn", build: {
  ssr: "tests/levelUp.test.ts", outDir: ".test-build", emptyOutDir: true,
} });
const result = spawnSync(process.execPath, ["--test", ".test-build/levelUp.test.js"], { stdio: "inherit" });
process.exitCode = result.status ?? 1;
