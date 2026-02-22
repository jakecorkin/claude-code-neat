import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import Badge from "./Badge";

const platformIcon = {
  TikTok: "🎵",
  Instagram: "📸",
  YouTube: "▶️",
};

export default function MenuCard({ item, liveRating }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dish/${item.id}`)}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:border-zinc-600 hover:bg-zinc-850 transition-all active:scale-[0.98]"
    >
      {/* Top row: badge + price */}
      <div className="flex items-center justify-between">
        <Badge label={item.stats.badge} />
        <span className="text-white font-semibold text-lg">${item.price}</span>
      </div>

      {/* Name + description */}
      <div>
        <h2 className="text-white font-bold text-xl leading-tight">{item.name}</h2>
        <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{item.description}</p>
      </div>

      {/* Viral source */}
      <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2">
        <span className="text-base">{platformIcon[item.viralSource.platform] ?? "🌐"}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-400 leading-none">Originally viral on {item.viralSource.platform}</p>
          <p className="text-xs text-zinc-300 font-medium truncate">{item.viralSource.creator} · {item.viralSource.views} views</p>
        </div>
        <span className="text-xs text-zinc-500">Scan QR →</span>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
        <div className="flex items-center gap-1.5">
          <StarRating rating={liveRating ?? item.rating?.average ?? 0} size="sm" />
          <span className="text-zinc-400 text-xs">{liveRating ?? item.rating?.average ?? "—"} ({item.rating?.count ?? 0})</span>
        </div>
        <span className="text-zinc-400 text-xs font-medium">
          🔥 {item.stats.soldThisWeek.toLocaleString()} sold this week
        </span>
      </div>
    </div>
  );
}
