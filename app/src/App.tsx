import "./App.css";
import { useState } from "react";
import TopBar from "./components/navbar/TopBar";
import { ThemeProvider } from "./components/theme/Theme";
import Welcome from "./steps/welcome/Welcome";
import WiFi from "./steps/wifi/WiFi";

type InstallerStep = "welcome" | "wifi";

function App() {
  const [step, setStep] = useState<InstallerStep>("welcome");

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-(--app-bg) text-(--app-fg)">
        <TopBar />
        {step === "welcome" ? (
          <Welcome onStartInstallation={() => setStep("wifi")} />
        ) : (
          <WiFi />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
