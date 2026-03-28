import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  ArrowRight, Lightbulb, Users, Handshake, Leaf, TrendingUp,
  CheckCircle, Star, Globe, BarChart3, Briefcase, Rocket,
  Phone, ChevronRight, MapPin, Award,
} from "lucide-react";

const fader: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const OFFERS = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Startup Incubation",
    tagline: "Turn your agri idea into a real business.",
    desc: "We provide hands-on mentorship, infrastructure access, and technical guidance to help early-stage agri startups move from idea to execution — fast.",
    value: "Get your farm up and running without wasting years figuring it out alone.",
    points: ["Prototype & pilot support", "Agronomy & tech mentoring", "Market entry strategy"],
    color: "#1A4231",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Business Planning & Strategy",
    tagline: "Build a plan that actually works.",
    desc: "Our experts help you create detailed business plans, financial models, and ROI projections — all backed by real data from live IGO farms across India.",
    value: "Present investor-ready plans and make confident decisions from day one.",
    points: ["Financial modelling & ROI", "Market research & positioning", "Pitch deck preparation"],
    color: "#C5A03F",
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Partnership & Collaboration",
    tagline: "Grow faster together.",
    desc: "Partner with IGO through joint ventures, co-farming models, or strategic alliances. Bring your land, capital, or local network — we bring the technology and expertise.",
    value: "Shared risk, shared growth — a formal partnership with a trusted brand behind you.",
    points: ["Joint venture agreements", "Profit-sharing models", "End-to-end farm management"],
    color: "#3B82F6",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Farm & Technology Support",
    tagline: "Modern technology for your farm.",
    desc: "Access IGO's full technical stack — polyhouses, hydroponics, IoT irrigation, solar systems, and precision agriculture tools — all set up and maintained by our experts.",
    value: "No need to figure out the technology. We build it, train you, and keep it running.",
    points: ["Turnkey farm setup", "Staff training & handover", "Ongoing AMC & support"],
    color: "#8B5CF6",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Market Access & Scaling",
    tagline: "Find buyers. Scale revenue.",
    desc: "Tap into IGO's established buyer network — retail chains, exporters, FPOs, and restaurants across India. We help you sell your produce at the best prices.",
    value: "Stop worrying about where to sell. Focus on growing; we handle the market.",
    points: ["Direct buyer connections", "Export & retail linkages", "Buyback programme access"],
    color: "#EF4444",
  },
];

const STEPS = [
  { num: "01", title: "Apply",        desc: "Submit a short online form about your agri startup idea — takes less than 10 minutes." },
  { num: "02", title: "Evaluation",  desc: "Our team reviews your application and schedules a free 30-min discovery call within 48 hours." },
  { num: "03", title: "Onboarding",  desc: "We propose the right partnership model with clear terms. Once agreed, onboarding begins." },
  { num: "04", title: "Development", desc: "IGO builds your farm infrastructure, trains your team, and launches operations alongside you." },
  { num: "05", title: "Scaling",     desc: "With a live farm running, we help you expand — more units, more produce, more revenue." },
];

const WHY = [
  { icon: <Star className="w-5 h-5" />,       title: "10+ Years of Real Experience",      desc: "Not just consultants — we have built and run 1,000+ profitable agri projects across India." },
  { icon: <Globe className="w-5 h-5" />,       title: "Pan-India Network",                 desc: "Active presence in 28 states with an established supply chain, buyer network and logistics." },
  { icon: <Award className="w-5 h-5" />,       title: "75+ Industry Awards",               desc: "MSME, National Excellence, and State-level awards that validate our quality and trust." },
  { icon: <BarChart3 className="w-5 h-5" />,   title: "Real ROI — Not Projections",        desc: "Every financial model is backed by live farm data — transparent, audited, and achievable." },
  { icon: <Briefcase className="w-5 h-5" />,   title: "Subsidy & Funding Navigation",      desc: "We manage NABARD, NHM, PMMSY, PM-KUSUM applications end-to-end on your behalf." },
  { icon: <Users className="w-5 h-5" />,       title: "Dedicated Partnership Manager",     desc: "One point of contact from your first call through to farm launch and beyond." },
];

const IMPACT = [
  { value: "1,000+", label: "Projects Delivered",  sub: "Across all agriculture disciplines" },
  { value: "28",     label: "States Covered",       sub: "True pan-India operational reach" },
  { value: "₹100Cr+",label: "Projects Funded",      sub: "Value of partnerships executed" },
  { value: "10+",    label: "Years of Excellence",  sub: "Since 2013, trusted by thousands" },
];

