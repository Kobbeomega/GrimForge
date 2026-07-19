import { Component, type ErrorInfo, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("GrimForge UI error", error, info);
  }

  private reload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="app-crash" role="alert">
        <div className="app-crash__panel">
          <span>Die Schmiede ist ins Stocken geraten</span>
          <h1>GrimForge konnte diese Ansicht nicht laden.</h1>
          <p>Deine lokal gespeicherten Charaktere bleiben erhalten. Lade die Anwendung neu und versuche es erneut.</p>
          <button type="button" onClick={this.reload}>Anwendung neu laden</button>
        </div>
      </main>
    );
  }
}
