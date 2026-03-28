import { stats, companyInfo } from "@/data/siteData";
import SEO from "@/components/SEO";
import { motion, Variants } from "framer-motion";
import { Award, Leaf, Lightbulb, Handshake, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const fader: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const AWARDS = [
  { year: 2026, name: "Most Trusted Agri Brand",        sub: "In India",                           img: "/assets/ceo awrds  image/most trustwd agri brand in india -2026.JPG" },
  { year: 2025, name: "Best Farm Engineering Company",  sub: "In India",                           img: "/assets/ceo awrds  image/best farm engineering company i india -2025.jpeg" },
  { year: 2024, name: "MSME Awards 2024",               sub: "Best Agri-Consulting Brand",         img: "/assets/ceo awrds  image/award1.jpg.jpeg" },
  { year: 2022, name: "Best Innovative Start-up",       sub: "Agri Tech Brand",                    img: "/assets/ceo awrds  image/award.jpg.jpeg" },
  { year: null, name: "SISI Award",                     sub: "Industrial Development",              img: "/assets/ceo awrds  image/award2.jpg.jpeg" },
  { year: null, name: "Trade Award",                    sub: "Export Excellence",                   img: "/assets/ceo awrds  image/award3.jpg.jpeg" },
  { year: null, name: "Valluvam Award",                 sub: "Agricultural Excellence",             img: "/assets/ceo awrds  image/award4.jpg.jpeg" },
  { year: null, name: "National Excellence Award",      sub: "National Recognition",               img: "/assets/ceo awrds  image/about - Copy.jpeg" },
];

const AWARD_BANNER = [
  "/assets/ceo awrds  image/award1.jpg.jpeg",
  "/assets/ceo awrds  image/about - Copy.jpeg",
  "/assets/ceo awrds  image/award2.jpg.jpeg",
];

const VALUES = [
  { icon: <Leaf className="w-5 h-5" />,       title: "Sustainability",  desc: "Environmentally sustainable, socially responsible, and economically viable farming for the long term." },
  { icon: <Lightbulb className="w-5 h-5" />,  title: "Innovation",      desc: "Leveraging cutting-edge tools, technology, and continuous R&D investment across all disciplines." },
  { icon: <Handshake className="w-5 h-5" />,  title: "Collaboration",   desc: "Working cooperatively with clients, partners, and stakeholders through full transparency." },
  { icon: <Star className="w-5 h-5" />,       title: "Excellence",      desc: "Providing exceptional service and uncompromising quality across all operations and projects." },
];

const About = () => (
  <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
    <SEO
      title="About Us | IGO Agritech Farms"
      description="Learn about IGO Agritech Farms — 10+ years of excellence in agri engineering & consulting, 75+ awards, 2000+ team members, and a mission to transform Indian agriculture with precision farming."
      keywords="about IGO Agritech, agri consulting company India, agri engineering Chennai, MSME award agri, precision farming company"
      url="/about"
    />

    {/* ── Cinematic Hero ── */}
    <section className="relative pt-40 pb-44 overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="/assets/background page for agri starup and about .png"
          alt="IGO Agritech Farms"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.18 } } }}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fader} className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#C5A03F]/70" />
            <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em]">Established 2014 · Pan-India</span>
            <div className="h-px w-12 bg-[#C5A03F]/70" />
          </motion.div>

          <motion.h1 variants={fader} className="text-6xl md:text-9xl font-serif text-white mb-8 tracking-tight leading-[0.9]">
            Built on Land.<br />
            <span className="italic text-[#C5A03F]">Driven by Purpose.</span>
          </motion.h1>

          <motion.p variants={fader} className="text-white/60 text-xl md:text-2xl font-light leading-relaxed mb-14 max-w-3xl mx-auto">
            India's leading agri engineering and consulting brand — 1,000+ projects, 28 states, 10+ years of transforming the way India farms.
          </motion.p>

          <motion.div variants={fader} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white hover:text-[#1A4231] transition-all shadow-2xl shadow-[#C5A03F]/30"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>

    {/* ── Stats Strip ── */}
    <section className="bg-[#0D1F15]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="px-8 py-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="text-5xl md:text-6xl font-serif text-[#C5A03F] mb-2">{s.value}</p>
              <p className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Our Story ── */}
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-3">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
              A Decade of Turning Fields into{" "}
              <span className="italic text-[#1A4231]">Futures.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black/50 text-base font-light leading-relaxed max-w-sm md:text-right"
          >
            India's most trusted name in agricultural engineering — 1,000+ projects across 28 states.
          </motion.p>
        </div>

        {/* Full-width landscape image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl mb-14"
        >
          <img
            src="/assets/about page image .png"
            alt="Dr. John Yesudhas — IGO Agritech Farms"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Floating badge — bottom left */}
          <div className="absolute bottom-6 left-6 bg-[#1A4231]/90 backdrop-blur-sm text-white rounded-2xl px-6 py-4 shadow-2xl border border-white/10">
            <p className="text-2xl font-serif text-[#C5A03F] font-bold leading-none">75+</p>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider mt-1">Awards Won</p>
          </div>

          {/* Caption — bottom right */}
          <div className="absolute bottom-6 right-6 text-right">
            <p className="text-white font-bold text-sm">Dr. John Yesudhas</p>
            <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Founder & CEO, IGO Agritech Farms</p>
          </div>
        </motion.div>

        {/* Text + Trust points in 2 columns */}
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-black/60 text-lg leading-relaxed mb-5 font-light">
              {companyInfo.description}
            </p>
            <p className="text-black/60 text-base leading-relaxed font-light">
              From a single polyhouse installation in Tamil Nadu to 1,000+ projects spanning 28 states — IGO Agritech Farms has grown into India's most trusted name in agricultural engineering and consulting. Every project we deliver carries the promise of precision, sustainability, and lasting impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              "Turnkey delivery — design, install, train, maintain",
              "Pan-India logistics & partner network",
              "Government subsidy guidance (NHM, PMMSY, PM-KUSUM)",
              "75+ awards & industry recognitions",
            ].map((pt) => (
              <div key={pt} className="flex items-start gap-3 p-4 rounded-2xl bg-[#F4F8F4] border border-[#1A4231]/8">
                <CheckCircle className="w-4 h-4 text-[#1A4231] shrink-0 mt-0.5" />
                <span className="text-sm text-black/70 font-medium leading-relaxed">{pt}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>

    {/* ── Mission & Vision ── */}
    <section className="py-28 bg-[#F4F8F4] border-y border-[#1A4231]/8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Our Direction</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A]">What Drives Us</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#0D1F15] rounded-[2rem] p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A03F]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1A4231] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#C5A03F]/20 border border-[#C5A03F]/30 flex items-center justify-center">
                  <span className="text-[#C5A03F] text-[10px] font-black">M</span>
                </div>
                <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.3em]">Mission</span>
              </div>
              <h3 className="text-2xl font-serif text-white mb-5 leading-snug">Our Mission</h3>
              <p className="text-white/60 text-base leading-relaxed font-light">{companyInfo.mission}</p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative bg-white rounded-[2rem] p-10 border border-[#1A4231]/10 overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1A4231]/3 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#1A4231]/10 border border-[#1A4231]/20 flex items-center justify-center">
                  <span className="text-[#1A4231] text-[10px] font-black">V</span>
                </div>
                <span className="text-[#1A4231] font-bold text-[10px] uppercase tracking-[0.3em]">Vision</span>
              </div>
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-5 leading-snug">Our Vision</h3>
              <p className="text-black/55 text-base leading-relaxed font-light">{companyInfo.vision}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Founder Section ── */}
    <section className="py-32 bg-[#0C1A14] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-50">
        <img src="/assets/background page for agri starup and about .png" alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1A14] via-[#0C1A14]/95 to-[#0C1A14]/80" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-10">Founder's Voice</p>

            {/* Large quote mark */}
            <div className="text-[#C5A03F]/20 font-serif text-[10rem] leading-none select-none mb-[-3rem]">"</div>

            <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed text-white/90 mb-10 relative z-10">
              We are not just cultivating land — we are building lasting legacies for every farmer and family we serve.
            </blockquote>

            <div className="w-16 h-px bg-[#C5A03F]/40 mx-auto mb-8" />

            <div className="flex flex-col items-center gap-1">
              <p className="text-white font-bold text-lg">Dr. John Yesudhas</p>
              <p className="text-white/40 text-sm font-medium uppercase tracking-wider">Founder & CEO — IGO Agritech Farms</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Icon of India", "Tech Farming Expert", "MSME Award 2024"].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-full bg-[#C5A03F]/15 border border-[#C5A03F]/25 text-[#C5A03F] text-[9px] font-bold uppercase tracking-widest">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Core Values ── */}
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Core Principles</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A]">The IGO Standard</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative bg-[#F7FAF7] rounded-[1.75rem] p-7 border border-[#1A4231]/8 hover:bg-[#1A4231] hover:border-[#1A4231] transition-all duration-500 cursor-default overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A03F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#C5A03F]/10 transition-colors pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#1A4231]/10 group-hover:bg-[#C5A03F]/20 text-[#1A4231] group-hover:text-[#C5A03F] flex items-center justify-center mb-5 transition-all duration-500">
                  {v.icon}
                </div>
                <h4 className="text-lg font-bold text-[#1A1A1A] group-hover:text-white mb-3 transition-colors duration-500">{v.title}</h4>
                <p className="text-sm text-black/50 group-hover:text-white/65 leading-relaxed transition-colors duration-500">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Awards & Recognition ── */}
    <section className="py-28 bg-[#0C1A14] overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Recognition</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white">Awards & Honours</h2>
          <p className="text-white/40 text-lg font-light mt-4 max-w-xl mx-auto">
            75+ national and industry awards affirm our commitment to excellence in agri-engineering.
          </p>
        </motion.div>

        {/* Banner strip — 3 ceremony photos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <div className="grid grid-cols-3 gap-3 rounded-[2rem] overflow-hidden">
            {AWARD_BANNER.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt="IGO Award Ceremony"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[1.2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </div>
          {/* Gold label — centred below photos */}
          <div className="flex justify-center mt-5">
            <span className="px-6 py-2 bg-[#C5A03F] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-2xl shadow-[#C5A03F]/40">
              Dr. John Yesudhas — Award Ceremonies
            </span>
          </div>
        </motion.div>

        {/* Award photo cards grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative rounded-[1.75rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#C5A03F]/20 transition-all duration-700"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={award.img}
                  alt={award.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1.2s]"
                />
                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/75 transition-all duration-700" />

                {/* Top row — award icon left, year right */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-[#C5A03F] px-3 py-1 rounded-full shadow-lg">
                    <Award className="w-3 h-3 text-white" />
                    <span className="text-white text-[8px] font-black uppercase tracking-widest">Award</span>
                  </div>
                  {award.year && (
                    <div className="bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 rounded-full">
                      <span className="text-white font-black text-[11px] tracking-wider">{award.year}</span>
                    </div>
                  )}
                </div>

                {/* Text overlay at bottom */}
                <div className="absolute inset-x-5 bottom-5 group-hover:-translate-y-1 transition-transform duration-500">
                  <p className="text-[#C5A03F] text-[9px] font-black uppercase tracking-[0.3em] mb-1">IGO Agritech</p>
                  <h4 className="text-white font-bold text-base leading-snug mb-0.5">{award.name}</h4>
                  <p className="text-white/55 text-xs font-medium group-hover:text-white/80 transition-colors duration-500">{award.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>

    {/* ── Associated Brands ── */}
    <section className="py-20 bg-[#0C1A14] relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-[#C5A03F]/60" />
            <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">IGO Group of Companies</p>
            <div className="h-px w-12 bg-[#C5A03F]/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Associated Brands</h2>
          <p className="text-white/65 text-base font-light mt-3 max-w-xl mx-auto leading-relaxed">
            The IGO ecosystem spans farming, food processing, financial services, and agri-education — all under one group.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {[
            { name: "Farmers Factory", logo: "https://www.igoagritechfarms.com/images/foot1.png", desc: "Processing & Manufacturing" },
            { name: "Valluvam",        logo: "https://www.igoagritechfarms.com/images/foot2.png", desc: "Agri Consultancy" },
            { name: "IGO Nursery",    logo: "https://www.igoagritechfarms.com/images/foot3.png", desc: "Plant Propagation" },
            { name: "Protein Cuts",   logo: "https://www.igoagritechfarms.com/images/foot4.png", desc: "Farm-to-Table" },
            { name: "Financial Svcs", logo: "https://www.igoagritechfarms.com/images/foot5.png", desc: "Agri Finance" },
          ].map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className="group bg-white/10 border border-white/20 hover:bg-white hover:border-white rounded-2xl p-6 text-center transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Logo */}
              <div className="w-16 h-16 rounded-xl bg-white/15 group-hover:bg-primary/10 flex items-center justify-center mx-auto mb-4 p-2.5 transition-colors">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <p className="text-white group-hover:text-[#1A1A1A] font-bold text-sm mb-1.5 leading-snug transition-colors">{brand.name}</p>
              <p className="text-white/60 group-hover:text-black/50 text-[10px] font-semibold uppercase tracking-wider transition-colors">{brand.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Learn About IGO Groups ── */}
    <section className="py-20 bg-[#F4F8F4] border-y border-[#1A4231]/8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div>
            <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-3">IGO Group</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] leading-tight mb-4">
              Learn About<br />
              <span className="italic text-[#1A4231]">IGO Groups</span>
            </h2>
            <p className="text-black/55 text-base font-light leading-relaxed max-w-lg">
              IGO is more than a farm consultancy. It's a growing ecosystem of 16+ brands spanning agri retail, fintech, F&B, real estate, exports, and more — all built on one farming foundation.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/igo-groups"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#1A4231] text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#1A4231]/20 group whitespace-nowrap"
            >
              Explore Our Brands <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Final CTA ── */}
    <section className="relative py-28 overflow-hidden bg-[#0C1A14]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C5A03F]/8 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#C5A03F]/50" />
            <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">Ready to Work With Us?</span>
            <div className="h-px w-12 bg-[#C5A03F]/50" />
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[1.05] tracking-tight">
            Let's build something<br />
            <span className="italic text-[#C5A03F]">extraordinary.</span>
          </h2>

          {/* Description */}
          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-12 font-light max-w-2xl mx-auto">
            From a free site assessment to full turnkey delivery — our team is ready to bring your farm vision to life across India.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#C5A03F] text-white text-xs font-bold rounded-full hover:bg-white hover:text-[#1A4231] transition-all uppercase tracking-widest shadow-2xl shadow-[#C5A03F]/25 group"
            >
              Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 text-white text-xs font-bold rounded-full hover:bg-white hover:text-[#1A4231] transition-all uppercase tracking-widest border border-white/25"
            >
              Browse Projects
            </Link>
          </div>

          {/* Bottom trust strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-white/10">
            {[
              { value: "1000+", label: "Projects Delivered" },
              { value: "28", label: "States Covered" },
              { value: "75+", label: "Awards Won" },
              { value: "10+", label: "Years of Excellence" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-[#C5A03F]">{s.value}</p>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default About;
