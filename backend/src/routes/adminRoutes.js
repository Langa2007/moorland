import express from "express";
import { db } from "../db/index.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  availabilityBlockSchema,
  blogPostSchema,
  galleryItemSchema,
  idParamSchema,
  menuItemSchema,
  metaSchema,
  roomSchema,
  spaServiceSchema,
  statusPatchSchema,
  testimonialSchema
} from "../validators/schemas.js";
import { AppError, notFound } from "../utils/errors.js";
import { asyncHandler } from "../utils/errors.js";
import { createId, createSlug, now } from "../utils/ids.js";

const router = express.Router();

router.use(requireAuth, requireAdmin);

const collectionConfig = {
  rooms: { schema: roomSchema, prefix: "room", slug: true },
  spaServices: { schema: spaServiceSchema, prefix: "spa", slug: true },
  menuItems: { schema: menuItemSchema, prefix: "menu", slug: true },
  gallery: { schema: galleryItemSchema, prefix: "gallery" },
  testimonials: { schema: testimonialSchema, prefix: "testimonial" },
  blogPosts: { schema: blogPostSchema, prefix: "blog", slug: true },
  availabilityBlocks: { schema: availabilityBlockSchema, prefix: "block" }
};

const transactionalCollections = [
  "accommodationBookings",
  "spaBookings",
  "loungeReservations",
  "foodOrders",
  "contacts",
  "newsletterSubscribers",
  "payments",
  "uploads"
];

function normalizeCollection(collection, body = {}) {
  if (collection === "galleryItems") return "gallery";
  if (
    (collection === "undefined" || collection === undefined) &&
    typeof body === "object" &&
    body &&
    "category" in body &&
    "title" in body &&
    "image" in body
  ) {
    return "gallery";
  }
  return collection;
}

function getConfig(collection, body) {
  const normalizedCollection = normalizeCollection(collection, body);
  const config = collectionConfig[normalizedCollection];
  if (!config) throw new AppError(`Unsupported admin collection: ${collection || "missing"}`, 404);
  return config;
}

router.get("/dashboard", asyncHandler(async (_req, res) => {
  const data = await db.all();
  res.json({
    success: true,
    data: {
      counts: {
        rooms: data.rooms.length,
        spaServices: data.spaServices.length,
        menuItems: data.menuItems.length,
        gallery: data.gallery.length,
        accommodationBookings: data.accommodationBookings.length,
        spaBookings: data.spaBookings.length,
        loungeReservations: data.loungeReservations.length,
        foodOrders: data.foodOrders.length,
        contacts: data.contacts.length,
        newsletterSubscribers: data.newsletterSubscribers.length
      },
      recent: {
        accommodationBookings: data.accommodationBookings.slice(-5).reverse(),
        spaBookings: data.spaBookings.slice(-5).reverse(),
        foodOrders: data.foodOrders.slice(-5).reverse(),
        contacts: data.contacts.slice(-5).reverse()
      }
    }
  });
}));

router.get("/meta", asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await db.get("meta") });
}));

router.patch("/meta", validate(metaSchema), asyncHandler(async (req, res) => {
  const meta = { ...req.body, updatedAt: now() };
  await db.set("meta", meta);
  res.json({ success: true, data: meta });
}));

router.get("/transactions/:collection", asyncHandler(async (req, res, next) => {
  const { collection } = req.params;
  if (!transactionalCollections.includes(collection)) return next(notFound("Collection not found"));
  return res.json({ success: true, data: (await db.get(collection)) || [] });
}));

router.patch(
  "/transactions/:collection/:id/status",
  validate(idParamSchema, "params"),
  validate(statusPatchSchema),
  asyncHandler(async (req, res, next) => {
    const { collection, id } = req.params;
    if (!transactionalCollections.includes(collection)) return next(notFound("Collection not found"));
    const record = await db.update(collection, id, { status: req.body.status });
    if (!record) return next(notFound("Record not found"));
    return res.json({ success: true, data: record });
  })
);

router.get("/:collection", asyncHandler(async (req, res) => {
  const collection = normalizeCollection(req.params.collection);
  getConfig(collection);
  res.json({ success: true, data: (await db.get(collection)) || [] });
}));

router.post("/:collection", asyncHandler(async (req, res, next) => {
  try {
    const collection = normalizeCollection(req.params.collection, req.body);
    const config = getConfig(collection, req.body);
    const parsed = config.schema.safeParse(req.body);
    if (!parsed.success) throw new AppError("Validation failed", 422, parsed.error.flatten());
    const payload = {
      id: createId(config.prefix),
      ...parsed.data
    };
    if (config.slug) payload.slug = payload.slug || createSlug(payload.title || payload.name);
    const record = await db.insert(collection, payload);
    return res.status(201).json({ success: true, data: record });
  } catch (error) {
    return next(error);
  }
}));

router.patch("/:collection/:id", validate(idParamSchema, "params"), asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = normalizeCollection(req.params.collection, req.body);
    const config = getConfig(collection, req.body);
    const current = ((await db.get(collection)) || []).find((item) => item.id === id);
    const parsed = current ? config.schema.partial().safeParse(req.body) : config.schema.safeParse(req.body);
    if (!parsed.success) throw new AppError("Validation failed", 422, parsed.error.flatten());
    const payload = { ...parsed.data };
    if (config.slug && !payload.slug && (payload.title || payload.name)) {
      payload.slug = createSlug(payload.title || payload.name);
    }
    const record = current
      ? await db.update(collection, id, payload)
      : await db.insert(collection, { id, ...payload });
    return res.json({ success: true, data: record });
  } catch (error) {
    return next(error);
  }
}));

router.delete("/:collection/:id", validate(idParamSchema, "params"), asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = normalizeCollection(req.params.collection);
    getConfig(collection);
    const record = await db.remove(collection, id);
    if (!record) return next(notFound("Record not found"));
    return res.json({ success: true, data: record });
  } catch (error) {
    return next(error);
  }
}));

export default router;
