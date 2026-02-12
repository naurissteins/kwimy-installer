import Theme from "../theme/Theme";

function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-(--app-border)/20 bg-(--app-background) px-4 py-3">
      <span className="font-[grbold] text-2xl text-(--app-magenta)">Kwimy</span>
      <Theme />
    </header>
  );
}

export default TopBar;
