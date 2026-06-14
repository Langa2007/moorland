import express from "express";
import { db } from "../db/index.js";
import { asyncHandler, notFound } from "../utils/errors.js";
import { validate } from "../middleware/validate.js";
import {
  accommodationBookingSchema,
  availabilityQuerySchema,
  contactSchema,
  foodOrderSchema,
  loungeReservationSchema,
  newsletterSchema,
  paymentInitSchema,
  slugParamSchema,
  spaBookingSchema
} from "../validators/schemas.js";
import { buildAvailability, assertRoomAvailable, assertSpaAvailable } from "../services/availabilityService.js";
import { createId, now } from "../utils/ids.js";
import { hydrateOrderItems } from "../services/orderService.js";
import { createPayment } from "../services/paymentService.js";
import { sendAdminNotification } from "../services/emailService.js";

const router = express.Router();

function activeOnly(items) {
  return items.filter((item) => item.active !== false);
}

router.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok", service: "moorland-backend", timestamp: now() });
});

router.get("/site", asyncHandler(async (_req, res) => {
  const data = await db.all();
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.json({
    success: true,
    data: {
      meta: data.meta,
      rooms: activeOnly(data.rooms).sort((a, b) => a.order - b.order),
      spaServices: activeOnly(data.spaServices),
      menuItems: activeOnly(data.menuItems),
      gallery: activeOnly(data.gallery),
      testimonials: activeOnly(data.testimonials),
      blogPosts: data.blogPosts.filter((post) => post.published)
    }
  });
}));

router.get("/meta", asyncHandler(async (_req, res) => res.json({ success: true, data: await db.get("meta") })));

router.get("/rooms", asyncHandler(async (_req, res) => {
  res.json({ success: true, data: activeOnly(await db.get("rooms")).sort((a, b) => a.order - b.order) });
}));

router.get("/rooms/:slug", validate(slugParamSchema, "params"), asyncHandler(async (req, res, next) => {
  const room = (await db.get("rooms")).find((item) => item.slug === req.params.slug && item.active);
  if (!room) return next(notFound("Room not found"));
  return res.json({ success: true, data: room });
}));

router.get("/spa-services", asyncHandler(async (_req, res) => {
  res.json({ success: true, data: activeOnly(await db.get("spaServices")) });
}));

router.get("/menu", asyncHandler(async (req, res) => {
  const category = req.query.category?.toString();
  const items = activeOnly(await db.get("menuItems"));
  res.json({
    success: true,
    data: category ? items.filter((item) => item.category === category) : items
  });
}));

router.get("/gallery", asyncHandler(async (req, res) => {
  const category = req.query.category?.toString();
  const items = activeOnly(await db.get("gallery"));
  res.json({ success: true, data: category ? items.filter((item) => item.category === category) : items });
}));

router.get("/testimonials", asyncHandler(async (_req, res) => {
  res.json({ success: true, data: activeOnly(await db.get("testimonials")) });
}));

router.get("/blog", asyncHandler(async (_req, res) => {
  res.json({ success: true, data: (await db.get("blogPosts")).filter((item) => item.published) });
}));

router.get("/blog/:slug", validate(slugParamSchema, "params"), asyncHandler(async (req, res, next) => {
  const post = (await db.get("blogPosts")).find((item) => item.slug === req.params.slug && item.published);
  if (!post) return next(notFound("Blog post not found"));
  return res.json({ success: true, data: post });
}));

router.get("/availability", validate(availabilityQuerySchema, "query"), asyncHandler(async (req, res) => {
  res.json({ success: true, data: await buildAvailability(req.query) });
}));

router.post("/bookings/accommodation", validate(accommodationBookingSchema), asyncHandler(async (req, res) => {
  const room = (await db.get("rooms")).find((item) => item.id === req.body.roomId && item.active);
  if (!room) throw notFound("Room not found");
  await assertRoomAvailable(room.id, req.body.checkIn, req.body.checkOut);

  const nights = Math.ceil((new Date(req.body.checkOut) - new Date(req.body.checkIn)) / (1000 * 60 * 60 * 24));
  const total = room.rate * nights;
  const booking = await db.insert("accommodationBookings", {
    id: createId("stay"),
    ...req.body,
    roomName: room.name,
    nights,
    total,
    status: "pending"
  });

  const payment = req.body.paymentMethod === "cash"
    ? null
    : await createPayment({
      referenceType: "accommodation",
      referenceId: booking.id,
      method: req.body.paymentMethod,
      amount: total,
      phone: req.body.phone
    });

  await sendAdminNotification({
    subject: "New accommodation booking",
    title: "New accommodation booking",
    lines: [`Guest: ${booking.name}`, `Room: ${booking.roomName}`, `Dates: ${booking.checkIn} to ${booking.checkOut}`]
  }).catch(() => null);

  res.status(201).json({ success: true, data: { booking, payment } });
}));

