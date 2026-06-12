import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { now } from "../utils/ids.js";

const images = {
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

export function createDefaultData() {
  const timestamp = now();

  return {
    meta: {
      brandName: "Moorland House & SPA",
      tagline: "Where Elegance Meets Serenity",
      openingDate: "2026-07-01T00:00:00+03:00",
      location: "Migori Town, Nairobi, Kenya",
      phone: "+254 727 623260",
      email: "reservations@moorlandhouse-spa.com",
      website: "Moorlandhouse-spa.com",
      whatsapp: "https://wa.me/254727623260",
      imageSlots: {
        hero: images.hero,
        pool: images.pool,
        spa: images.spa,
        lounge: images.lounge,
        suite: images.suite,
        garden: images.garden
      },
      socials: [
        { label: "Instagram", handle: "@moorlandhouse_spa", href: "https://instagram.com/moorlandhouse_spa" },
        { label: "Facebook", handle: "Moorland House & SPA", href: "https://facebook.com/moorlandhousespa" },
        { label: "TikTok", handle: "@moorlandhouse_spa", href: "https://tiktok.com/@moorlandhouse_spa" }
      ],
      seoKeywords: [
        "Migori luxury hotel",
        "Kenya spa",
        "African cuisine Migori",
        "boutique accommodation Kenya",
        "pool lounge Migori"
      ],
      createdAt: timestamp,
      updatedAt: timestamp
    },
    users: [
      {
        id: "user_admin",
        name: "Moorland Admin",
        email: env.adminEmail.toLowerCase(),
        passwordHash: bcrypt.hashSync(env.adminPassword, 10),
        role: "admin",
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ],
    rooms: [
      {
        id: "room_presidential",
        order: 1,
        slug: "presidential-suite",
        name: "Presidential Suite",
        rate: 38000,
        rateLabel: "From KSh 38,000 / night",
        capacity: 2,
        beds: "King bed",
        size: "Private lounge suite",
        description: "The most expansive suite, designed for privacy, hosting, and panoramic relaxation.",
        amenities: ["Private lounge", "King bed", "Freestanding bath", "Panoramic balcony", "Priority SPA booking"],
        gallery: [images.suite, "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85"],
        featuredImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "room_executive",
        order: 2,
        slug: "executive-suite",
        name: "Executive Suite",
        rate: 24000,
        rateLabel: "From KSh 24,000 / night",
        capacity: 2,
        beds: "King bed",
        size: "Executive suite",
        description: "A refined suite for business, celebrations, and restorative weekend escapes.",
        amenities: ["King bed", "Work desk", "Rain shower", "Garden views", "Breakfast included"],
        gallery: [images.suite],
        featuredImage: images.suite,
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "room_superior",
        order: 3,
        slug: "superior-suite",
        name: "Superior Suite",
        rate: 16000,
        rateLabel: "From KSh 16,000 / night",
        capacity: 2,
        beds: "Queen bed",
        size: "Superior suite",
        description: "Warm, modern comfort with premium finishes and thoughtful details.",
        amenities: ["Queen bed", "Smart TV", "Coffee station", "Pool access", "High-speed Wi-Fi"],
        gallery: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1800&q=85"],
        featuredImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1800&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ],
    spaServices: [
      {
        id: "spa_signature",
        slug: "moorland-signature-massage",
        name: "Moorland Signature Massage",
        durationMinutes: 90,
        price: 8500,
        description: "A deeply calming full-body ritual using warm oils, pressure work, and aromatherapy.",
        featuredImage: images.spa,
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "spa_couples",
        slug: "couples-serenity-ritual",
        name: "Couples Serenity Ritual",
        durationMinutes: 120,
        price: 18000,
        description: "Side-by-side massage, body polish, tea service, and private relaxation time.",
        featuredImage: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "spa_facial",
        slug: "radiance-facial",
        name: "Radiance Facial",
        durationMinutes: 60,
        price: 6200,
        description: "Hydrating cleanse, botanical mask, facial massage, and luminous finish.",
        featuredImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "spa_reset",
        slug: "executive-reset",
        name: "Executive Reset",
        durationMinutes: 45,
        price: 4800,
        description: "Targeted neck, shoulder, and back treatment for guests short on time.",
        featuredImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ],
    menuItems: [
      {
        id: "menu_nyama_choma",
        slug: "moorland-nyama-choma-platter",
        category: "African Classics",
        name: "Moorland Nyama Choma Platter",
        description: "Charcoal-grilled goat, kachumbari, ugali, sukuma wiki, and house chilli.",
        price: 3200,
        tags: ["Signature", "Gluten-free"],
        featuredImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "menu_tilapia",
        slug: "lake-style-grilled-fish",
        category: "African Classics",
        name: "Lake-Style Grilled Fish",
        description: "Whole grilled tilapia with coconut sauce, greens, and lemon herb potatoes.",
        price: 2600,
        tags: ["Popular"],
        featuredImage: images.fish,
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "menu_stew",
        slug: "east-african-beef-stew",
        category: "African Classics",
        name: "East African Beef Stew",
        description: "Slow-cooked beef, tomato gravy, seasonal vegetables, and chapati.",
        price: 1900,
        tags: ["Comfort"],
        featuredImage: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "menu_pasta",
        slug: "seafood-linguine",
        category: "International",
        name: "Seafood Linguine",
        description: "Prawns, calamari, garlic, herbs, tomatoes, and fresh pasta.",
        price: 2850,
        tags: ["Seafood"],
        featuredImage: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "menu_steak",
        slug: "wood-fired-ribeye-steak",
        category: "International",
        name: "Wood-Fired Ribeye Steak",
        description: "Aged ribeye, pepper jus, charred vegetables, and hand-cut chips.",
        price: 4200,
        tags: ["Chef's choice"],
        featuredImage: images.steak,
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        id: "menu_dessert",
        slug: "passion-fruit-cheesecake",
        category: "Desserts",
        name: "Passion Fruit Cheesecake",
        description: "Creamy cheesecake, passion curd, roasted coconut, and berry compote.",
        price: 950,
        tags: ["Vegetarian"],
        featuredImage: images.dessert,
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ],
    gallery: [
      { id: "gallery_pool_1", category: "Pool", title: "Turquoise pool at golden hour", image: images.pool, active: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "gallery_pool_2", category: "Pool", title: "Decks and serene water", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=85", active: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "gallery_lounge_1", category: "Lounge & Cuisine", title: "Elegant evening lounge", image: images.lounge, active: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "gallery_rooms_1", category: "Rooms", title: "Presidential Suite bedroom", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85", active: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "gallery_exterior_1", category: "Exteriors", title: "Warm architecture and gardens", image: images.garden, active: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "gallery_lifestyle_1", category: "Lifestyle", title: "SPA treatment moment", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=85", active: true, createdAt: timestamp, updatedAt: timestamp }
    ],
    testimonials: [
      { id: "testimonial_1", name: "Preview Guest", role: "Corporate retreat planner", quote: "Exactly the kind of polished destination Migori has been waiting for. The promise feels serene, premium, and proudly Kenyan.", active: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "testimonial_2", name: "Preview Guest", role: "Nairobi hospitality buyer", quote: "The lounge and SPA concept feels warm without losing the high-end atmosphere. We are already planning a launch weekend.", active: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "testimonial_3", name: "Preview Guest", role: "Family traveler", quote: "The food direction, rooms, and pool story make this feel like a complete escape, not just a place to sleep.", active: true, createdAt: timestamp, updatedAt: timestamp }
    ],
    blogPosts: [
      { id: "blog_opening", slug: "new-luxury-escape-arrives-in-migori", title: "A New Luxury Escape Arrives in Migori", excerpt: "What guests can expect from the grand opening of Moorland House & SPA.", content: "Moorland House & SPA opens with boutique accommodation, a polished lounge, SPA rituals, and poolside relaxation.", tag: "Opening Soon", featuredImage: images.hero, published: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "blog_wellness", slug: "art-of-a-restorative-spa-weekend", title: "The Art of a Restorative SPA Weekend", excerpt: "How to pair massage, quiet pool time, and nourishing cuisine.", content: "Plan your weekend around calm treatments, light meals, gentle pool time, and restful sleep.", tag: "Wellness", featuredImage: images.spa, published: true, createdAt: timestamp, updatedAt: timestamp },
      { id: "blog_cuisine", slug: "celebrating-african-cuisine-with-international-polish", title: "Celebrating African Cuisine with International Polish", excerpt: "From nyama choma to seafood linguine, the lounge menu is built for memorable evenings.", content: "The lounge celebrates Kenyan favorites alongside international comfort plates for families, couples, and groups.", tag: "Cuisine", featuredImage: images.steak, published: true, createdAt: timestamp, updatedAt: timestamp }
    ],
    availabilityBlocks: [],
    accommodationBookings: [],
    spaBookings: [],
    loungeReservations: [],
    foodOrders: [],
    contacts: [],
    newsletterSubscribers: [],
    payments: [],
    uploads: []
  };
}
