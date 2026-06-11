"use client";

import { useState } from "react";
import { gallery } from "@/lib/data";

export default function GalleryGrid() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const filters = ["All", ...new Set(gallery.map((item) => item.category))];
  const visible = filter === "All" ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-bold ${filter === item ? "border-pool bg-pool text-charcoal" : "border-mist/20 bg-white text-mist"}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="masonry">
        {visible.map((item) => (
          <button
            key={item.title}
            type="button"
            className="masonry-item group w-full overflow-hidden rounded-lg text-left shadow-soft"
            onClick={() => setActive(item)}
          >
            <img src={item.image} alt={item.title} className="w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
            <span className="block bg-ivory p-4">
              <span className="block text-xs font-black uppercase tracking-[0.14em] text-pool">{item.category}</span>
              <span className="mt-1 block font-serif text-xl font-bold">{item.title}</span>
            </span>
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-charcoal/90 p-4" role="dialog" aria-modal="true">
          <button className="absolute right-5 top-5 btn-primary" type="button" onClick={() => setActive(null)}>
            Close
          </button>
          <figure className="max-h-[86dvh] max-w-5xl overflow-hidden rounded-lg bg-ivory">
            <img src={active.image} alt={active.title} className="max-h-[76dvh] w-full object-contain" />
            <figcaption className="p-4 font-bold">{active.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
