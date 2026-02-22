import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import { categories } from "../data/menu";
import MenuCard from "../components/MenuCard";

export default function MenuPage() {
  const { dishes, getLiveRating } = useMenu();
  const [activeCategory, setActiveCategory] = useState("All");

  const activeDishes = dishes.filter((d) => d.status === "active");
  const filtered = activeCategory === "All"
    ? activeDishes
    : activeDishes.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur border-b border-zinc-800 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Social Proof</h1>
              <p className="text-zinc-500 text-xs mt-0.5">Menu built by the internet. Rated by you.</p>
            </div>
            <span className="text-xs text-zinc-600 border border-zinc-800 rounded-full px-2 py-1">Table 12</span>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-white text-black border-white"
                    : "text-zinc-400 border-zinc-700 hover:border-zinc-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">
        <p className="text-zinc-600 text-xs">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""} · Tap any dish to see the viral video & reviews
        </p>
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} liveRating={getLiveRating(item.id)} />
        ))}
      </div>
    </div>
  );
}