const STORIES = [
  { icon: <MapPin className="w-4 h-4" />,   title: "Helping Startups Grow Across India",       desc: "From Tamil Nadu to Punjab — IGO startup partners are running profitable farms in 28 states, thanks to our end-to-end setup and market support." },
  { icon: <Leaf className="w-4 h-4" />,     title: "Building Sustainable Agri Businesses",     desc: "Every startup we support is built on sustainable practices — eco-friendly technology, water-efficient systems, and crops that generate consistent long-term income." },
  { icon: <Lightbulb className="w-4 h-4" />, title: "Empowering Rural Innovation",              desc: "Young entrepreneurs from rural India are launching high-tech farms with IGO's support — creating local employment and bringing modern agriculture to every corner of the country." },
];

// ─── Component ────────────────────────────────────────────────────────────────

const AgriStartupPlatform = () => (
  <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
    <SEO
      title="Agri Startup Platform"
      description="Launch your agri-business with IGO Agritech Farms. Startup incubation, funding support, market access, and end-to-end mentorship for agriculture entrepreneurs across India."
      keywords="agri startup platform, agriculture startup India, agri incubation, IGO Agritech Farms, farming business"
      url="/agri-startup-platform"
    />

    {/* ── 1. HERO ── */}
    <section className="relative pt-36 pb-0 overflow-hidden bg-[#0C1A14]">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img src="/assets/background page for agri starup and about .png" alt="" loading="lazy" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C1A14]/60 via-[#0C1A14]/50 to-[#0C1A14]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.16 } } }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fader} className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#C5A03F]/60" />
            <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em]">IGO Agri Startup Platform</span>
            <div className="h-px w-10 bg-[#C5A03F]/60" />
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fader} className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.95] tracking-tight mb-7">
            Grow Your Agri Startup<br />
            <span className="italic text-[#C5A03F]">with India's Best.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={fader} className="text-white/65 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            IGO Agritech Farms is your growth partner — from your first farm idea to a profitable, pan-India agri business. We provide the technology, expertise, and market access you need to succeed.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fader} className="flex flex-wrap justify-center gap-4 mb-20">
            <Link
              to="/startup-enquiry"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white hover:text-[#1A4231] transition-all shadow-2xl shadow-[#C5A03F]/30 group"
            >
              Start Your Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#what-we-offer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              Explore the Platform
            </a>
          </motion.div>
        </motion.div>

        {/* Stats strip inside hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-t border-white/10 pb-0"
        >
          {IMPACT.map((s) => (
            <div key={s.label} className="px-8 py-10 text-center">
              <p className="text-4xl font-serif text-[#C5A03F] mb-1">{s.value}</p>
              <p className="text-white font-bold text-xs mb-0.5">{s.label}</p>
              <p className="text-white/30 text-[10px] font-medium">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── 2. ABOUT THE PLATFORM ── */}
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-5">About the Platform</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight mb-7">
              Your Growth Partner,<br />
              <span className="italic text-[#1A4231]">Not Just a Consultant.</span>
            </h2>
            <p className="text-black/60 text-lg leading-relaxed mb-5 font-light">
              The IGO Agri Startup Platform exists for one reason — to help agri entrepreneurs, young farmers, and agri-tech innovators build real, profitable businesses without having to figure it all out alone.
            </p>
            <p className="text-black/60 text-base leading-relaxed font-light mb-8">
              We don't just give advice and walk away. We roll up our sleeves, build alongside you, connect you with the right buyers and investors, and stay with you long after your farm is up and running.
            </p>

            <div className="space-y-3">
              {[
                "Open to agri founders, farmers & young entrepreneurs",
                "End-to-end support — from idea to scale",
                "Backed by 10+ years of real farming experience",
                "No complex jargon — just clear, honest guidance",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#1A4231] shrink-0 mt-0.5" />
                  <span className="text-sm text-black/70 font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — 3 feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {[
              { icon: <Lightbulb className="w-5 h-5" />, title: "What Is It?", desc: "A structured platform where agri startups get business support, technical guidance, infrastructure setup, market access, and long-term partnership with IGO Agritech Farms." },
              { icon: <Rocket className="w-5 h-5" />,    title: "Why It Exists?", desc: "Most agri startups fail not because of bad ideas — but because of lack of execution support, market access, and the right technology partners. We solve exactly that." },
              { icon: <TrendingUp className="w-5 h-5" />, title: "How It Helps You?", desc: "We compress years of trial-and-error into months. You get our team's decade of expertise, our buyer network, and our technical infrastructure — from day one." },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-[#F4F8F4] border border-[#1A4231]/8 hover:border-[#1A4231]/25 hover:bg-[#EDF5EE] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1A4231] text-white flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-sm mb-1.5">{c.title}</h4>
                  <p className="text-black/55 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 3. WHAT WE OFFER ── */}
    <section id="what-we-offer" className="py-28 bg-[#F4F8F4] border-y border-[#1A4231]/8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Core Services</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">What We Offer</h2>
          <p className="text-black/45 text-lg font-light max-w-xl mx-auto">
            Five ways IGO Agritech actively supports your startup's growth — from idea to income.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFERS.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.09 }}
              className={`group bg-white rounded-[1.75rem] border border-black/8 p-8 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: o.color }}
              >
                {o.icon}
              </div>

              {/* Tagline */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 mb-1.5">{o.tagline}</p>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 leading-snug">{o.title}</h3>
                <p className="text-black/55 text-sm leading-relaxed">{o.desc}</p>
              </div>

              {/* Value */}
              <div className="bg-[#F4F8F4] rounded-xl px-4 py-3 border-l-2" style={{ borderColor: o.color }}>
                <p className="text-xs text-black/60 leading-relaxed font-medium">{o.value}</p>
              </div>

              {/* Points */}
              <div className="space-y-2">
                {o.points.map((pt) => (
                  <div key={pt} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: o.color }} />
                    <span className="text-xs text-black/60 font-medium">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Link */}
              <Link
                to="/startup-enquiry"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mt-auto transition-all group-hover:gap-3"
                style={{ color: o.color }}
              >
                Enquire Now <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 4. HOW IT WORKS ── */}
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">How It Works</h2>
          <p className="text-black/45 text-lg font-light max-w-lg mx-auto">
            A simple, clear 5-step journey — from your first enquiry to a fully running agri business.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#1A4231]/20 via-[#C5A03F]/40 to-[#1A4231]/20 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-5"
              >
                {/* Circle */}
                <div className="w-20 h-20 rounded-full bg-[#1A4231] border-4 border-white shadow-lg shadow-[#1A4231]/20 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[#C5A03F] font-bold text-[9px] uppercase tracking-widest leading-none">{s.num}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-base mb-2">{s.title}</h4>
                  <p className="text-black/50 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA under steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            to="/startup-enquiry"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#1A4231] text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#1A4231]/20"
          >
            Apply Now — Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-black/30 text-xs mt-3 font-medium">No commitment · Response within 48 hours</p>
        </motion.div>
      </div>
    </section>

    {/* ── 5. WHY CHOOSE IGO ── */}
    <section className="py-28 bg-[#0D1F15] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,63,0.08),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Why Partner With Us</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Why Startups Choose <span className="italic text-[#C5A03F]">IGO</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
            We're not consultants who advise and leave. We're co-builders with real skin in the game.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#C5A03F]/30 rounded-2xl p-6 flex gap-4 transition-all duration-400"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C5A03F]/15 text-[#C5A03F] flex items-center justify-center shrink-0 mt-0.5">
                {w.icon}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-2 leading-snug">{w.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 6. IMPACT / SUCCESS ── */}
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Our Impact</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Real Startups. Real Growth.</h2>
          <p className="text-black/45 text-lg font-light max-w-xl mx-auto">
            IGO's startup partners are building profitable, sustainable agri businesses across India.
          </p>
        </motion.div>

        {/* 3 story cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {STORIES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative rounded-[1.75rem] overflow-hidden"
            >
              {/* Coloured top bar */}
              <div className="h-1.5 w-full" style={{ background: i === 0 ? "#1A4231" : i === 1 ? "#C5A03F" : "#3B82F6" }} />
              <div className="bg-[#F4F8F4] border border-[#1A4231]/8 border-t-0 rounded-b-[1.75rem] p-7">
                <div className="w-10 h-10 rounded-xl bg-[#1A4231] text-white flex items-center justify-center mb-5">
                  {s.icon}
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-3 leading-snug">{s.title}</h3>
                <p className="text-black/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big impact numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-black/8 bg-[#F4F8F4] rounded-[1.75rem] border border-[#1A4231]/8 overflow-hidden"
        >
          {IMPACT.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center">
              <p className="text-3xl md:text-4xl font-serif text-[#1A4231] mb-1">{s.value}</p>
              <p className="text-black/55 text-xs font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── 7. STRONG CTA ── */}
    <section className="py-32 bg-[#0D1F15] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1A4231]/60 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C5A03F]/6 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#C5A03F]/50" />
            <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">Ready to Begin?</span>
            <div className="h-px w-12 bg-[#C5A03F]/50" />
          </div>

          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[1.05] tracking-tight">
            Join the Agri<br />
            <span className="italic text-[#C5A03F]">Startup Platform.</span>
          </h2>

          <p className="text-white/60 text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Partner with IGO Agritech Farms. Get the mentorship, technology, market access, and long-term support you need to build a profitable agri business — starting today.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mb-14">
            <Link
              to="/startup-enquiry"
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-[#1A4231] transition-all uppercase tracking-widest shadow-2xl shadow-[#C5A03F]/25 group"
            >
              Start Your Journey Today <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-12 py-5 bg-white/10 border border-white/20 text-white text-[10px] font-bold rounded-full hover:bg-white/20 transition-all uppercase tracking-widest"
            >
              <Phone className="w-4 h-4" /> Talk to Our Team
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-8 pt-10 border-t border-white/10">
            {[
              "Free initial consultation",
              "48-hour response guarantee",
              "No hidden charges",
              "Dedicated partnership manager",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-white/40 text-[11px] font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-[#C5A03F] shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default AgriStartupPlatform;
