const badgeStyles = {
  "Best Seller":    "bg-amber-500 text-white",
  "Trending":       "bg-rose-500 text-white",
  "Fan Favorite":   "bg-purple-500 text-white",
  "Viral Right Now":"bg-pink-500 text-white",
};

export default function Badge({ label }) {
  if (!label) return null;
  const style = badgeStyles[label] ?? "bg-gray-500 text-white";
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${style}`}>
      {label}
    </span>
  );
}
