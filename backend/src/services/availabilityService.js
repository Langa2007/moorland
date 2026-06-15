import { db } from "../db/index.js";
import { AppError } from "../utils/errors.js";

function toDate(value) {
  return new Date(`${value}T00:00:00.000Z`);
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

export function assertDateOrder(start, end, label = "date range") {
  if (toDate(start) >= toDate(end)) {
    throw new AppError(`Invalid ${label}: end date must be after start date`, 422);
  }
}

export async function isBlocked({ type, resourceId = "", from, to = from }) {
  const end = type === "room" ? to : from;
  const requestedStart = toDate(from);
  const requestedEnd = type === "room" ? toDate(end) : new Date(toDate(end).getTime() + 24 * 60 * 60 * 1000);

  return (await db.get("availabilityBlocks")).some((block) => {
    const sameType = block.type === type;
    const sameResource = !block.resourceId || !resourceId || block.resourceId === resourceId;
    if (!sameType || !sameResource) return false;
    const blockStart = toDate(block.from);
    const blockEnd = new Date(toDate(block.to).getTime() + 24 * 60 * 60 * 1000);
    return rangesOverlap(requestedStart, requestedEnd, blockStart, blockEnd);
  });
}

export async function assertRoomAvailable(roomId, checkIn, checkOut) {
  assertDateOrder(checkIn, checkOut, "stay");

  if (await isBlocked({ type: "room", resourceId: roomId, from: checkIn, to: checkOut })) {
    throw new AppError("Selected room is blocked for those dates", 409);
  }

  const start = toDate(checkIn);
  const end = toDate(checkOut);
  const conflict = (await db.get("accommodationBookings")).some((booking) => {
    if (booking.roomId !== roomId) return false;
    if (["cancelled", "failed"].includes(booking.status)) return false;
    return rangesOverlap(start, end, toDate(booking.checkIn), toDate(booking.checkOut));
  });

  if (conflict) {
    throw new AppError("Selected room is already reserved for those dates", 409);
  }
}

export async function assertSpaAvailable(serviceId, date, time) {
  if (await isBlocked({ type: "spa", resourceId: serviceId, from: date, to: date })) {
    throw new AppError("Selected SPA service is blocked for that date", 409);
  }

  const conflict = (await db.get("spaBookings")).some((booking) => (
    booking.serviceId === serviceId &&
    booking.date === date &&
    booking.time === time &&
    !["cancelled", "failed"].includes(booking.status)
  ));

  if (conflict) {
    throw new AppError("Selected SPA time is already reserved", 409);
  }
}

export async function buildAvailability({ type, resourceId = "", from, to = from }) {
  let blocked = await isBlocked({ type, resourceId, from, to });
  if (!blocked && type === "event") {
    blocked = (await db.get("eventBookings")).some((booking) => (
      booking.date === from &&
      !["cancelled", "failed"].includes(booking.status)
    ));
  }
  return {
    type,
    resourceId,
    from,
    to,
    available: !blocked,
    reason: blocked ? "Blocked by admin or existing booking" : "Available in preview calendar"
  };
}
