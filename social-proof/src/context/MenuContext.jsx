import { createContext, useContext, useState, useEffect } from "react";
import { menuItems as seedItems, reviews as seedReviews } from "../data/menu";

const MenuContext = createContext(null);

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function MenuProvider({ children }) {
  const [dishes, setDishes] = useState(() =>
    loadFromStorage("sp_dishes", seedItems.map((d) => ({ ...d, status: "active" })))
  );
  const [reviews, setReviews] = useState(() =>
    loadFromStorage("sp_reviews", seedReviews)
  );

  useEffect(() => {
    localStorage.setItem("sp_dishes", JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem("sp_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Dishes
  function addDish(dish) {
    const newDish = { ...dish, id: String(Date.now()), status: "active" };
    setDishes((prev) => [...prev, newDish]);
    return newDish.id;
  }

  function updateDish(id, updates) {
    setDishes((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  }

  function setDishStatus(id, status) {
    setDishes((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  }

  // Reviews
  function addReview(dishId, review) {
    setReviews((prev) => ({
      ...prev,
      [dishId]: [{ ...review, id: `r${Date.now()}`, flagged: false }, ...(prev[dishId] ?? [])],
    }));
  }

  function flagReview(dishId, reviewId, flagged) {
    setReviews((prev) => ({
      ...prev,
      [dishId]: prev[dishId].map((r) => (r.id === reviewId ? { ...r, flagged } : r)),
    }));
  }

  function deleteReview(dishId, reviewId) {
    setReviews((prev) => ({
      ...prev,
      [dishId]: prev[dishId].filter((r) => r.id !== reviewId),
    }));
  }

  // Derived helpers
  function getReviewsForDish(dishId) {
    return reviews[dishId] ?? [];
  }

  function getLiveRating(dishId) {
    const rs = getReviewsForDish(dishId).filter((r) => !r.flagged);
    if (!rs.length) return null;
    return +(rs.reduce((s, r) => s + r.rating, 0) / rs.length).toFixed(1);
  }

  return (
    <MenuContext.Provider value={{
      dishes, reviews,
      addDish, updateDish, setDishStatus,
      addReview, flagReview, deleteReview,
      getReviewsForDish, getLiveRating,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
