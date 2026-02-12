import Sidebar from "../../components/sidebar/Sidebar";

function WiFi() {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-(--app-bg) px-4 pb-4 lg:flex-row lg:gap-4">
      <div className="shrink-0 lg:w-72">
        <Sidebar />
      </div>
      <main className="flex flex-1 items-center justify-center rounded-2xl border border-(--app-border) p-8">
        <h1 className="text-5xl font-[grbold] text-(--app-accent)">
          WiFi Page
        </h1>
      </main>
    </div>
  );
}

export default WiFi;
