export default function StarRating({ rating, size = "sm", interactive = false, onRate }) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-2xl" };

  return (
    <div className={`flex gap-0.5 ${sizes[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onRate?.(star)}
          disabled={!interactive}
          className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"} ${
            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-600"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