router.post("/bookings/spa", validate(spaBookingSchema), asyncHandler(async (req, res) => {
  const service = (await db.get("spaServices")).find((item) => item.id === req.body.serviceId && item.active);
  if (!service) throw notFound("SPA service not found");
  await assertSpaAvailable(service.id, req.body.date, req.body.time);

  const total = service.price * req.body.guests;
  const booking = await db.insert("spaBookings", {
    id: createId("spa"),
    ...req.body,
    serviceName: service.name,
    total,
    status: "pending"
  });

  const payment = req.body.paymentMethod === "cash"
    ? null
    : await createPayment({
      referenceType: "spa",
      referenceId: booking.id,
      method: req.body.paymentMethod,
      amount: total,
      phone: req.body.phone
    });

  await sendAdminNotification({
    subject: "New SPA booking",
    title: "New SPA booking",
    lines: [`Guest: ${booking.name}`, `Service: ${booking.serviceName}`, `Time: ${booking.date} ${booking.time}`]
  }).catch(() => null);

  res.status(201).json({ success: true, data: { booking, payment } });
}));

router.post("/reservations/lounge", validate(loungeReservationSchema), asyncHandler(async (req, res) => {
  const reservation = await db.insert("loungeReservations", {
    id: createId("lounge"),
    ...req.body,
    status: "pending"
  });
  await sendAdminNotification({
    subject: "New lounge reservation",
    title: "New lounge reservation",
    lines: [`Guest: ${reservation.name}`, `Guests: ${reservation.guests}`, `Time: ${reservation.date} ${reservation.time}`]
  }).catch(() => null);
  res.status(201).json({ success: true, data: reservation });
}));

router.post("/orders/food", validate(foodOrderSchema), asyncHandler(async (req, res) => {
  const orderSummary = await hydrateOrderItems(req.body.items);
  const order = await db.insert("foodOrders", {
    id: createId("order"),
    ...req.body,
    items: orderSummary.items,
    total: orderSummary.total,
    status: "pending"
  });

  const payment = req.body.paymentMethod === "cash"
    ? null
    : await createPayment({
      referenceType: "food-order",
      referenceId: order.id,
      method: req.body.paymentMethod,
      amount: order.total,
      phone: req.body.phone
    });

  await sendAdminNotification({
    subject: "New food order",
    title: "New food order",
    lines: [`Guest: ${order.name}`, `Order type: ${order.orderType}`, `Total: KSh ${order.total}`]
  }).catch(() => null);

  res.status(201).json({ success: true, data: { order, payment } });
}));

router.post("/contact", validate(contactSchema), asyncHandler(async (req, res) => {
  const message = await db.insert("contacts", {
    id: createId("contact"),
    ...req.body,
    status: "new"
  });
  await sendAdminNotification({
    subject: "New website contact",
    title: "New website contact",
    lines: [`From: ${message.name} <${message.email}>`, `Interest: ${message.interest}`, message.message]
  }).catch(() => null);
  res.status(201).json({ success: true, data: message });
}));

router.post("/newsletter", validate(newsletterSchema), asyncHandler(async (req, res) => {
  const existing = (await db.get("newsletterSubscribers")).find((item) => item.email === req.body.email);
  if (existing) {
    return res.json({ success: true, data: existing, message: "Already subscribed" });
  }
  const subscriber = await db.insert("newsletterSubscribers", {
    id: createId("sub"),
    ...req.body,
    status: "active"
  });
  return res.status(201).json({ success: true, data: subscriber });
}));

router.post("/payments/initiate", validate(paymentInitSchema), asyncHandler(async (req, res) => {
  const payment = await createPayment(req.body);
  res.status(201).json({ success: true, data: payment });
}));

export default router;
