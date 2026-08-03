"use client";

import { useState, useEffect } from "react";
import { gallery } from "@/lib/data";

export default function GalleryGrid({ items = gallery }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const filters = ["All", ...new Set(items.map((item) => item.category))];
  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setItemsPerView(4);
      else if (width >= 1024) setItemsPerView(3);
      else if (width >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize(); // initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Handle 2 layers if more than 20 items in current filter
  const isDoubleLayer = visible.length > 20;
  const slides = [];
  if (isDoubleLayer) {
    for (let i = 0; i < visible.length; i += 2) {
      slides.push(visible.slice(i, i + 2));
    }
  } else {
    for (let i = 0; i < visible.length; i++) {
      slides.push([visible[i]]);
    }
  }

  const maxIndex = Math.max(0, slides.length - itemsPerView);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (maxIndex <= 0) return; // No need to slide

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const slideWidth = 100 / itemsPerView;

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
      
      <div className="relative w-full overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
        >
          {slides.map((slideGroup, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 px-2"
              style={{ width: `${slideWidth}%` }}
            >
              <div className="flex flex-col gap-4">
                {slideGroup.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className="group flex w-full flex-col overflow-hidden rounded-lg text-left shadow-soft"
                    onClick={() => setActive(item)}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
                    </div>
                    <span className="block flex-grow bg-ivory p-4">
                      <span className="block text-xs font-black uppercase tracking-[0.14em] text-pool">{item.category}</span>
                      <span className="mt-1 block font-serif text-xl font-bold">{item.title}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        {maxIndex > 0 && (
          <>
            <button 
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-charcoal shadow-lg transition hover:bg-white disabled:opacity-0 disabled:pointer-events-none"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-charcoal shadow-lg transition hover:bg-white disabled:opacity-0 disabled:pointer-events-none"
              onClick={() => setCurrentIndex(prev => Math.min(maxIndex, prev + 1))}
              disabled={currentIndex === maxIndex}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-charcoal/90 p-4" role="dialog" aria-modal="true">
          <button className="absolute right-5 top-5 btn-primary" type="button" onClick={() => setActive(null)}>
            Close
          </button>
          <figure className="max-h-[86dvh] max-w-5xl overflow-hidden rounded-lg bg-ivory">
            <img src={active.image} alt={active.title} className="max-h-[76dvh] w-full object-contain" />
            <figcaption className="p-4 font-bold text-charcoal">{active.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
