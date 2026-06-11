"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 5200);
    return () => clearInterval(timer);
  }, []);

  const item = testimonials[index];

  return (
    <div className="soft-card rounded-lg p-8 text-center">
      <p className="mx-auto max-w-3xl font-serif text-2xl leading-snug text-charcoal">"{item.quote}"</p>
      <p className="mt-5 font-black">{item.name}</p>
      <p className="text-sm text-mist">{item.role}</p>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, dotIndex) => (
          <button
            key={dotIndex}
            className={`h-2.5 w-2.5 rounded-full ${dotIndex === index ? "bg-pool" : "bg-mist/25"}`}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show testimonial ${dotIndex + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
