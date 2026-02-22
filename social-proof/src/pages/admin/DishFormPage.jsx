import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";
import { categories } from "../../data/menu";

const PLATFORMS = ["TikTok", "Instagram", "YouTube", "Twitter/X", "Other"];

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white text-sm font-semibold">{label}</label>
      {hint && <p className="text-zinc-500 text-xs">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls = "bg-zinc-900 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600";

const empty = {
  name: "",
  category: "Mains",
  description: "",
  price: "",
  posItemId: "",
  viralSource: { platform: "TikTok", creator: "", videoUrl: "", views: "" },
  stats: { soldThisWeek: 0, soldAllTime: 0, badge: "" },
  rating: { average: 0, count: 0 },
};

export default function DishFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { dishes, addDish, updateDish } = useMenu();
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const dish = dishes.find((d) => d.id === id);
      if (dish) setForm({ ...empty, ...dish });
    }
  }, [id]);

  function set(path, value) {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const dish = {
      ...form,
      price: Number(form.price),
      stats: {
        ...form.stats,
        soldThisWeek: Number(form.stats.soldThisWeek),
        soldAllTime: Number(form.stats.soldAllTime),
        badge: form.stats.badge || null,
      },
    };
    if (isEdit) {
      updateDish(id, dish);
    } else {
      addDish(dish);
    }
    setSaved(true);
    setTimeout(() => navigate("/admin/dishes"), 800);
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="text-zinc-500 hover:text-white text-sm mb-4 transition-colors">
          ← Back
        </button>
        <h1 className="text-2xl font-black text-white">{isEdit ? "Edit Dish" : "Add New Dish"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Basic info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Basic Info</p>
          <Field label="Name">
            <input required className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Smash Burger" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                {categories.filter(c => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Price ($)">
              <input required type="number" min="0" step="0.01" className={inputCls} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0.00" />
            </Field>
          </div>
          <Field label="Description">
            <textarea required className={`${inputCls} resize-none h-20`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Short description shown on the menu card..." />
          </Field>
        </div>

        {/* Viral source */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Viral Origin</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Platform">
              <select className={inputCls} value={form.viralSource.platform} onChange={(e) => set("viralSource.platform", e.target.value)}>
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Creator Handle">
              <input className={inputCls} value={form.viralSource.creator} onChange={(e) => set("viralSource.creator", e.target.value)} placeholder="@username" />
            </Field>
          </div>
          <Field label="Video URL" hint="This is what the QR code will link to">
            <input type="url" className={inputCls} value={form.viralSource.videoUrl} onChange={(e) => set("viralSource.videoUrl", e.target.value)} placeholder="https://www.tiktok.com/..." />
          </Field>
          <Field label="View Count (display only)">
            <input className={inputCls} value={form.viralSource.views} onChange={(e) => set("viralSource.views", e.target.value)} placeholder="e.g. 14.2M" />
          </Field>
        </div>

        {/* Stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Stats & Badge</p>
          <p className="text-zinc-500 text-xs -mt-2">When connected to Toast, sold counts will sync automatically.</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Sold This Week">
              <input type="number" min="0" className={inputCls} value={form.stats.soldThisWeek} onChange={(e) => set("stats.soldThisWeek", e.target.value)} />
            </Field>
            <Field label="Sold All Time">
              <input type="number" min="0" className={inputCls} value={form.stats.soldAllTime} onChange={(e) => set("stats.soldAllTime", e.target.value)} />
            </Field>
          </div>
          <Field label="Badge" hint="Leave blank for none">
            <select className={inputCls} value={form.stats.badge ?? ""} onChange={(e) => set("stats.badge", e.target.value)}>
              <option value="">No badge</option>
              <option>Best Seller</option>
              <option>Trending</option>
              <option>Fan Favorite</option>
              <option>Viral Right Now</option>
            </select>
          </Field>
        </div>

        {/* POS */}
        <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-2xl p-6 flex flex-col gap-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">POS Integration</p>
          <Field label="Toast Item ID" hint="Leave blank until Toast is connected. Used to sync sales data.">
            <input className={inputCls} value={form.posItemId ?? ""} onChange={(e) => set("posItemId", e.target.value)} placeholder="toast_item_xxxxxxxx" />
          </Field>
        </div>

        <button
          type="submit"
          className="bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors"
        >
          {saved ? "Saved ✓" : isEdit ? "Save Changes" : "Add Dish"}
        </button>
      </form>
    </div>
  );
}
