import { NavLink, Outlet } from "react-router-dom";

const nav = [
  { to: "/admin",             label: "Overview",    icon: "◈" },
  { to: "/admin/dishes",      label: "Dishes",      icon: "☰" },
  { to: "/admin/reviews",     label: "Reviews",     icon: "★" },
  { to: "/admin/performance", label: "Performance", icon: "↑" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-zinc-800 flex flex-col">
        <div className="px-5 py-6 border-b border-zinc-800">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Social Proof</p>
          <p className="text-white font-bold text-lg mt-0.5">Admin</p>
        </div>
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {nav.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`
              }
            >
              <span className="text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-zinc-800 flex flex-col gap-2">
          <a href="/menu" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">← Customer menu</a>
          <a href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">← Landing page</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
