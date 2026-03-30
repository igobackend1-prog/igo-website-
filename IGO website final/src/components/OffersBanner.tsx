import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { getActiveOffers, initDefaultOffers, OfferPoster } from "@/data/offersData";

/* ─────────────────────────────────────────────────────────────
   Crossfade variants — same timing for BOTH the ambient
   background AND the poster image, so they dissolve together.
───────────────────────────────────────────────────────────── */
const fadeIn  = { opacity: 0 };
const fadeOut = { opacity: 0, transition: { duration: 0.55, ease: "easeInOut" as const } };
const visible = { opacity: 1, transition: { duration: 0.65, ease: "easeInOut" as const } };

/* ─── Badge colours ──────────────────────────────────────────── */
const BADGE_COLOR: Record<string, string> = {
  "HOT DEAL":   "bg-red-500",
  "NEW":         "bg-blue-500",
  "LIMITED":     "bg-orange-500",
  "SPECIAL":     "bg-purple-500",
  "SEASONAL":    "bg-teal-500",
  "FLASH SALE":  "bg-yellow-400 text-black",
};

/* ─── Countdown timer ────────────────────────────────────────── */
const useCountdown = (expiryDate: string | null) => {
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!expiryDate) { setLabel(""); return; }
    const tick = () => {
      const diff = new Date(expiryDate).getTime() - Date.now();
      if (diff <= 0) { setLabel(""); return; }
      const d = Math.floor(diff / 86_400_000);
      const h = Math.floor((diff % 86_400_000) / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setLabel(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [expiryDate]);
  return label;
};

/* ─── Single poster slide ────────────────────────────────────── */
const Slide = ({
  poster, heroMode, onPause, onResume, onSwipeLeft, onSwipeRight,
}: {
  poster: OfferPoster;
  heroMode: boolean;
  onPause: () => void;
  onResume: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}) => {
  const countdown  = useCountdown(poster.expiryDate);
  const hasOverlay = !!(poster.title || poster.subtitle || poster.badge || countdown);
  const touchX     = useRef(0);

  return (
    <motion.div
      initial={fadeIn}
      animate={visible}
      exit={fadeOut}
      className="absolute inset-0 flex flex-col pt-[max(env(safe-area-inset-top),_0px)]"
      style={{ willChange: "opacity", WebkitTransform: "translateZ(0)" }}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? onSwipeLeft() : onSwipeRight();
      }}
    >

      {/* ══════════════════════════════════════════════════════════
          LAYER 1 — Ambient blurred background
          Scales up the same poster image, blurs it heavily so
          only the colour tones remain. Works automatically for
          every poster — current and future — with zero manual
          configuration.
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {poster.image ? (
          <img
            src={poster.image}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform:  "scale(1.55) translateZ(0)",
              filter:     "blur(90px)",
              opacity:    0.72,
              willChange: "opacity, transform, filter",
            }}
          />
        ) : (
          /* Fallback for colour-only posters (no image) */
          <div
            className="absolute inset-0"
            style={{ background: poster.bgColor || "#0a3d0a" }}
          />
        )}

        {/* Dark vignette — deepens edges, improves text contrast */}
        <div className="absolute inset-0 bg-black/28" />
        {/* Subtle gradient — top lighter, bottom darker */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
        {/* Side vignettes — soften left/right edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2 — Poster image (sharp, object-contain, centred)
          Masked at edges so it dissolves into the ambient layer
          for a seamless, premium blended look.
      ══════════════════════════════════════════════════════════ */}
      <div
        className="flex-1 flex items-center justify-center w-full min-h-0 relative z-10"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 88% 82% at 50% 50%, black 52%, transparent 100%)",
          maskImage:        "radial-gradient(ellipse 88% 82% at 50% 50%, black 52%, transparent 100%)",
        }}
      >
        {poster.image ? (
          <img
            src={poster.image}
            alt={poster.title || "IGO Offer"}
            className="w-full h-full object-contain"
            draggable={false}
            style={{ display: "block" }}
          />
        ) : (
          <div className="w-full h-full" style={{ background: poster.bgColor || "#0a3d0a" }} />
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 3 — Text overlay (title / badge / countdown / CTA)
          Only rendered when the poster has text fields set.
      ══════════════════════════════════════════════════════════ */}
      {hasOverlay && (
        <div className="absolute inset-0 flex items-end pointer-events-none z-20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className={`relative z-10 pointer-events-auto pb-16 ${heroMode ? "px-10 md:px-20" : "px-8 md:px-14"}`}>
            <div className="space-y-2.5 max-w-xl">

              {poster.badge && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] rounded-full text-white shadow-md ${BADGE_COLOR[poster.badge] || "bg-primary"}`}
                >
                  {poster.badge}
                </motion.span>
              )}

              {poster.title && (
                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white font-black leading-tight drop-shadow-xl"
                  style={{ fontSize: heroMode ? "clamp(1.8rem, 3.5vw, 3.2rem)" : "clamp(1.2rem, 2.5vw, 2rem)" }}
                >
                  {poster.title}
                </motion.h2>
              )}

              {poster.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80 font-medium leading-relaxed text-sm md:text-base"
                >
                  {poster.subtitle}
                </motion.p>
              )}

              {countdown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-2 text-white/70 text-xs font-semibold"
                >
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  Expires in: <span className="text-white font-black ml-1">{countdown}</span>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <Link
                  to={poster.ctaLink || "/contact"}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-xl"
                >
                  {poster.ctaLabel || "Enquire Now"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA only (full-image posters with no title set) ── */}
      {!hasOverlay && (poster.ctaLabel || poster.ctaLink) && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-20" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`absolute z-20 pointer-events-auto ${heroMode ? "bottom-16 left-10 md:left-20" : "bottom-12 left-8 md:left-12"}`}
          >
            <Link
              to={poster.ctaLink || "/contact"}
              className="inline-flex items-center gap-2 px-7 py-3 bg-white/90 backdrop-blur-sm text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-white hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              {poster.ctaLabel || "Enquire Now"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

/* ─── Main component ─────────────────────────────────────────── */
interface OffersBannerProps {
  heroMode?: boolean;
}

const OffersBanner = ({ heroMode = false }: OffersBannerProps) => {
  const [posters,  setPosters]  = useState<OfferPoster[]>([]);
  const [idx,      setIdx]      = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const load = useCallback(() => {
    initDefaultOffers();
    setPosters(getActiveOffers());
  }, []);

  useEffect(() => {
    load();
    window.addEventListener("focus",   load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("focus",   load);
      window.removeEventListener("storage", load);
    };
  }, [load]);

  const goNext = useCallback(() =>
    setIdx(i => (i + 1) % (posters.length || 1)),
  [posters.length]);

  const goPrev = useCallback(() =>
    setIdx(i => (i - 1 + (posters.length || 1)) % (posters.length || 1)),
  [posters.length]);

  useEffect(() => {
    if (posters.length <= 1 || isPaused) return;
    const id = setInterval(goNext, 4000);
    return () => clearInterval(id);
  }, [posters.length, isPaused, goNext]);

  useEffect(() => {
    if (posters.length && idx >= posters.length) setIdx(0);
  }, [posters.length, idx]);

  if (!posters.length) return null;

  const poster = posters[idx];

  const NAVBAR_H = 88; // fixed navbar: h-14 logo (56px) + py-4 (16×2) = 88px

  /*
   * bg-black is just a brief flash fallback during the first image load.
   * Once the blurred ambient layer renders, it covers this completely.
   */
  const sectionClass = "relative w-full select-none bg-black overflow-hidden";

  const sectionStyle = heroMode
    ? { marginTop: NAVBAR_H, height: `calc(100dvh - ${NAVBAR_H}px)`, minHeight: 500 - NAVBAR_H }
    : {};

  return (
    <section className={sectionClass} style={sectionStyle}>

      {/* ── Slides (ambient bg + poster + overlays, all crossfade together) ── */}
      <AnimatePresence mode="sync">
        <Slide
          key={poster.id}
          poster={poster}
          heroMode={heroMode}
          onPause={() => setIsPaused(true)}
          onResume={() => setIsPaused(false)}
          onSwipeLeft={goNext}
          onSwipeRight={goPrev}
        />
      </AnimatePresence>

      {/* ── Arrow buttons ── */}
      {posters.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* ── Dot indicators + counter + view-all ── */}
      <div className={`absolute left-0 right-0 z-30 flex items-center justify-between ${heroMode ? "bottom-6 px-8 md:px-14" : "bottom-3 px-5 md:px-12"}`}>
        <div className="flex items-center gap-2">
          {posters.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              animate={{ width: i === idx ? 28 : 8, opacity: i === idx ? 1 : 0.4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-2 rounded-full bg-white shadow shrink-0"
            />
          ))}
          <span className="text-white/45 text-[10px] font-bold tabular-nums ml-2">
            {idx + 1} / {posters.length}
          </span>
        </div>

        <Link
          to="/offers"
          className="hidden sm:flex items-center gap-1.5 text-white/55 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          View All Offers →
        </Link>
      </div>

      {/* ── Scroll cue (hero only) ── */}
      {heroMode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1 pointer-events-none">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-white/20 relative overflow-hidden"
          >
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white/60"
            />
          </motion.div>
        </div>
      )}

      {/* ── Progress bar sweeps in 3 s ── */}
      {posters.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30 overflow-hidden">
          {!isPaused && (
            <motion.div
              key={idx + "-bar"}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4, ease: "linear" }}
              style={{ originX: 0 }}
              className="h-full bg-white/55 w-full"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default OffersBanner;
