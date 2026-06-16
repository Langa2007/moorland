import { z } from "zod";

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");
const timeString = z.string().regex(/^\d{2}:\d{2}$/, "Use HH:mm");
const email = z.string().email().transform((value) => value.toLowerCase());
const phone = z.string().min(7).max(30);

export const idParamSchema = z.object({
  id: z.string().min(2)
}).passthrough();

export const slugParamSchema = z.object({
  slug: z.string().min(2)
});

export const loginSchema = z.object({
  email,
  password: z.string().min(6)
});

export const availabilityQuerySchema = z.object({
  type: z.enum(["room", "spa", "lounge", "event"]).default("room"),
  resourceId: z.string().optional(),
  from: dateString,
  to: dateString.optional()
});

export const accommodationBookingSchema = z.object({
  roomId: z.string().min(2),
  checkIn: dateString,
  checkOut: dateString,
  guests: z.coerce.number().int().min(1).max(12),
  name: z.string().min(2),
  email,
  phone,
  notes: z.string().max(1000).optional().default(""),
  paymentMethod: z.enum(["mpesa", "card", "mobile-money", "cash"]).default("mpesa")
});

export const spaBookingSchema = z.object({
  serviceId: z.string().min(2),
  date: dateString,
  time: timeString,
  guests: z.coerce.number().int().min(1).max(4),
  name: z.string().min(2),
  email,
  phone,
  notes: z.string().max(1000).optional().default(""),
  paymentMethod: z.enum(["mpesa", "card", "mobile-money", "cash"]).default("mpesa")
});

export const loungeReservationSchema = z.object({
  date: dateString,
  time: timeString,
  guests: z.coerce.number().int().min(1).max(40),
  name: z.string().min(2),
  email,
  phone,
  occasion: z.string().max(100).optional().default(""),
  notes: z.string().max(1000).optional().default("")
});

export const eventBookingSchema = z.object({
  date: dateString,
  time: timeString,
  guests: z.coerce.number().int().min(2).max(500),
  eventType: z.string().min(2).max(120),
  packageName: z.string().max(120).optional().default(""),
  name: z.string().min(2),
  organization: z.string().max(120).optional().default(""),
  email,
  phone,
  setup: z.string().max(120).optional().default(""),
  notes: z.string().max(1500).optional().default(""),
  paymentMethod: z.enum(["mpesa", "card", "mobile-money", "cash"]).default("mpesa"),
  depositAmount: z.coerce.number().min(0).optional().default(0)
});

export const foodOrderSchema = z.object({
  name: z.string().min(2),
  email,
  phone,
  orderType: z.enum(["pickup", "table", "delivery"]).default("pickup"),
  tableNumber: z.string().max(20).optional().default(""),
  deliveryAddress: z.string().max(300).optional().default(""),
  paymentMethod: z.enum(["mpesa", "card", "mobile-money", "cash"]).default("mpesa"),
  items: z.array(
    z.object({
      menuItemId: z.string().min(2),
      quantity: z.coerce.number().int().min(1).max(50),
      notes: z.string().max(300).optional().default("")
    })
  ).min(1)
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email,
  phone: phone.optional().default(""),
  interest: z.string().min(2).max(100),
  message: z.string().min(5).max(2000)
});

export const inquiryReplySchema = z.object({
  subject: z.string().min(2).max(160).optional().default("Response from Moorland House & Spa"),
  message: z.string().min(5).max(3000)
});

export const newsletterSchema = z.object({
  email,
  name: z.string().max(100).optional().default("")
});

export const paymentInitSchema = z.object({
  referenceType: z.enum(["accommodation", "spa", "food-order", "event"]),
  referenceId: z.string().min(2),
  method: z.enum(["mpesa", "card", "mobile-money"]),
  phone: phone.optional(),
  amount: z.coerce.number().min(1)
});

export const paymentVerifySchema = z.object({
  id: z.string().min(2)
});

export const reviewSchema = z.object({
  name: z.string().min(2),
  role: z.string().max(120).optional().default("Guest"),
  rating: z.coerce.number().int().min(1).max(5),
  quote: z.string().min(10).max(1000),
  stayDate: dateString.optional(),
  source: z.enum(["website", "admin"]).default("website")
});

export const statusPatchSchema = z.object({
  status: z.enum(["new", "active", "pending", "confirmed", "cancelled", "completed", "paid", "failed"])
});

export const roomSchema = z.object({
  order: z.coerce.number().int().min(1).optional(),
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  rate: z.coerce.number().min(0),
  rateLabel: z.string().min(2),
  capacity: z.coerce.number().int().min(1),
  beds: z.string().min(2),
  size: z.string().optional().default(""),
  description: z.string().min(5),
  amenities: z.array(z.string()).default([]),
  gallery: z.array(z.string().url()).default([]),
  featuredImage: z.string().url(),
  active: z.boolean().default(true)
});

export const spaServiceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  durationMinutes: z.coerce.number().int().min(15).max(360),
  price: z.coerce.number().min(0),
  description: z.string().min(5),
  featuredImage: z.string().url(),
  active: z.boolean().default(true)
});

export const menuItemSchema = z.object({
  category: z.string().min(2),
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  description: z.string().min(5),
  price: z.coerce.number().min(0),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().url(),
  active: z.boolean().default(true)
});

export const galleryItemSchema = z.object({
  category: z.string().min(2),
  title: z.string().min(2),
  image: z.string().url(),
  active: z.boolean().default(true)
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  quote: z.string().min(5),
  rating: z.coerce.number().int().min(1).max(5).optional().default(5),
  active: z.boolean().default(true)
});

export const blogPostSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  excerpt: z.string().min(5),
  content: z.string().min(5),
  tag: z.string().min(2),
  featuredImage: z.string().url(),
  published: z.boolean().default(false)
});

export const availabilityBlockSchema = z.object({
  type: z.enum(["room", "spa", "lounge", "event"]),
  resourceId: z.string().optional().default(""),
  from: dateString,
  to: dateString,
  reason: z.string().max(300).optional().default("")
});

export const metaSchema = z.object({
  brandName: z.string().min(2),
  tagline: z.string().min(2),
  openingDate: z.string().min(8),
  location: z.string().min(2),
  phone,
  email,
  website: z.string().min(2),
  whatsapp: z.string().url(),
  imageSlots: z.object({
    hero: z.string().url().optional().default(""),
    pool: z.string().url().optional().default(""),
    spa: z.string().url().optional().default(""),
    lounge: z.string().url().optional().default(""),
    suite: z.string().url().optional().default(""),
    garden: z.string().url().optional().default("")
  }).optional().default({}),
  socials: z.array(z.object({
    label: z.string().min(2),
    handle: z.string().min(2),
    href: z.string().url()
  })).default([]),
  rongoApartment: z.object({
    active: z.boolean().default(true),
    eyebrow: z.string().max(80).optional().default("Partner Property"),
    title: z.string().max(120).optional().default("Rongo Apartment"),
    description: z.string().max(1200).optional().default(""),
    ctaLabel: z.string().max(80).optional().default("Request Details"),
    ctaHref: z.string().min(1).optional().default("/contact"),
    images: z.array(z.string().url()).default([])
  }).optional().default({}),
  seoKeywords: z.array(z.string()).default([])
});
