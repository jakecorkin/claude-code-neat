import { useMenu } from "../../context/MenuContext";

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2">{label}</p>
      <p className="text-white text-4xl font-black">{value}</p>
      {sub && <p className="text-zinc-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function OverviewPage() {
  const { dishes, reviews, getLiveRating } = useMenu();

  const active = dishes.filter((d) => d.status === "active");
  const retiring = dishes.filter((d) => d.status === "retiring");
  const archived = dishes.filter((d) => d.status === "archived");

  const totalReviews = Object.values(reviews).flat().length;
  const totalSoldWeek = dishes.reduce((s, d) => s + (d.stats?.soldThisWeek ?? 0), 0);

  const ratingsWithData = dishes
    .map((d) => getLiveRating(d.id) ?? d.rating?.average)
    .filter(Boolean);
  const avgRating = ratingsWithData.length
    ? (ratingsWithData.reduce((a, b) => a + b, 0) / ratingsWithData.length).toFixed(1)
    : "—";

  const topDish = [...dishes]
    .filter((d) => d.status === "active")
    .sort((a, b) => (b.stats?.soldThisWeek ?? 0) - (a.stats?.soldThisWeek ?? 0))[0];

  const lowestRated = [...dishes]
    .filter((d) => d.status === "active")
    .sort((a, b) => {
      const ra = getLiveRating(a.id) ?? a.rating?.average ?? 5;
      const rb = getLiveRating(b.id) ?? b.rating?.average ?? 5;
      return ra - rb;
    })[0];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Overview</h1>
        <p className="text-zinc-500 text-sm mt-1">Live snapshot of your menu performance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard label="Active Dishes" value={active.length} sub={`${retiring.length} retiring · ${archived.length} archived`} />
        <StatCard label="Sold This Week" value={totalSoldWeek.toLocaleString()} sub="across all dishes" />
        <StatCard label="Avg Rating" value={avgRating} sub={`from ${totalReviews} reviews`} />
        <StatCard label="Total Reviews" value={totalReviews} sub="all dishes" />
      </div>

      {/* Callouts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {topDish && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">This Week's Top Seller</p>
            <p className="text-white font-bold text-xl">{topDish.name}</p>
            <p className="text-zinc-400 text-sm mt-1">
              {topDish.stats.soldThisWeek.toLocaleString()} sold · {topDish.category}
            </p>
            {topDish.stats.badge && (
              <span className="inline-block mt-3 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                {topDish.stats.badge}
              </span>
            )}
          </div>
        )}
        {lowestRated && (
          <div className="bg-zinc-900 border border-rose-900 rounded-2xl p-6">
            <p className="text-xs text-rose-400 uppercase tracking-wider font-semibold mb-3">Lowest Rated — Consider Retiring</p>
            <p className="text-white font-bold text-xl">{lowestRated.name}</p>
            <p className="text-zinc-400 text-sm mt-1">
              {(getLiveRating(lowestRated.id) ?? lowestRated.rating?.average ?? "—")} avg rating · {lowestRated.stats.soldThisWeek} sold this week
            </p>
            <a
              href="/admin/performance"
              className="inline-block mt-3 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              View performance table →
            </a>
          </div>
        )}
      </div>

      {/* POS Integration notice */}
      <div className="mt-6 border border-dashed border-zinc-700 rounded-2xl px-6 py-5 flex items-start gap-4">
        <span className="text-2xl mt-0.5">🔌</span>
        <div>
          <p className="text-white font-semibold text-sm">Toast POS Integration</p>
          <p className="text-zinc-500 text-xs mt-1">
            Sales data is currently mocked. When connected to Toast, sold counts will update automatically via webhook.
            Each dish has a <code className="text-zinc-400">posItemId</code> field ready for mapping.
          </p>
        </div>
      </div>
    </div>
  );
}
