"use client";

import { useMemo, useState } from "react";
import { menuItems } from "@/lib/data";

export default function FoodOrder() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
  const visible = category === "All" ? menuItems : menuItems.filter((item) => item.category === category);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
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
              <img src={item.image} alt={item.name} className="h-56 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-bold">{item.name}</h3>
                  <p className="font-black text-wood">KSh {item.price.toLocaleString()}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-mist">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-mist">{tag}</span>
                  ))}
                </div>
                <button className="btn-secondary mt-5 w-full" type="button" onClick={() => setCart((items) => [...items, item])}>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="soft-card h-fit rounded-lg p-5 lg:sticky lg:top-28">
        <h3 className="font-serif text-2xl font-bold">Order Preview</h3>
        <div className="mt-4 grid gap-3">
          {cart.length === 0 ? (
            <p className="text-sm leading-6 text-mist">Add dishes to preview the lounge ordering experience.</p>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between gap-4 border-b border-mist/15 pb-3 text-sm">
                <span>{item.name}</span>
                <span className="font-bold">KSh {item.price.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-5 flex justify-between border-t border-mist/20 pt-4 font-black">
          <span>Total</span>
          <span>KSh {total.toLocaleString()}</span>
        </div>
        <button className="btn-primary mt-5 w-full" type="button">Checkout Preview</button>
        <p className="mt-3 text-xs leading-5 text-mist">M-Pesa STK push, card, and mobile money will connect to backend payment gateways.</p>
      </aside>
    </div>
  );
}
