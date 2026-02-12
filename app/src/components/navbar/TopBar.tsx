import Theme from "../theme/Theme";

function TopBar() {
  return (
    <header className="flex items-center justify-between border border-(--app-border) bg-(--app-background) m-4 rounded-2xl px-4 py-3">
      <span className="font-[grbold] text-2xl text-(--app-magenta)">Kwimy</span>
      <Theme />
    </header>
  );
}

export default TopBar;
