import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { ArrowRight, Wheat, Fish, Tractor, Droplets, Leaf, Shield, Hammer, Microscope, Cog, Database, Zap, Binary, PencilRuler, Box, ChevronLeft, ChevronRight } from "lucide-react";
import { stats, projects, services, navLinks, igoBrands } from "@/data/siteData";
import { motion, AnimatePresence, Variants } from "framer-motion";
import OffersBanner from "@/components/OffersBanner";
import { getActiveOffers, initDefaultOffers } from "@/data/offersData";

const HERO_SLIDES = [
  { src: "/assets/main-page-image.png", label: "IGO Group", alt: "IGO Group Advertisement", isPoster: true },
  { src: "/assets/front 1st image .png", label: "IGO Agritech", alt: "IGO Agritech Farms", isPoster: true },
  { src: "/assets/demo poster/Copy of Website cover page.jpg.jpeg", label: "Ramadan Sale", alt: "Ramadan Sale Offer", isPoster: true },
  { src: "/assets/demo poster/Copy of Website cover page (1).jpg.jpeg", label: "Special Offer", alt: "Special Ramzan Offer", isPoster: true },
  { src: "/assets/home page image .png", label: "Smart Farms", alt: "Smart Farm" },
  { src: "/assets/projects/project subcategories/subcategories/Vertical  farming .jpg", label: "Vertical Farming", alt: "Vertical Farming" },
  { src: "/assets/projects/project subcategories/subcategories/hydroponic farming .jpg", label: "Hydroponics", alt: "Hydroponics" },
  { src: "/assets/core bussiness picture/aquatic_plants.jpg", label: "Aquaculture", alt: "Aquaculture" },
  { src: "/assets/projects/project subcategories/subcategories/dairy farming .jpg", label: "Dairy Farming", alt: "Dairy Farming" },
  { src: "/assets/core bussiness picture/farm_engineering.jpg", label: "Farm Engineering", alt: "Farm Engineering" },
  { src: "/assets/projects/project subcategories/subcategories/solar agriculture project .jpg", label: "Solar Agriculture", alt: "Solar Agriculture" },
  { src: "/assets/projects/project subcategories/subcategories/mushroom farming .jpg", label: "Mushroom Farming", alt: "Mushroom Farming" },
  { src: "/assets/core bussiness picture/livestock.jpg", label: "Livestock", alt: "Livestock" },
  { src: "/assets/projects/project subcategories/subcategories/biofloc farming .jpg", label: "Biofloc Farming", alt: "Biofloc Farming" },
];

