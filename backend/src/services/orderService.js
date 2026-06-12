import { db } from "../db/index.js";
import { AppError } from "../utils/errors.js";

export async function hydrateOrderItems(items) {
  const menuItems = await db.get("menuItems");
  let total = 0;

  const hydrated = items.map((item) => {
    const menuItem = menuItems.find((candidate) => candidate.id === item.menuItemId && candidate.active);
    if (!menuItem) {
      throw new AppError(`Menu item not available: ${item.menuItemId}`, 422);
    }
    const lineTotal = menuItem.price * item.quantity;
    total += lineTotal;
    return {
      menuItemId: menuItem.id,
      name: menuItem.name,
      quantity: item.quantity,
      unitPrice: menuItem.price,
      lineTotal,
      notes: item.notes || ""
    };
  });

  return { items: hydrated, total };
}
