import { RocketIcon } from "lucide-react";
import { motion } from "framer-motion";

type WelcomeProps = {
  onStartInstallation: () => void;
};

function Welcome({ onStartInstallation }: WelcomeProps) {
  return (
    <div className="flex flex-1 items-center justify-center bg-(--app-bg)">
      <div className="flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h1 className="text-5xl font-[grbold] text-(--app-accent)">
            Welcome to Kwimy Installer!
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <button
            onClick={onStartInstallation}
            type="button"
            className="inline-flex cursor-pointer items-center gap-x-3 rounded-md border border-(--app-border) bg-(--app-surface) px-6 py-3 text-xl font-[grbold] text-(--app-fg) transition hover:brightness-110 focus:outline-none"
          >
            <RocketIcon className="size-6 text-(--app-yellow) shrink-0 stroke-2" />
            Start Installation
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Welcome;
