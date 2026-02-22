import { useNavigate } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";

const statusStyles = {
  active:   "bg-emerald-900 text-emerald-400",
  retiring: "bg-amber-900 text-amber-400",
  archived: "bg-zinc-800 text-zinc-500",
};

export default function DishesPage() {
  const { dishes, setDishStatus, getLiveRating } = useMenu();
  const navigate = useNavigate();

  const sorted = [...dishes].sort((a, b) => {
    const order = { active: 0, retiring: 1, archived: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Dishes</h1>
          <p className="text-zinc-500 text-sm mt-1">{dishes.filter(d => d.status === "active").length} active · {dishes.length} total</p>
        </div>
        <button
          onClick={() => navigate("/admin/dishes/new")}
          className="bg-white text-black font-bold text-sm px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors"
        >
          + Add Dish
        </button>
      </div>

      <div className="border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-semibold">Dish</th>
              <th className="text-left px-5 py-3 font-semibold">Category</th>
              <th className="text-right px-5 py-3 font-semibold">Rating</th>
              <th className="text-right px-5 py-3 font-semibold">Sold / Week</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">POS ID</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((dish, i) => {
              const rating = getLiveRating(dish.id) ?? dish.rating?.average;
              return (
                <tr
                  key={dish.id}
                  className={`border-b border-zinc-800 last:border-0 hover:bg-zinc-900 transition-colors ${dish.status === "archived" ? "opacity-50" : ""}`}
                >
                  <td className="px-5 py-4">
                    <p className="text-white font-semibold">{dish.name}</p>
                    {dish.viralSource && (
                      <p className="text-zinc-500 text-xs mt-0.5">{dish.viralSource.platform} · {dish.viralSource.creator}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-zinc-400">{dish.category}</td>
                  <td className="px-5 py-4 text-right">
                    <span className={`font-semibold ${rating < 4.0 ? "text-rose-400" : "text-white"}`}>
                      {rating ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-zinc-300">
                    {dish.stats?.soldThisWeek?.toLocaleString() ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[dish.status]}`}>
                      {dish.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-zinc-600 text-xs font-mono">
                    {dish.posItemId ?? <span className="italic">not linked</span>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => navigate(`/admin/dishes/${dish.id}/edit`)}
                        className="text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                      >
                        Edit
                      </button>
                      {dish.status === "active" && (
                        <button
                          onClick={() => setDishStatus(dish.id, "retiring")}
                          className="text-xs text-amber-400 hover:text-amber-300 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                        >
                          Mark Retiring
                        </button>
                      )}
                      {dish.status === "retiring" && (
                        <>
                          <button
                            onClick={() => setDishStatus(dish.id, "active")}
                            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                          >
                            Restore
                          </button>
                          <button
                            onClick={() => setDishStatus(dish.id, "archived")}
                            className="text-xs text-rose-400 hover:text-rose-300 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                          >
                            Archive
                          </button>
                        </>
                      )}
                      {dish.status === "archived" && (
                        <button
                          onClick={() => setDishStatus(dish.id, "active")}
                          className="text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                        >
                          Restore
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
