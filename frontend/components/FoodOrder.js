"use client";

import { useMemo, useState } from "react";
import { contact, menuItems } from "@/lib/data";

export default function FoodOrder({ items = menuItems }) {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [added, setAdded] = useState("");
  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const visible = category === "All" ? items : items.filter((item) => item.category === category);
  const cartLines = useMemo(() => cart.reduce((lines, item) => {
    const current = lines.find((line) => line.id === item.id);
    if (current) {
      current.quantity += 1;
      current.lineTotal += item.price;
      return lines;
    }
    return [...lines, { ...item, quantity: 1, lineTotal: item.price }];
  }, []), [cart]);
  const total = useMemo(() => cartLines.reduce((sum, item) => sum + item.lineTotal, 0), [cartLines]);
  const itemCount = useMemo(() => cartLines.reduce((sum, item) => sum + item.quantity, 0), [cartLines]);
  const orderText = useMemo(() => {
    if (!cartLines.length) return contact.whatsapp;
    return `${contact.whatsapp}?text=${encodeURIComponent(`Hello Moorland, I would like to order:\n${cartLines.map((item) => `${item.quantity}x ${item.name} - KSh ${item.lineTotal.toLocaleString()}`).join("\n")}\nTotal: KSh ${total.toLocaleString()}`)}`;
  }, [cartLines, total]);

  function addToCart(item) {
    setCart((current) => [...current, item]);
    setAdded(`${item.name} added to your order`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              className={`rounded-full border px-4 py-2 text-sm font-bold ${category === item ? "border-pool bg-pool text-charcoal" : "border-mist/20 bg-white text-mist"}`}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((item) => (
            <article key={item.id} className="soft-card overflow-hidden rounded-lg">
              <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-pool">{item.category}</p>
                    <h3 className="mt-1 font-serif text-2xl font-bold leading-tight">{item.name}</h3>
                  </div>
                  <p className="rounded-full bg-cream px-3 py-1 text-sm font-black text-wood">KSh {item.price.toLocaleString()}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-mist">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-mist">{tag}</span>
                  ))}
                </div>
                <button className="btn-secondary mt-5 w-full" type="button" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="soft-card h-fit rounded-lg p-5 lg:sticky lg:top-28">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl font-bold">Your Order</h3>
          <span className="rounded-full bg-pool/20 px-3 py-1 text-xs font-black text-charcoal">{itemCount} item{itemCount === 1 ? "" : "s"}</span>
        </div>
        {added && <p className="mt-3 rounded-lg bg-pool/15 p-3 text-sm font-bold text-charcoal" role="status">{added}</p>}
        <div className="mt-4 grid gap-3">
          {cartLines.length === 0 ? (
            <p className="text-sm leading-6 text-mist">Add dishes and our lounge team will confirm your request.</p>
          ) : (
            cartLines.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 border-b border-mist/15 pb-3 text-sm">
                <span><span className="font-black">{item.quantity}x</span> {item.name}</span>
                <span className="font-bold">KSh {item.lineTotal.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-5 flex justify-between border-t border-mist/20 pt-4 font-black">
          <span>Total</span>
          <span>KSh {total.toLocaleString()}</span>
        </div>
        {cartLines.length > 0 ? (
          <a className="btn-primary mt-5 w-full" href={orderText} target="_blank" rel="noreferrer">Continue on WhatsApp</a>
        ) : (
          <button className="btn-primary mt-5 w-full opacity-60" type="button" disabled>Add dishes first</button>
        )}
        <p className="mt-3 text-xs leading-5 text-mist">The team will confirm availability, timing, and payment details.</p>
      </aside>
    </div>
  );
}
