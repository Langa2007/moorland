"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("moorland_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("moorland_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("moorland_cookie_consent", "essential");
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(
      "moorland_cookie_consent",
      JSON.stringify({
        essential: true,
        analytics: analyticsConsent,
        marketing: marketingConsent
      })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-pool/30 bg-charcoal/95 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md text-ivory"
        >
          <div className="mx-auto w-full max-w-[1400px] px-6 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h4 className="font-serif text-xl font-bold tracking-wide text-pool">We Value Your Privacy</h4>
                <p className="mt-2 text-sm leading-6 text-cream/80">
                  Moorland House & Spa uses cookies to personalize your experience, analyze our website traffic, and support our social media integrations. By clicking "Accept All", you consent to our use of all cookies. You can also customize your preferences or choose to reject non-essential cookies. Learn more in our{" "}
                  <Link href="/cookie-policy" className="text-pool underline hover:text-pool/80">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
                <button
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-white/10 hover:border-pool"
                >
                  {showCustomize ? "Hide Customization" : "Customize"}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-white/10 hover:border-pool"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-full bg-pool px-6 py-2.5 text-sm font-black text-charcoal shadow-glow transition hover:scale-105"
                >
                  Accept All
                </button>
              </div>
            </div>

            {showCustomize && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 border-t border-white/10 pt-6"
              >
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-ivory">Essential Cookies</span>
                      <span className="rounded bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pool">Required</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-cream/60">
                      Necessary for secure navigation, table bookings, spa schedules, and essential site operation. Cannot be disabled.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-ivory">Analytics & Performance</span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={analyticsConsent}
                          onChange={(e) => setAnalyticsConsent(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-cream after:transition-all after:content-[''] peer-checked:bg-pool peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-cream/60">
                      Allows us to count visits and trace traffic sources so we can measure and improve the speed and usability of our website.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-ivory">Marketing & Social Media</span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-cream after:transition-all after:content-[''] peer-checked:bg-pool peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-cream/60">
                      Enables social sharing buttons, Google Maps location widgets, and lets us show you relevant Moorland promotions on other sites.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveCustom}
                    className="rounded-full bg-ivory px-6 py-2 text-sm font-black text-charcoal transition hover:bg-cream"
                  >
                    Save Selection
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
