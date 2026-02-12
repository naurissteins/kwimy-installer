import {
  NetworkIcon,
  HardDriveIcon,
  CheckIcon,
  GlobeIcon,
  KeyboardIcon,
  type LucideIcon,
} from "lucide-react";

type NavigationItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  done: boolean;
  current: boolean;
};

const navigation: NavigationItem[] = [
  {
    name: "Network",
    href: "#",
    icon: NetworkIcon,
    done: true,
    current: true,
  },
  {
    name: "Select Disk",
    href: "#",
    icon: HardDriveIcon,
    done: false,
    current: false,
  },
  {
    name: "Location",
    href: "#",
    icon: GlobeIcon,
    done: false,
    current: false,
  },
  {
    name: "Keymap",
    href: "#",
    icon: KeyboardIcon,
    done: false,
    current: false,
  },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  return (
    <aside className="h-full w-full b-4 border rounded-2xl border-(--app-border)  p-4">
      <nav aria-label="Sidebar" className="flex flex-1 flex-col">
        <ul role="list" className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-white/3 text-(--app-accent) shadow-sm ring-1 ring-inset ring-white/5"
                    : "text-(--app-fg) hover:bg-white/3 hover:text-(--app-accent)",
                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold hover:shadow-sm hover:ring-1 hover:ring-inset hover:ring-white/5",
                )}
              >
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    item.current
                      ? "text-(--app-accent)"
                      : "text-(--app-fg)/70 group-hover:text-(--app-accent)",
                    "size-6 shrink-0",
                  )}
                />
                {item.name}
                {item.done ? (
                  <span
                    aria-hidden="true"
                    className="ml-auto min-w-max rounded-full bg-white/5 px-1.5 py-1.5 text-center text-xs/5 font-medium whitespace-nowrap text-(--app-fg) ring-1 ring-(--app-green)/30 ring-inset"
                  >
                    <CheckIcon className="size-3 text-(--app-green) shrink-0 stroke-2" />
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