const fader: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const slide = HERO_SLIDES[current];
  const isPoster = !!slide.isPoster;

  // Prefetch next 2 hero slides for seamless transitions
  const heroImageUrls = useMemo(() => HERO_SLIDES.map(s => s.src), []);
  useImagePreloader(heroImageUrls, current, 2);

  useEffect(() => {
    // Slide 0 (main page ad) stays 5s; all others 4.5s
    const delay = current === 0 ? 5000 : 4500;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [current]);

  // Navbar is fixed at 88px tall (h-14 logo + py-4 padding).
  // Section is 100vh total. Poster starts at 88px (below navbar),
  // so the poster fills exactly calc(100vh - 88px) = 992px on a 1080p screen.
  // Poster ratio is 2:1 — at 1920×992 container, object-cover crops only 32px
  // per side (1.67%) so the full design remains readable.
  const NAVBAR_H = 88;

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-black text-white transition-all duration-700"
      style={isPoster
        ? { height: "100vh", paddingTop: NAVBAR_H }
        : { height: "95vh" }
      }
    >
      {/* ── POSTER SLIDES: 1920×1080-target, starts below navbar, fills screen ── */}
      {isPoster && (
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full"
            style={{ height: `calc(100vh - ${NAVBAR_H}px)` }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                display: "block",
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── FARM SLIDES: full-viewport, cover, with text overlay ── */}
      {!isPoster && (
        <>
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.72, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none z-[1]" />

          {/* Hero text */}
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.2 } } }}
              className="max-w-4xl mx-auto"
            >
              <motion.p
                variants={fader}
                className="inline-block px-5 py-1.5 mb-8 text-[11px] font-black uppercase tracking-[0.25em] text-primary-foreground bg-primary rounded-full shadow-lg"
              >
                India's Leading Agri Engineering & Agri Consulting Brand
              </motion.p>
              <motion.h1 variants={fader} className="text-white mb-10 tracking-tight leading-[0.95] text-5xl md:text-7xl font-black">
                Building Profitable Smart Farms <br /> Across India.
              </motion.h1>
              <motion.div variants={fader} className="flex flex-wrap justify-center gap-6">
                <Link to="/projects" className="px-12 py-4 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-all uppercase tracking-widest">
                  View Projects
                </Link>
                <Link to="/contact" className="px-12 py-4 bg-transparent border border-white/30 text-white text-xs font-semibold rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}

      {/* Left / Right arrows
          For poster slides the section has paddingTop=NAVBAR_H, so top-1/2 of the section
          overshoots the center of the image. We shift the arrows down by NAVBAR_H/2 to
          re-centre them on the visible image. */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-5 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/30 transition-all -translate-y-1/2"
        style={{ top: isPoster ? `calc(50% + ${NAVBAR_H / 2}px)` : "50%" }}
      >
        <ArrowRight className="w-4 h-4 text-white rotate-180" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-5 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/30 transition-all -translate-y-1/2"
        style={{ top: isPoster ? `calc(50% + ${NAVBAR_H / 2}px)` : "50%" }}
      >
        <ArrowRight className="w-4 h-4 text-white" />
      </button>

      {/* Slide label + dots bottom bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] drop-shadow">
          {slide.label}
        </span>
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ${i === current ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/35 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
        <span className="text-white/40 text-[9px] font-bold tracking-widest drop-shadow">
          {current + 1} / {HERO_SLIDES.length}
        </span>
      </div>
    </section>
  );
};

const useCounter = (target: number, duration = 2000, startCounting: boolean = false) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
};

const tickerItems = [
  "15+ Years of Excellence", "15,000+ Successful Projects", "2000+ Team Members",
  "75+ Winning Awards", "Pan-India Presence", "Precision Farming Experts",
  "ISO Certified Organisation", "Trusted by 15,000+ Farmers"
];

const TickerBanner = () => (
  <div className="bg-primary overflow-hidden py-3">
    <div className="animate-ticker flex items-center whitespace-nowrap">
      {[...tickerItems, ...tickerItems].map((item, i) => (
        <span key={i} className="text-white text-xs font-bold uppercase tracking-widest px-8 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
          {item}
        </span>
      ))}
    </div>
  </div>
);

const MiniStatCard = ({ value, label }: { value: string; label: string }) => {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const numericTarget = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const count = useCounter(numericTarget, 2000, inView);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-agri-earth-50 border border-agri-earth-200 rounded-2xl p-6 flex flex-col gap-1 hover:shadow-md transition-shadow">
      <div className="text-4xl font-black tracking-tighter text-black leading-none">
        {count.toLocaleString()}<span className="text-primary">{suffix}</span>
      </div>
      <div className="text-sm text-black/50 font-medium mt-1">{label}</div>
    </div>
  );
};

const WhyChooseSection = () => (
  <section className="py-24 bg-white">
    <TickerBanner />
    <div className="container mx-auto px-6 mt-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-5">
              Why Choose IGO
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              Innovation & Profitable Growth
            </h2>
            <p className="text-black/50 text-base leading-relaxed max-w-lg">
              At IGO Agritech Farms, we don’t just build farms — we build profitable agricultural
              ecosystems designed for the future. At IGO Agritech Farms, we offer a range of
              innovative and sustainable agricultural solutions, including polyhouse projects,
              hydroponics projects, open cultivation, floriculture, goat farming, aquaculture,
              vertical farming, gardening, and rooftop gardens.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MiniStatCard value="15+" label="Years of Experience" />
            <MiniStatCard value="15,000+" label="Successful Projects" />
            <MiniStatCard value="15,000+" label="Happy Clients" />
            <MiniStatCard value="2,000+" label="Team Members" />
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 w-fit px-8 py-3.5 border-2 border-black text-sm font-bold rounded-full hover:bg-black hover:text-white transition-all"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
        >
          <img
            src="/assets/award_ceremony_ceo.png"
            alt="Agriculture Innovation Award"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

// ── Vision Section ───────────────────────────────────────────────────────────
const visionPillars = [
  {
    icon: Tractor,
    title: "Precision Farming",
    desc: "High-tech engineering that maximises yield from every square metre of land — fertile or non-fertile, outdoor, indoor, or rooftop.",
  },
  {
    icon: Leaf,
    title: "Sustainable Growth",
    desc: "Eco-first solutions that protect the earth while generating real, measurable returns on investment for every customer.",
  },
  {
    icon: Shield,
    title: "Lifetime Loyalty",
    desc: "We measure success by the loyalty of our customers — our mission is to earn their trust once and keep it forever.",
  },
  {
    icon: Hammer,
    title: "Pan-India Presence",
    desc: "From Tamil Nadu to the Himalayas, IGO's engineering and consulting footprint spans every agro-climatic zone in India.",
  },
];

const VisionSection = () => (
  <section className="py-24 bg-agri-earth-50 overflow-hidden content-defer">
    <div className="container mx-auto px-6">

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 mb-20 text-center"
      >
        <div className="flex items-center gap-4 text-agri-gold-500 font-bold text-xs uppercase tracking-[0.3em]">
          <div className="w-10 h-[1px] bg-agri-gold-500" />
          Our Vision &amp; Mission
          <div className="w-10 h-[1px] bg-agri-gold-500" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-agri-earth-900 tracking-tight">
          What Drives IGO Agritech Farms
        </h2>
        <div className="flex gap-1.5 mt-2">
          <div className="w-12 h-1.5 bg-agri-green-700 rounded-full" />
          <div className="w-4 h-1.5 bg-agri-gold-500 rounded-full" />
        </div>
      </motion.div>

      {/* ── Vision / Mission Split ── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">

        {/* Vision Card — dark green */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-agri-green-700 rounded-[2rem] p-10 md:p-14 flex flex-col justify-between overflow-hidden min-h-[340px]"
        >
          {/* decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-agri-gold-500/10 pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-agri-gold-500 bg-agri-gold-500/10 border border-agri-gold-500/30 px-4 py-1.5 rounded-full mb-8">
              Our Vision
            </span>
            {/* large quote mark */}
            <div className="text-agri-gold-500/20 text-[9rem] font-serif leading-none select-none -mb-8 -mt-4">&ldquo;</div>
            <p className="text-white text-2xl md:text-3xl font-black leading-snug tracking-tight">
              To be the leading pan-India brand in precision agriculture and Agri Engineering space.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex items-center gap-3">
            <div className="w-8 h-[2px] bg-agri-gold-500" />
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">IGO Agritech Farms</span>
          </div>
        </motion.div>

        {/* Mission Card — light */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="bg-white rounded-[2rem] p-10 md:p-14 flex flex-col justify-between border border-agri-earth-200 min-h-[340px]"
        >
          <div>
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-agri-green-700 bg-agri-green-700/10 border border-agri-green-700/20 px-4 py-1.5 rounded-full mb-8">
              Our Mission
            </span>
            <p className="text-agri-earth-900 text-lg md:text-xl font-semibold leading-relaxed mb-6">
              To win lifetime loyal customers across pan-India by farming every square metre of fertile and non-fertile open land, indoor space, and rooftop space of buildings.
            </p>
            <p className="text-black/50 text-sm leading-relaxed">
              Our mission is to generate sustainable profits and passive income for our customers through various precision farming techniques — combining high-tech engineering, professional consulting, and smart livestock ecosystems.
            </p>
          </div>

          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 w-fit text-xs font-bold uppercase tracking-wider text-agri-green-700 border-b-2 border-agri-gold-500 pb-0.5 hover:text-agri-gold-500 transition-colors"
          >
            Discover Our Story <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* ── 4 Core Value Pillars ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visionPillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group bg-white border border-agri-earth-200 rounded-[1.75rem] p-8 flex flex-col gap-5
                hover:bg-agri-green-700 hover:border-agri-green-700 hover:shadow-2xl hover:shadow-agri-green-700/15
                transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-agri-earth-50 group-hover:bg-agri-gold-500 flex items-center justify-center transition-colors duration-500">
                <Icon className="w-6 h-6 text-agri-green-700 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-black text-agri-earth-900 group-hover:text-white transition-colors duration-500 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-sm text-black/50 group-hover:text-white/70 leading-relaxed transition-colors duration-500">
                {pillar.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

    </div>
  </section>
);

// ── Featured Projects Gallery (Overlapping Cards) ──────────────────────────
const ProjectGallerySection = () => {
  const navigate = useNavigate();
  const gallProjects = [
    {
      id: "01",
      title: "Agri farming projects",
      bg: "bg-agri-earth-100",
      hoverBg: "hover:bg-agri-green-50",
      image: "/assets/projects/main page/agri farming project .jpg",
      href: "/projects/agri"
    },
    {
      id: "02",
      title: "Aquaculture Farming project",
      bg: "bg-agri-earth-100",
      hoverBg: "hover:bg-agri-green-50",
      image: "/assets/projects/main page/aquaculture farming .jpg",
      href: "/projects/aquaculture"
    },
    {
      id: "03",
      title: "Livestock Farming project",
      bg: "bg-agri-earth-100",
      hoverBg: "hover:bg-agri-green-50",
      image: "/assets/projects/main page/livestock farming.jpg",
      href: "/projects/livestock"
    },
    {
      id: "04",
      title: "Farm engineering projects",
      bg: "bg-agri-earth-100",
      hoverBg: "hover:bg-agri-green-50",
      image: "/assets/projects/main page/farm engineering .jpg",
      href: "/projects/engineering"
    }
  ];

  return (
    <section className="py-24 bg-agri-earth-25 overflow-hidden relative content-defer">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mb-20 text-center"
        >
          <div className="flex items-center gap-4 text-agri-gold-500 font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
            <div className="w-6 sm:w-10 h-[1px] bg-agri-gold-500" />
            Featured Projects
            <div className="w-6 sm:w-10 h-[1px] bg-agri-gold-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-agri-earth-900 tracking-tight">
            Featured Projects
          </h2>
          <div className="flex gap-1.5 mt-2">
            <div className="w-12 h-1.5 bg-agri-green-700 rounded-full" />
            <div className="w-4 h-1.5 bg-agri-gold-500 rounded-full" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {gallProjects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(p.href)}
              className={`group relative ${p.bg} ${p.hoverBg} rounded-[2rem] p-8 min-h-[480px] flex flex-col border border-black/5 hover:border-primary/20 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer overflow-hidden`}
            >
              <div className="text-xl font-bold text-black/20 mb-6 tracking-widest">{p.id}</div>
              <div className="max-w-[80%] relative z-10">
                <h3 className="text-2xl font-black text-black leading-tight mb-4 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/40 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1 shadow-sm">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              {/* Overlapping Image at bottom with soft-organic merge mask */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[65%] pointer-events-none"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 100%)",
                }}
              >
                <motion.img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.08 }}
                  className="w-full h-full object-cover object-bottom transition-transform duration-1000 select-none"
                  style={{ filter: "drop-shadow(0 -5px 15px rgba(0,0,0,0.05))" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  const serviceLinks = navLinks.find(l => l.label === "Services")?.children || [];

  return (
    <section className="py-32 bg-agri-earth-100 overflow-hidden selection:bg-agri-green-50 selection:text-agri-green-800 content-defer">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-4 text-agri-gold-500 font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-6">
            <div className="w-8 sm:w-12 h-[1px] bg-agri-gold-500" />
            OUR EXPERTISE
            <div className="w-8 sm:w-12 h-[1px] bg-agri-gold-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-agri-earth-900 mb-8 leading-tight">
            Professional Agri <span className="italic text-agri-green-800">Expertise.</span>
          </h2>
          <div className="flex gap-1.5 justify-center">
            <div className="w-10 h-1 bg-agri-green-800" />
            <div className="w-2 h-1 bg-agri-green-800/30" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {serviceLinks.map((s: any, i: number) => {
            const Icon = i === 0 ? Tractor : i === 1 ? Droplets : i === 2 ? Shield : Hammer;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-[2rem] p-8 md:p-10 min-h-[460px] md:min-h-[550px] flex flex-col border border-black/5 hover:border-agri-gold-500/20 transition-all hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden"
              >
                <Link to={s.href} className="absolute inset-0 z-20" />

                {/* Title & Index Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-agri-green-800/5 flex items-center justify-center group-hover:bg-agri-gold-500/10 transition-colors">
                    <Icon className="w-5 h-5 text-agri-green-800 group-hover:text-agri-gold-500 transition-colors" />
                  </div>
                  <div className="text-xl font-bold text-black/20 tracking-widest">0{i + 1}</div>
                </div>

                <div className="relative z-10 flex-1">
                  <h2 className="text-2xl font-black text-agri-gold-500 mb-6 leading-tight group-hover:text-agri-green-800 transition-colors duration-300 min-h-[5rem]">
                    {s.label}
                  </h2>

                  {/* Layer Previews (Sub-categories) */}
                  <div className="space-y-3 mb-8 min-h-[140px]">
                    {s.children?.slice(0, 4).map((child: any) => (
                      <div key={child.label} className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        <div className="w-1 h-1 rounded-full bg-agri-green-800/40" />
                        <span className="text-[12px] font-bold text-black/50 group-hover:text-black/80 transition-colors uppercase tracking-[0.15em] line-clamp-1">
                          {child.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-black/5 flex items-center justify-center text-black/40 group-hover:bg-agri-gold-500 group-hover:text-white transition-all transform group-hover:translate-x-1 shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Overlapping Bottom Image - CLEAR, NO MIST */}
                <div className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none rounded-t-[2rem] overflow-hidden border-t border-black/5 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                  <motion.img
                    src={s.icon && typeof s.icon === 'string' ? s.icon : "/assets/projects/agri_farming.jpg"}
                    alt={s.label}
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 select-none opacity-100"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ProductEcosystem = () => {
  const productLinks = navLinks.find(l => l.label === "Products")?.children || [];

  return (
    <section className="py-40 bg-white overflow-hidden border-t border-black/5 content-defer">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
              <div className="w-12 h-[1px] bg-primary/30" />
              PRODUCT INFRASTRUCTURE
            </div>
            <h2 className="text-4xl md:text-7xl font-serif text-agri-earth-900 leading-[1.05]">
              High-Performance <br /> <span className="italic text-primary">Agri Inputs.</span>
            </h2>
          </div>
          <Link to="/products" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-black">
            Explore All <span className="hidden sm:inline">Products</span>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {productLinks.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden bg-slate-100 border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <Link to={cat.href} className="absolute inset-0 z-20" />
              <img
                src={(cat as any).cardImage || (cat.icon && typeof cat.icon === 'string' ? cat.icon : "/assets/projects/agri_farming.jpg")}
                alt={cat.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 transition-opacity duration-500 opacity-90 group-hover:opacity-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-3 block">Product Sector {i + 1}</span>
                <h3 className="text-3xl font-black text-white mb-6 leading-tight group-hover:translate-x-2 transition-transform duration-500 drop-shadow-lg">{cat.label}</h3>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-agri-gold-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  View Catalog <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <Leaf className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Engineering DNA Section ──────────────────────────────────────────────────
const EngineeringDNA = () => {
  const pillars = [
    { title: "Precision Engineering", icon: PencilRuler, desc: "State-of-the-art structural engineering for polyhouses and smart farms." },
    { title: "Biotech Science", icon: Microscope, desc: "Tissue culture and organic science driven by IGO's Tech Farming Scientists." },
    { title: "Automation & IoT", icon: Binary, desc: "Full-stack smart automation for irrigation, climate, and real-time monitoring." },
    { title: "Energy Synthesis", icon: Zap, desc: "Renewable energy integration minimizing carbon footprint and maximizing ROI." },
  ];

  return (
    <section className="py-32 bg-agri-earth-25 overflow-hidden relative border-t border-black/5">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-agri-green-800/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-agri-gold-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="flex items-center justify-center gap-4 text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
            <div className="w-12 h-px bg-agri-gold-500/30" />
            THE IGO ADVANTAGE
            <div className="w-12 h-px bg-agri-gold-500/30" />
          </div>
          <h2 className="text-5xl md:text-8xl font-serif leading-[1] mb-10 tracking-tight text-agri-earth-900">
            Our <span className="text-agri-green-800 italic">Engineering</span> DNA.
          </h2>
          <p className="text-xl text-black/50 font-light max-w-2xl mx-auto leading-relaxed">
            Beyond farming, we are an engineering powerhouse. Every project is a synthesis of structural integrity, biological precision, and digital intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-agri-gold-500/20 hover:shadow-2xl transition-all group backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-agri-green-800/5 flex items-center justify-center mb-10 group-hover:bg-agri-gold-500/10 transition-colors">
                <p.icon className="w-8 h-8 text-agri-green-800 group-hover:text-agri-gold-500 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-agri-earth-900 group-hover:text-agri-green-800 transition-colors">{p.title}</h3>
              <p className="text-sm text-black/45 leading-relaxed transition-colors group-hover:text-black/60">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Brands Marquee ──────────────────────────────────────────────────────────
const B_CARD = 320;
const B_GAP = 32;
const B_STEP = B_CARD + B_GAP;
const B_HALF = igoBrands.length * B_STEP;
const B_AUTO_SPEED = 1.2;   // px/frame during auto-scroll
const B_LERP_AUTO = 0.07;  // easing for auto-scroll (buttery)
const B_LERP_DRAG = 0.45;  // easing during drag (nearly instant = glued to finger)

const BrandsSection = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pos = useRef(0);   // rendered position
  const target = useRef(0);   // desired position — auto-scroll ALWAYS advances this
  const isDragging = useRef(false);
  const prevDragX = useRef(0);   // last frame's drag X for incremental delta
  const velX = useRef(0);   // px/ms for momentum throw
  const lastMoveX = useRef(0);
  const lastMoveT = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  const displayBrands = [...igoBrands, ...igoBrands];

  // ── RAF loop — auto-scroll NEVER stops; drag adds on top of it ───────────
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const tick = () => {
      // Always advance — no pause, no hover stop, rolls forever
      target.current += B_AUTO_SPEED;

      // Seamless wrap — shift both together to preserve lerp gap
      if (target.current >= B_HALF) { target.current -= B_HALF; pos.current -= B_HALF; }
      if (target.current < 0) { target.current += B_HALF; pos.current += B_HALF; }

      // High lerp while dragging so cards are glued to finger
      const lerp = isDragging.current ? B_LERP_DRAG : B_LERP_AUTO;
      pos.current += (target.current - pos.current) * lerp;
      strip.style.transform = `translateX(${-pos.current}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Button nav — just nudges target; auto-scroll keeps going ─────────────
  const scrollManual = useCallback((dir: 'prev' | 'next') => {
    target.current += dir === 'next' ? B_STEP : -B_STEP;
  }, []);

  // ── Pointer drag — incremental delta added each move event ───────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    prevDragX.current = e.clientX;
    velX.current = 0;
    lastMoveX.current = e.clientX;
    lastMoveT.current = performance.now();
    setGrabbing(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    // incremental: add how far the finger moved since last event
    target.current += prevDragX.current - e.clientX;
    prevDragX.current = e.clientX;
    // track velocity for momentum
    const now = performance.now();
    const dt = now - lastMoveT.current;
    if (dt > 0) velX.current = (lastMoveX.current - e.clientX) / dt;
    lastMoveX.current = e.clientX;
    lastMoveT.current = now;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setGrabbing(false);
    // momentum throw — coasts to stop, auto-scroll keeps going underneath
    target.current += velX.current * 100;
  }, []);

  // ── Touch swipe — same incremental approach ───────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    prevDragX.current = e.touches[0].clientX;
    velX.current = 0;
    lastMoveX.current = e.touches[0].clientX;
    lastMoveT.current = performance.now();
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const x = e.touches[0].clientX;
    target.current += prevDragX.current - x;
    prevDragX.current = x;
    const now = performance.now();
    const dt = now - lastMoveT.current;
    if (dt > 0) velX.current = (lastMoveX.current - x) / dt;
    lastMoveX.current = x;
    lastMoveT.current = now;
  }, []);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    target.current += velX.current * 100;
  }, []);

  return (
    <section className="py-40 bg-slate-100 overflow-hidden border-t border-black/5 content-defer relative">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-agri-gold-500/40" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.4em]">The Sovereign Ecosystem</span>
            <div className="h-px w-12 bg-agri-gold-500/40" />
          </div>
          <h2 className="text-4xl md:text-7xl font-serif text-agri-earth-900 mb-8 leading-[1.1]">
            The <span className="italic text-agri-gold-500">26 Verticals</span> of IGO.
          </h2>
          <p className="text-black/50 text-lg font-light leading-relaxed max-w-xl mx-auto">
            A sovereign agricultural ecosystem covering Engineering, Production, Trade, and Consumer Lifestyle.
          </p>
        </motion.div>

        {/* Nav buttons */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollManual('prev')}
            aria-label="Previous brands"
            className="w-12 h-12 rounded-full border border-black/10 bg-white hover:bg-agri-gold-500 hover:border-agri-gold-500 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <ChevronLeft className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">Explore all 26 verticals</span>
          <button
            onClick={() => scrollManual('next')}
            aria-label="Next brands"
            className="w-12 h-12 rounded-full border border-black/10 bg-white hover:bg-agri-gold-500 hover:border-agri-gold-500 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <ChevronRight className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
          </button>
        </div>
      </div>

      {/* Track — overflow:hidden so nothing is scrollable; transform moves the strip */}
      <div className="relative py-10 overflow-hidden">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

        {/* Strip */}
        <div
          ref={stripRef}
          className="flex gap-8 pl-8 will-change-transform select-none"
          style={{ cursor: grabbing ? "grabbing" : "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {displayBrands.map((b, i) => (
            <div
              key={`${b.id}-${i}`}
              className="shrink-0 w-80 group bg-white border border-black/8 hover:border-agri-gold-500/40 rounded-[2.5rem] p-8 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-black/10 flex flex-col"
            >
              <div className="w-full h-40 rounded-3xl bg-slate-50 border border-black/5 flex items-center justify-center mb-8 p-6 transition-all duration-500 group-hover:bg-white group-hover:border-black/10 overflow-hidden relative">
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-slate-100">
                      <Box className="w-6 h-6 text-black/20" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 text-center">Development <br /> In Progress</span>
                  </div>
                )}
                {!b.logo && (
                  <div className="absolute inset-0 bg-agri-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-agri-gold-500 text-black text-[9px] font-bold uppercase tracking-widest rounded-full">Coming Soon</span>
                  </div>
                )}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-agri-gold-500 mb-3">{b.tag}</div>
              <h3 className="text-lg font-bold text-agri-earth-900 mb-4 group-hover:text-agri-gold-500 transition-colors uppercase tracking-tight">{b.name}</h3>
              <p className="text-[12px] text-black/40 group-hover:text-black/60 leading-relaxed mb-6 flex-1 line-clamp-3 font-light">{b.desc}</p>
              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <span className={`text-[9px] font-bold uppercase tracking-widest ${b.logo ? 'text-agri-gold-500' : 'text-black/20'}`}>
                  {b.logo ? 'Active Division' : 'Strategic Tier'}
                </span>
                <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-agri-gold-500 transition-all group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const BarleyBannerSection = () => (
  <section className="overflow-hidden bg-white pb-0">
    {/* Full-width barley image */}
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden"
    >
      <img
        src="/assets/barley_hero_clean.png"
        alt="IGO Agritech Farms — Innovating the Future of Farming"
        loading="lazy"
        decoding="async"
        className="w-full object-cover object-center"
        style={{ width: "100%" }}
      />
    </motion.div>
  </section>
);

const Index = () => {
  // Show offer posters as the full-screen hero when active posters exist,
  // otherwise fall back to the original HeroSection.
  const hasOffers = React.useMemo(() => {
    try {
      initDefaultOffers();
      return getActiveOffers().length > 0;
    } catch {
      return false;
    }
  }, []);

  return (
    <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800 overflow-x-hidden">
      <SEO
        title="IGO Agritech Farms | India's Leading Agri Engineering & Consulting"
        description="IGO Agritech Farms — India's leading Agri Engineering & Agri Consulting brand. 10+ years, 1000+ projects in precision farming, polyhouse, hydroponics, vertical farming & agri infrastructure across India."
        keywords="agri engineering, agri consulting, precision farming, polyhouse farming, hydroponics, vertical farming, mushroom farming, biofloc, agri startup India, IGO Agritech, farm infrastructure Chennai"
        url="/"
      />
      {hasOffers ? <OffersBanner heroMode /> : <HeroSection />}
      <WhyChooseSection />
      <VisionSection />
      <ProjectGallerySection />
      <BarleyBannerSection />
      <FeatureSection />
      <ProductEcosystem />
      <EngineeringDNA />

      <BrandsSection />
    </div>
  );
};

export default Index;
