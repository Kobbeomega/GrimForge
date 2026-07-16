import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { CharacterProvider } from "./store/CharacterContext";

if (import.meta.env.DEV) {
  void import("./dev/contentAudit").then(({ runContentAudit }) => {
    runContentAudit();
  });
}

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>

    <CharacterProvider>

      <App />

    </CharacterProvider>

  </React.StrictMode>,
);