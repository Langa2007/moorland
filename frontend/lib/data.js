export const contact = {
  phone: "+254 727 623260",
  phoneLink: "tel:+254727623260",
  whatsapp: "https://wa.me/254727623260",
  email: "reservations@moorlandhouse-spa.com",
  website: "Moorlandhouse-spa.com",
  location: "Migori Town, Nairobi, Kenya",
  googleMaps: "https://maps.google.com/?q=Moorland+House+And+Spa+Migori",
  socials: [
    { label: "Instagram", handle: "@moorlandhouse_spa", href: "https://instagram.com/moorlandhouse_spa" },
    { label: "Facebook", handle: "Moorland House & Spa", href: "https://facebook.com/moorlandhousespa" },
    { label: "TikTok", handle: "@moorlandhouse_spa", href: "https://tiktok.com/@moorlandhouse_spa" },
    { label: "X", handle: "@moorland_spa", href: "https://x.com/moorland_spa" }
  ]
};

export const navItems = [
  { label: "Lounge", href: "/lounge" },
  { label: "Spa", href: "/spa" },
  { label: "Rooms", href: "/accommodations" },
  { label: "Pool", href: "/pool-grounds" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const images = {
  hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=85",
  pool: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=85",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
  lounge: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85",
  suite: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85",
  garden: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
  fish: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=1200&q=85",
  steak: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85",
  dessert: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=85"
};

function imageUrl(value, fallback = "/logo.png") {
  if (!value || typeof value !== "string") return fallback;
  return value;
}

function collectionOrFallback(site, key, fallback) {
  return Array.isArray(site[key]) ? site[key] : fallback;
}

export const experiences = [
  {
    title: "Elegant Lounge",
    text: "African classics, international plates, signature cocktails, and relaxed evening ambience.",
    image: images.lounge,
    href: "/lounge"
  },
  {
    title: "Spa & Wellness",
    text: "Massage, facials, body rituals, couples treatments, and calm recovery spaces.",
    image: images.spa,
    href: "/spa"
  },
  {
    title: "Boutique Rooms",
    text: "Presidential, Executive, and Superior suites with a private, restorative atmosphere.",
    image: images.suite,
    href: "/accommodations"
  }
];

export const menuItems = [
  {
    id: "nyama-choma",
    category: "African Classics",
    name: "Moorland Nyama Choma Platter",
    desc: "Charcoal-grilled goat, kachumbari, ugali, sukuma wiki, and house chilli.",
    price: 3200,
    tags: ["Signature", "Gluten-free"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "tilapia",
    category: "African Classics",
    name: "Lake-Style Grilled Fish",
    desc: "Whole grilled tilapia with coconut sauce, greens, and lemon herb potatoes.",
    price: 2600,
    tags: ["Popular"],
    image: images.fish
  },
  {
    id: "stew",
    category: "African Classics",
    name: "East African Beef Stew",
    desc: "Slow-cooked beef, tomato gravy, seasonal vegetables, and chapati.",
    price: 1900,
    tags: ["Comfort"],
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "pasta",
    category: "International",
    name: "Seafood Linguine",
    desc: "Prawns, calamari, garlic, herbs, tomatoes, and fresh pasta.",
    price: 2850,
    tags: ["Seafood"],
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "steak",
    category: "International",
    name: "Wood-Fired Ribeye Steak",
    desc: "Aged ribeye, pepper jus, charred vegetables, and hand-cut chips.",
    price: 4200,
    tags: ["Chef's choice"],
    image: images.steak
  },
  {
    id: "dessert",
    category: "Desserts",
    name: "Passion Fruit Cheesecake",
    desc: "Creamy cheesecake, passion curd, roasted coconut, and berry compote.",
    price: 950,
    tags: ["Vegetarian"],
    image: images.dessert
  }
];

export const spaServices = [
  {
    name: "Moorland Signature Massage",
    duration: "90 min",
    price: "KSh 8,500",
    desc: "A deeply calming full-body ritual using warm oils, pressure work, and aromatherapy.",
    image: images.spa
  },
  {
    name: "Couples Serenity Ritual",
    duration: "120 min",
    price: "KSh 18,000",
    desc: "Side-by-side massage, body polish, tea service, and private relaxation time.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=85"
  },
  {
    name: "Radiance Facial",
    duration: "60 min",
    price: "KSh 6,200",
    desc: "Hydrating cleanse, botanical mask, facial massage, and luminous finish.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85"
  },
  {
    name: "Executive Reset",
    duration: "45 min",
    price: "KSh 4,800",
    desc: "Targeted neck, shoulder, and back treatment for guests short on time.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=85"
  }
];

export const rooms = [
  {
    name: "Presidential Suite",
    rate: "From KSh 38,000 / night",
    desc: "The most expansive suite, designed for privacy, hosting, and panoramic relaxation.",
    amenities: ["Private lounge", "King bed", "Freestanding bath", "Panoramic balcony", "Priority Spa booking"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85"
  },
  {
    name: "Executive Suite",
    rate: "From KSh 24,000 / night",
    desc: "A refined suite for business, celebrations, and restorative weekend escapes.",
    amenities: ["King bed", "Work desk", "Rain shower", "Garden views", "Breakfast included"],
    image: images.suite
  },
  {
    name: "Superior Suite",
    rate: "From KSh 16,000 / night",
    desc: "Warm, modern comfort with premium finishes and thoughtful details.",
    amenities: ["Queen bed", "Smart TV", "Coffee station", "Pool access", "High-speed Wi-Fi"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1800&q=85"
  }
];

export const gallery = [
  { category: "Pool", title: "Turquoise pool at golden hour", image: images.pool },
  { category: "Pool", title: "Decks and serene water", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=85" },
  { category: "Lounge & Cuisine", title: "Elegant evening lounge", image: images.lounge },
  { category: "Lounge & Cuisine", title: "Grilled specialties", image: menuItems[0].image },
  { category: "Lounge & Cuisine", title: "International plates", image: images.steak },
  { category: "Rooms", title: "Presidential Suite bedroom", image: rooms[0].image },
  { category: "Rooms", title: "Executive Suite calm interiors", image: rooms[1].image },
  { category: "Exteriors", title: "Warm architecture and gardens", image: images.garden },
  { category: "Lifestyle", title: "Spa treatment moment", image: spaServices[1].image },
  { category: "Lifestyle", title: "Couples retreat mood", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85" }
];

export const testimonials = [
  {
    quote: "Exactly the kind of polished destination Migori has been waiting for. The promise feels serene, premium, and proudly Kenyan.",
    name: "Preview Guest",
    role: "Corporate retreat planner"
  },
  {
    quote: "The lounge and Spa concept feels warm without losing the high-end atmosphere. We are already planning a launch weekend.",
    name: "Preview Guest",
    role: "Nairobi hospitality buyer"
  },
  {
    quote: "The food direction, rooms, and pool story make this feel like a complete escape, not just a place to sleep.",
    name: "Preview Guest",
    role: "Family traveler"
  }
];

export const blogPosts = [
  {
    title: "A New Luxury Escape Arrives in Migori",
    excerpt: "What guests can expect from the grand opening of Moorland House & Spa.",
    tag: "Opening Soon"
  },
  {
    title: "The Art of a Restorative Spa Weekend",
    excerpt: "How to pair massage, quiet pool time, and nourishing cuisine.",
    tag: "Wellness"
  },
  {
    title: "Celebrating African Cuisine with International Polish",
    excerpt: "From nyama choma to seafood linguine, the lounge menu is built for memorable evenings.",
    tag: "Cuisine"
  }
];

function money(value) {
  return `KSh ${Number(value || 0).toLocaleString()}`;
}

export function normalizeSiteData(site = {}) {
  const meta = site.meta || contact;
  const slots = meta.imageSlots || {};
  const slotImage = (key) => (
    Object.prototype.hasOwnProperty.call(slots, key)
      ? imageUrl(slots[key])
      : imageUrl(images[key])
  );
  const siteImages = {
    ...images,
    hero: slotImage("hero"),
    pool: slotImage("pool"),
    spa: slotImage("spa"),
    lounge: slotImage("lounge"),
    suite: slotImage("suite"),
    garden: slotImage("garden")
  };

  const normalizedMenuItems = collectionOrFallback(site, "menuItems", menuItems).map((item) => ({
    id: item.id,
    category: item.category,
    name: item.name,
    desc: item.description || item.desc,
    price: item.price,
    tags: item.tags || [],
    image: imageUrl(item.featuredImage || item.image)
  }));

  const normalizedSpaServices = collectionOrFallback(site, "spaServices", spaServices).map((service) => ({
    id: service.id,
    name: service.name,
    duration: service.duration || `${service.durationMinutes} min`,
    price: typeof service.price === "number" ? money(service.price) : service.price,
    desc: service.description || service.desc,
    image: imageUrl(service.featuredImage || service.image)
  }));

  const normalizedRooms = collectionOrFallback(site, "rooms", rooms).map((room) => ({
    id: room.id,
    name: room.name,
    rate: room.rateLabel || room.rate,
    desc: room.description || room.desc,
    amenities: room.amenities || [],
    image: imageUrl(room.featuredImage || room.image || room.gallery?.[0])
  }));

  return {
    contact: {
      ...contact,
      ...meta,
      phoneLink: `tel:${(meta.phone || contact.phone).replace(/\s/g, "")}`
    },
    images: siteImages,
    experiences: [
      {
        title: "Elegant Lounge",
        text: "African classics, international plates, signature cocktails, and relaxed evening ambience.",
        image: siteImages.lounge,
        href: "/lounge"
      },
      {
        title: "Spa & Wellness",
        text: "Massage, facials, body rituals, couples treatments, and calm recovery spaces.",
        image: siteImages.spa,
        href: "/spa"
      },
      {
        title: "Boutique Rooms",
        text: "Presidential, Executive, and Superior suites with a private, restorative atmosphere.",
        image: siteImages.suite,
        href: "/accommodations"
      }
    ],
    menuItems: normalizedMenuItems,
    spaServices: normalizedSpaServices,
    rooms: normalizedRooms,
    gallery: collectionOrFallback(site, "gallery", gallery).map((item) => ({
      category: item.category,
      title: item.title,
      image: imageUrl(item.image)
    })),
    testimonials: collectionOrFallback(site, "testimonials", testimonials),
    blogPosts: collectionOrFallback(site, "blogPosts", blogPosts)
  };
}

export async function getSiteData() {
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://moorland.onrender.com/api").replace(/\/+$/, "");
  try {
    const response = await fetch(`${apiBase}/site`, { cache: "no-store" });
    if (!response.ok) throw new Error("Site API unavailable");
    const payload = await response.json();
    return normalizeSiteData(payload.data);
  } catch (_error) {
    return normalizeSiteData();
  }
}
