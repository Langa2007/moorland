import { db } from "../db/index.js";
import { now } from "../utils/ids.js";
import { sendStatusNotification } from "./emailService.js";
import { markPaymentStatus } from "./paymentService.js";

const collectionKinds = {
  accommodationBookings: "accommodation booking",
  spaBookings: "Spa booking",
  loungeReservations: "lounge reservation",
  eventBookings: "event booking",
  foodOrders: "food order",
  contacts: "inquiry",
  newsletterSubscribers: "newsletter subscription",
  reviews: "review",
  payments: "payment"
};

export async function updateTransactionStatus(collection, id, status) {
  if (collection === "payments") return markPaymentStatus(id, status);

  const record = await db.update(collection, id, { status, updatedAt: now() });
  if (!record) return null;

  if (
    ["accommodationBookings", "spaBookings", "loungeReservations", "eventBookings", "foodOrders"].includes(collection) &&
    ["confirmed", "cancelled", "completed"].includes(status)
  ) {
    await sendStatusNotification({
      record,
      kind: collectionKinds[collection] || "request",
      status
    }).catch(() => null);
  }

  if (collection === "reviews" && status === "confirmed") {
    const existing = (await db.get("testimonials")).find((item) => item.reviewId === record.id);
    if (!existing) {
      await db.insert("testimonials", {
        id: `testimonial_${record.id}`,
        reviewId: record.id,
        name: record.name,
        role: record.role || "Guest",
        rating: record.rating || 5,
        quote: record.quote,
        active: true
      });
    }
  }

  return record;
}
