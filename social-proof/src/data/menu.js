// Mock data — structured to mirror what a Toast POS API + review DB would return

export const categories = ["All", "Starters", "Mains", "Sides", "Desserts", "Drinks"];

export const menuItems = [
  {
    id: "1",
    name: "Smash Burger",
    category: "Mains",
    description: "Double smash patty, American cheese, special sauce, pickles on a toasted brioche bun.",
    price: 16,
    viralSource: {
      platform: "TikTok",
      creator: "@GrillDaddy",
      videoUrl: "https://www.tiktok.com/@grillmaster/video/example",
      views: "14.2M",
    },
    stats: {
      soldThisWeek: 412,
      soldAllTime: 8841,
      badge: "Best Seller",
    },
    rating: {
      average: 4.8,
      count: 294,
    },
  },
  {
    id: "2",
    name: "Baked Feta Pasta",
    category: "Mains",
    description: "Oven-roasted cherry tomatoes, whole feta block, garlic, olive oil, tossed with rigatoni.",
    price: 18,
    viralSource: {
      platform: "TikTok",
      creator: "@MacaroniQueenFi",
      videoUrl: "https://www.tiktok.com/@macaroniqueenfi/video/example",
      views: "47.8M",
    },
    stats: {
      soldThisWeek: 287,
      soldAllTime: 5203,
      badge: "Trending",
    },
    rating: {
      average: 4.6,
      count: 181,
    },
  },
  {
    id: "3",
    name: "Birria Tacos",
    category: "Mains",
    description: "Slow-braised beef birria, dipped & griddled corn tortillas, consommé for dipping, cilantro, onion.",
    price: 19,
    viralSource: {
      platform: "Instagram",
      creator: "@LA_Birria",
      videoUrl: "https://www.instagram.com/p/example",
      views: "22.1M",
    },
    stats: {
      soldThisWeek: 341,
      soldAllTime: 6720,
      badge: "Fan Favorite",
    },
    rating: {
      average: 4.9,
      count: 412,
    },
  },
  {
    id: "4",
    name: "Whipped Ricotta Toast",
    category: "Starters",
    description: "House-whipped ricotta, honey, crushed pistachios, fresh figs on thick-cut sourdough.",
    price: 12,
    viralSource: {
      platform: "TikTok",
      creator: "@BrunchBabe",
      videoUrl: "https://www.tiktok.com/@brunchbabe/video/example",
      views: "8.6M",
    },
    stats: {
      soldThisWeek: 198,
      soldAllTime: 3140,
      badge: null,
    },
    rating: {
      average: 4.4,
      count: 97,
    },
  },
  {
    id: "5",
    name: "Dubai Chocolate Bar",
    category: "Desserts",
    description: "Milk chocolate shell, pistachio cream, crispy kataifi, topped with edible gold.",
    price: 14,
    viralSource: {
      platform: "TikTok",
      creator: "@FixDessertChocolatier",
      videoUrl: "https://www.tiktok.com/@fix/video/example",
      views: "91.3M",
    },
    stats: {
      soldThisWeek: 503,
      soldAllTime: 2901,
      badge: "Viral Right Now",
    },
    rating: {
      average: 4.7,
      count: 210,
    },
  },
  {
    id: "6",
    name: "Cucumber Salad",
    category: "Sides",
    description: "Thinly sliced Persian cucumbers, rice vinegar, sesame oil, chili crisp, toasted sesame.",
    price: 9,
    viralSource: {
      platform: "TikTok",
      creator: "@HealthyishEats",
      videoUrl: "https://www.tiktok.com/@healthyisheats/video/example",
      views: "31.4M",
    },
    stats: {
      soldThisWeek: 144,
      soldAllTime: 2210,
      badge: null,
    },
    rating: {
      average: 4.3,
      count: 63,
    },
  },
  {
    id: "7",
    name: "Dirty Soda",
    category: "Drinks",
    description: "Your choice of soda, coconut cream, a squeeze of lime, flavored syrup. Fully customizable.",
    price: 6,
    viralSource: {
      platform: "TikTok",
      creator: "@SodaSparkle",
      videoUrl: "https://www.tiktok.com/@sodasparkle/video/example",
      views: "19.7M",
    },
    stats: {
      soldThisWeek: 376,
      soldAllTime: 4820,
      badge: "Trending",
    },
    rating: {
      average: 4.5,
      count: 158,
    },
  },
];

export const reviews = {
  "1": [
    { id: "r1", author: "Marcus T.", rating: 5, comment: "Best smash burger I've ever had. The sauce is everything.", date: "2025-02-14" },
    { id: "r2", author: "Priya K.", rating: 5, comment: "Literally watched the TikTok and came here the next day. Worth it.", date: "2025-02-12" },
    { id: "r3", author: "Derek W.", rating: 4, comment: "Incredible burger, could use a touch more pickle.", date: "2025-02-10" },
  ],
  "2": [
    { id: "r4", author: "Sofia L.", rating: 5, comment: "Even better than the viral video. The tomatoes are so sweet.", date: "2025-02-13" },
    { id: "r5", author: "James R.", rating: 4, comment: "Creamy, comforting. Great portion size.", date: "2025-02-11" },
  ],
  "3": [
    { id: "r6", author: "Aaliyah M.", rating: 5, comment: "The consommé dip makes this. Absolute perfection.", date: "2025-02-15" },
    { id: "r7", author: "Carlos V.", rating: 5, comment: "I've had birria all over LA. This is top tier.", date: "2025-02-13" },
    { id: "r8", author: "Jen H.", rating: 5, comment: "Crispy, rich, and the broth is insane.", date: "2025-02-09" },
  ],
  "5": [
    { id: "r9", author: "Tara N.", rating: 5, comment: "I saw this go viral and couldn't believe how good the real thing is.", date: "2025-02-16" },
    { id: "r10", author: "Ben O.", rating: 4, comment: "Rich and indulgent. Worth every penny.", date: "2025-02-14" },
  ],
};
