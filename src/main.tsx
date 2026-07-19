import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AppErrorBoundary } from "./components/ui/AppErrorBoundary";

import { CharacterProvider } from "./store/CharacterContext";

if (import.meta.env.DEV) {
  void import("./dev/contentAudit").then(({ runContentAudit }) => {
    runContentAudit();
  });
  void import("./dev/ruleCoverageAudit").then(({ runRuleCoverageAudit }) => {
    runRuleCoverageAudit();
  });
}

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>

    <CharacterProvider>

      <AppErrorBoundary><App /></AppErrorBoundary>

    </CharacterProvider>

  </React.StrictMode>,
);