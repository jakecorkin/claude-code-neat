import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";

const SORT_OPTIONS = [
  { key: "rating",    label: "Rating (low → high)" },
  { key: "soldWeek",  label: "Sold This Week (low → high)" },
  { key: "reviews",   label: "Review Count" },
];

function RatingBar({ value, max = 5 }) {
  const pct = (value / max) * 100;
  const color = value < 3.5 ? "bg-rose-500" : value < 4.2 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-sm font-bold w-8 text-right ${value < 3.5 ? "text-rose-400" : value < 4.2 ? "text-amber-400" : "text-emerald-400"}`}>
        {value}
      </span>
    </div>
  );
}

export default function PerformancePage() {
  const { dishes, reviews, getLiveRating, setDishStatus } = useMenu();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("rating");
  const [showArchived, setShowArchived] = useState(false);

  const visible = dishes.filter((d) => showArchived || d.status !== "archived");

  const enriched = visible.map((d) => ({
    ...d,
    liveRating: getLiveRating(d.id) ?? d.rating?.average ?? 0,
    reviewCount: (reviews[d.id] ?? []).filter((r) => !r.flagged).length,
  }));

  const sorted = [...enriched].sort((a, b) => {
    if (sortBy === "rating")   return a.liveRating - b.liveRating;
    if (sortBy === "soldWeek") return (a.stats?.soldThisWeek ?? 0) - (b.stats?.soldThisWeek ?? 0);
    if (sortBy === "reviews")  return a.reviewCount - b.reviewCount;
    return 0;
  });

  const cutLine = Math.ceil(sorted.length * 0.2); // bottom 20% = candidates for retirement

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Performance</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Use this view to decide which dishes to retire and replace with new viral recipes.
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <select
          className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
        </select>
        <label className="flex items-center gap-2 text-zinc-400 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
            className="accent-white"
          />
          Show archived
        </label>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Bottom 20% — retire candidates</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Needs watching</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Performing well</span>
      </div>

      {/* Table */}
      <div className="border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-semibold">#</th>
              <th className="text-left px-5 py-3 font-semibold">Dish</th>
              <th className="px-5 py-3 font-semibold text-left" style={{ minWidth: 160 }}>Rating</th>
              <th className="text-right px-5 py-3 font-semibold">Sold / Wk</th>
              <th className="text-right px-5 py-3 font-semibold">Reviews</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((dish, i) => {
              const isRetireCandidate = i < cutLine && dish.status === "active";
              return (
                <tr
                  key={dish.id}
                  className={`border-b border-zinc-800 last:border-0 transition-colors ${
                    isRetireCandidate ? "bg-rose-950/20 hover:bg-rose-950/30" : "hover:bg-zinc-900"
                  } ${dish.status === "archived" ? "opacity-40" : ""}`}
                >
                  <td className="px-5 py-4 text-zinc-600 text-xs">{i + 1}</td>
                  <td className="px-5 py-4">
                    <p className="text-white font-semibold">{dish.name}</p>
                    <p className="text-zinc-500 text-xs">{dish.category}</p>
                  </td>
                  <td className="px-5 py-4" style={{ minWidth: 160 }}>
                    <RatingBar value={dish.liveRating} />
                  </td>
                  <td className="px-5 py-4 text-right text-zinc-300">
                    {dish.stats?.soldThisWeek?.toLocaleString() ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-right text-zinc-400">{dish.reviewCount}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      dish.status === "active"   ? "bg-emerald-900 text-emerald-400" :
                      dish.status === "retiring" ? "bg-amber-900 text-amber-400" :
                                                    "bg-zinc-800 text-zinc-500"
                    }`}>
                      {dish.status}
                    </span>
                    {isRetireCandidate && (
                      <span className="ml-2 text-xs text-rose-400">⚠ retire?</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => navigate(`/admin/dishes/${dish.id}/edit`)}
                        className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                      >
                        Edit
                      </button>
                      {dish.status === "active" && (
                        <button
                          onClick={() => setDishStatus(dish.id, "retiring")}
                          className="text-xs text-amber-400 hover:text-amber-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                        >
                          Retire
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
