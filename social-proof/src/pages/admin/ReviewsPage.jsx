import { useState } from "react";
import { useMenu } from "../../context/MenuContext";

function Stars({ rating }) {
  return (
    <span className="text-yellow-400 text-sm">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

export default function ReviewsPage() {
  const { dishes, reviews, flagReview, deleteReview } = useMenu();
  const [filterDish, setFilterDish] = useState("all");
  const [filterFlagged, setFilterFlagged] = useState("all");

  // Flatten reviews with dish context
  const allReviews = dishes.flatMap((dish) =>
    (reviews[dish.id] ?? []).map((r) => ({ ...r, dishId: dish.id, dishName: dish.name }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const filtered = allReviews.filter((r) => {
    if (filterDish !== "all" && r.dishId !== filterDish) return false;
    if (filterFlagged === "flagged" && !r.flagged) return false;
    if (filterFlagged === "clean" && r.flagged) return false;
    return true;
  });

  const flaggedCount = allReviews.filter((r) => r.flagged).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Reviews</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {allReviews.length} total · {flaggedCount} flagged
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select
          className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none"
          value={filterDish}
          onChange={(e) => setFilterDish(e.target.value)}
        >
          <option value="all">All Dishes</option>
          {dishes.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select
          className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none"
          value={filterFlagged}
          onChange={(e) => setFilterFlagged(e.target.value)}
        >
          <option value="all">All Reviews</option>
          <option value="clean">Not Flagged</option>
          <option value="flagged">Flagged Only</option>
        </select>
      </div>

      {/* Philosophy note */}
      <div className="mb-6 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 flex gap-3 items-start">
        <span className="text-lg">💬</span>
        <p className="text-zinc-400 text-xs leading-relaxed">
          <strong className="text-white">Our review philosophy:</strong> We publish all honest feedback publicly — that's the brand.
          Use "Flag" only for spam, hate speech, or fake reviews. Low ratings are valuable signal for the menu cull, not a reason to hide a review.
        </p>
      </div>

      {/* Review list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-zinc-600 text-sm py-8 text-center">No reviews match this filter.</p>
        )}
        {filtered.map((review) => (
          <div
            key={review.id}
            className={`border rounded-xl p-5 flex gap-4 transition-opacity ${
              review.flagged
                ? "border-rose-900 bg-rose-950/30 opacity-60"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-white font-semibold text-sm">{review.author}</span>
                <Stars rating={review.rating} />
                <span className="text-zinc-500 text-xs bg-zinc-800 px-2 py-0.5 rounded-full">{review.dishName}</span>
                {review.flagged && (
                  <span className="text-xs bg-rose-900 text-rose-400 px-2 py-0.5 rounded-full font-semibold">Flagged</span>
                )}
              </div>
              <p className="text-zinc-300 text-sm">{review.comment}</p>
              <p className="text-zinc-600 text-xs mt-2">{review.date}</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => flagReview(review.dishId, review.id, !review.flagged)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  review.flagged
                    ? "border-zinc-700 text-zinc-400 hover:text-white"
                    : "border-amber-800 text-amber-400 hover:bg-amber-900/30"
                }`}
              >
                {review.flagged ? "Unflag" : "Flag"}
              </button>
              <button
                onClick={() => deleteReview(review.dishId, review.id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-rose-900 text-rose-500 hover:bg-rose-900/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
