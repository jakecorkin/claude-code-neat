import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import StarRating from "../components/StarRating";
import Badge from "../components/Badge";

const platformIcon = { TikTok: "🎵", Instagram: "📸", YouTube: "▶️" };

export default function DishPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dishes, getReviewsForDish, addReview, getLiveRating } = useMenu();
  const item = dishes.find((m) => m.id === id);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!item) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-zinc-500">Dish not found.</p>
    </div>
  );

  const reviews = getReviewsForDish(id).filter((r) => !r.flagged);
  const liveRating = getLiveRating(id) ?? item.rating?.average ?? 0;
  const avgRating = liveRating.toFixed ? liveRating.toFixed(1) : liveRating;

  const handleSubmitReview = () => {
    if (!newRating || !newComment.trim()) return;
    addReview(id, {
      author: "You",
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
    });
    setSubmitted(true);
    setShowReviewForm(false);
    setNewRating(0);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Back nav */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur border-b border-zinc-800 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <span className="text-zinc-600 text-xs">|</span>
          <h1 className="text-white font-bold text-sm truncate">{item.name}</h1>
          {item.status === "retiring" && (
            <span className="text-xs bg-amber-900 text-amber-400 px-2 py-0.5 rounded-full font-semibold shrink-0">Retiring Soon</span>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-6">

        {/* Hero */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-3xl font-black leading-tight">{item.name}</h2>
            <span className="text-2xl font-semibold text-zinc-300 shrink-0">${item.price}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge label={item.stats?.badge} />
            <span className="text-zinc-500 text-xs">{item.category}</span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Live stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-white">{item.stats?.soldThisWeek?.toLocaleString() ?? "—"}</p>
            <p className="text-zinc-500 text-xs mt-1">sold this week</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-white">{avgRating}</p>
            <p className="text-zinc-500 text-xs mt-1">avg rating</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-white">{reviews.length}</p>
            <p className="text-zinc-500 text-xs mt-1">reviews</p>
          </div>
        </div>

        {/* Viral source / QR */}
        {item.viralSource && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">Viral Origin</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{platformIcon[item.viralSource.platform] ?? "🌐"}</span>
                  <span className="text-white font-semibold">{item.viralSource.platform}</span>
                </div>
                <p className="text-zinc-400 text-sm">{item.viralSource.creator}</p>
                <p className="text-zinc-500 text-xs">{item.viralSource.views} views</p>
              </div>
              <a
                href={item.viralSource.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 grid grid-cols-3 grid-rows-3 gap-1 p-1">
                  {[1,1,0,1,0,1,0,1,1].map((on, i) => (
                    <div key={i} className={`rounded-sm ${on ? "bg-black" : "bg-white"}`} />
                  ))}
                </div>
              </a>
            </div>
            <p className="text-zinc-600 text-xs mt-3">Scan to watch the viral video this dish is based on</p>
          </div>
        )}

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-lg">Reviews</h3>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={parseFloat(avgRating)} size="md" />
                <span className="text-zinc-400 text-sm">{avgRating} · {reviews.length} reviews</span>
              </div>
            </div>
            {!submitted && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-semibold bg-white text-black px-3 py-2 rounded-full hover:bg-zinc-200 transition-colors"
              >
                Rate this dish
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 mb-4 flex flex-col gap-4">
              <p className="text-white font-semibold">How was the {item.name}?</p>
              <div>
                <p className="text-zinc-400 text-xs mb-2">Your rating</p>
                <StarRating rating={newRating} size="lg" interactive onRate={setNewRating} />
              </div>
              <div>
                <p className="text-zinc-400 text-xs mb-2">Your thoughts</p>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="What did you think? Be honest — we use this to improve the menu."
                  className="w-full bg-zinc-800 text-white text-sm rounded-xl p-3 border border-zinc-700 focus:outline-none focus:border-zinc-500 resize-none h-24"
                />
              </div>
              <button
                onClick={handleSubmitReview}
                disabled={!newRating || !newComment.trim()}
                className="bg-white text-black font-bold py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors"
              >
                Submit Review
              </button>
            </div>
          )}

          {submitted && (
            <div className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-3 mb-4 text-sm text-emerald-400">
              Thanks for your review! It's now public. We read every one.
            </div>
          )}

          <div className="flex flex-col gap-3">
            {reviews.length === 0 && (
              <p className="text-zinc-600 text-sm text-center py-6">No reviews yet. Be the first!</p>
            )}
            {reviews.map((review) => (
              <div key={review.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">
                      {review.author[0]}
                    </div>
                    <span className="text-white text-sm font-medium">{review.author}</span>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-zinc-300 text-sm">{review.comment}</p>
                <p className="text-zinc-600 text-xs mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
