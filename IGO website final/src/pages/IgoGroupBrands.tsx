import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import SEO from "@/components/SEO";

// ─── Brand Data ───────────────────────────────────────────────────────────────

interface Brand {
  name: string;
  category: string;
  desc: string;
  logo?: string;          // path under /assets/brands/
  upcoming?: boolean;
  catColor: string;
  cardBg: string;
}

const BRANDS: Brand[] = [
  // ── Active brands (logos available) ──────────────────────────────────────
  {
    name: "IGO Agritech Farms",
    category: "Core Business",
    desc: "India's leading Agri Engineering & Consulting brand. Polyhouse, hydroponics, vertical farming, precision farming, goat farming, mushroom farming. Pan-India. MSME Award 2024.",
    logo: "/assets/brands/brand-1.jpg.jpeg",
    catColor: "#2E7D32",
    cardBg: "#F4FAF4",
  },
  {
    name: "IGO Agri Mart",
    category: "Distribution",
    desc: "Farm inputs and distribution network. Connecting quality agricultural inputs directly to farmers across India.",
    logo: "/assets/brands/brand-5.jpg.jpeg",
    catColor: "#1565C0",
    cardBg: "#F0F6FF",
  },
  {
    name: "Farmers Factory",
    category: "Distribution",
    desc: "Farm to shop distribution brand. Bringing fresh farm produce directly to retail stores and consumers across India.",
    logo: "/assets/brands/brand-2.jpg.jpeg",
    catColor: "#1565C0",
    cardBg: "#F0F6FF",
  },
  {
    name: "Valluvam",
    category: "Retail",
    desc: "Branded grocery staples brand. Quality everyday essentials — As Pure As Nature — under the trusted IGO Group umbrella.",
    logo: "/assets/brands/brand-3.jpg.jpeg",
    catColor: "#AD1457",
    cardBg: "#FFF5F8",
  },
  {
    name: "Protein Cuts",
    category: "Retail",
    desc: "Premium meat, fish, and eggs retail brand. Fresh Eggs, Fish, Meat from Farms — Unit of IGO Group.",
    logo: "/assets/brands/brand-4.jpg.jpeg",
    catColor: "#AD1457",
    cardBg: "#FFF5F8",
  },
  {
    name: "Palm Cafe",
    category: "F&B",
    desc: "Farm to place F&B brand. The Healthy Food Joint — creating 5,000 jobs for non-graduate youth using IGO's own farm produce.",
    logo: "/assets/brands/palm-cafe.jpeg",
    catColor: "#E65100",
    cardBg: "#FFF8F0",
  },
  {
    name: "IGO Nursery",
    category: "Agri",
    desc: "Premium nursery and landscaping solutions. Supplying quality plants, seeds, and horticultural products.",
    logo: "/assets/brands/brand-6.jpg.jpeg",
    catColor: "#1B5E20",
    cardBg: "#F3FBF0",
  },
  {
    name: "IGO Exports & Imports",
    category: "Trade",
    desc: "International trade division connecting Indian agricultural products to global markets and bringing world-class inputs to India.",
    logo: "/assets/brands/igo-exports.jpeg",
    catColor: "#00695C",
    cardBg: "#F0FAF8",
  },
  {
    name: "IGO Tech Farming Scientist Foundation",
    category: "Foundation",
    desc: "Research and education foundation advancing agri-science and technology for the next generation of tech farming scientists.",
    logo: "/assets/brands/igo-foundation.jpeg",
    catColor: "#37474F",
    cardBg: "#F5F7F8",
  },

  // ── Upcoming brands (no logo yet) ────────────────────────────────────────
  {
    name: "IGO Mart",
    category: "Retail",
    desc: "Supermarket chain offering quality products at accessible prices. Part of IGO Group's consumer retail vision.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Fintech",
    category: "Fintech",
    desc: "Micro finance unit providing financial access and support to farmers and agricultural entrepreneurs across India.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Farmlands Estates",
    category: "Real Estate",
    desc: "Agricultural land and property development. Creating investment opportunities in farmland across India.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Wealth Management",
    category: "Investment",
    desc: "JV investment project providing wealth management and financial planning services to IGO Group stakeholders.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Group Franchise FICO",
    category: "Franchise",
    desc: "Franchise operations division. Expanding IGO Group brands across India through a structured franchise model.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Farm Gate Buy-Back",
    category: "Programme",
    desc: "Guaranteed buy-back programme for farmers. Empowering agricultural entrepreneurs with assured market access.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Crop Care",
    category: "Agri Input",
    desc: "Agricultural input products division. Quality crop care solutions for optimum yield and sustainable farming practices.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Organic Pharma",
    category: "Upcoming",
    desc: "Future division developing organic pharmaceutical products from IGO's farm network. Bridging agriculture and health.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
  {
    name: "IGO Cosmetics",
    category: "Upcoming",
    desc: "Future personal care brand using natural farm-sourced ingredients. Farm to skin — the next frontier for IGO Group.",
    catColor: "#9E9E9E",
    cardBg: "#F7F7F7",
    upcoming: true,
  },
];

const ACTIVE_BRANDS  = BRANDS.filter(b => !b.upcoming);
const UPCOMING_BRANDS = BRANDS.filter(b => b.upcoming);

// ─── Component ────────────────────────────────────────────────────────────────

const IgoGroupBrands = () => (
  <div className="bg-white min-h-screen">
    <SEO
      title="IGO Group Brands"
      description="Explore the IGO Group — a family of brands spanning agri engineering, agri consulting, agri retail, and agri education. India's most comprehensive agricultural business group."
      keywords="IGO Group, IGO Agritech Farms brands, agricultural business India, agri group companies"
      url="/igo-groups"
    />

    {/* ── HERO ── */}
    <section className="relative pt-36 pb-24 overflow-hidden bg-[#0C1A14]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(197,160,63,0.10),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(26,66,49,0.6),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/agri-startup-platform"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Platform
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl flex-1"
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-8 bg-[#C5A03F]/60" />
              <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em]">IGO Group — India Green Organics</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[0.95] tracking-tight mb-6">
              Our Brands
            </h1>
            <p className="text-white/55 text-xl font-light leading-relaxed max-w-xl">
              {ACTIVE_BRANDS.length} active brands. One vision — building India's most trusted agri-business ecosystem from farm to consumer.
            </p>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-12 grid grid-cols-3 max-w-xl divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden"
            >
              {[
                { value: `${ACTIVE_BRANDS.length}`,  label: "Active Brands" },
                { value: `${BRANDS.length}`,          label: "Total Portfolio" },
                { value: "Pan-India",                 label: "Reach" },
              ].map(s => (
                <div key={s.label} className="px-6 py-5 text-center">
                  <p className="text-2xl font-serif text-[#C5A03F] mb-0.5">{s.value}</p>
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* IGO Group Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-72 xl:w-80 shrink-0"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <img
                src="/assets/brands/igo-group.jpeg"
                alt="IGO Group — India Green Organics"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── ACTIVE BRANDS GRID ── */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-3">Our Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">Active Brands</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVE_BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
              className="group rounded-2xl border border-black/[0.07] overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
            >
              {/* Logo area */}
              <div
                className="flex items-center justify-center p-8 border-b border-black/[0.06]"
                style={{ backgroundColor: brand.cardBg }}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-32 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>

              {/* Info area */}
              <div className="p-6">
                <span
                  className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 block"
                  style={{ color: brand.catColor }}
                >
                  {brand.category}
                </span>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-2 leading-snug group-hover:text-[#1A4231] transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-black/50 leading-relaxed">
                  {brand.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── UPCOMING BRANDS ── */}
    <section className="py-20 bg-[#FAFAFA] border-t border-black/5">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-4 h-4 text-black/30" />
            <p className="text-black/30 font-bold text-[10px] uppercase tracking-[0.35em]">In Development</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">Upcoming Brands</h2>
          <p className="text-black/40 mt-2 text-sm max-w-xl">
            {UPCOMING_BRANDS.length} brands currently in development. The IGO Group ecosystem keeps expanding.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {UPCOMING_BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
              className="rounded-xl border border-black/[0.07] bg-white p-5 hover:shadow-md transition-all duration-300"
            >
              {/* Placeholder logo area */}
              <div className="h-16 flex items-center justify-center bg-black/[0.03] rounded-lg mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-black/20">Logo Coming</span>
              </div>

              <span
                className="text-[9px] font-black uppercase tracking-[0.25em] mb-2 block text-black/30"
              >
                {brand.category}
              </span>
              <h3 className="text-sm font-bold text-black/40 mb-2 leading-snug">{brand.name}</h3>
              <p className="text-xs text-black/30 leading-relaxed line-clamp-2">{brand.desc}</p>

              <div className="mt-4 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A03F]/60 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/25">Coming Soon</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── BOTTOM CTA ── */}
    <section className="py-24 bg-[#0D1F15] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1A4231]/70 blur-[130px] rounded-full" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-10 bg-[#C5A03F]/50" />
            <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">Join the Group</span>
            <div className="h-px w-10 bg-[#C5A03F]/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-5 leading-tight">
            Grow with the<br />
            <span className="italic text-[#C5A03F]">IGO Ecosystem.</span>
          </h2>
          <p className="text-white/50 text-lg font-light max-w-lg mx-auto mb-10">
            Whether you're an entrepreneur, investor, or farmer — there's a place for you within the IGO Group.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/startup-enquiry"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white hover:text-[#1A4231] transition-all shadow-2xl shadow-[#C5A03F]/25 group"
            >
              Partner With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/agri-startup-platform"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              ← Back to Platform
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default IgoGroupBrands;
