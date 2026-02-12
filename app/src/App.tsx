import "./App.css";
import TopBar from "./components/navbar/TopBar";
import { ThemeProvider } from "./components/theme/Theme";
import Welcome from "./steps/welcome/Welcome";

function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-(--app-bg) text-(--app-fg)">
        <TopBar />
        <Welcome />
      </div>
    </ThemeProvider>
  );
}

export default App;
