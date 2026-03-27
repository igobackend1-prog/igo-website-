import { ArrowRight } from "lucide-react";
import { navLinks } from "@/data/siteData";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

const fader: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const CATEGORY_DESC: Record<string, string> = {
  "Agri Farming Projects":      "Polyhouses, hydroponics, vertical farms, open-field plantations, floriculture, mushroom units, urban farming & nurseries.",
  "Aquaculture Farming Projects": "Fish, biofloc, shrimp & crab farming plus integrated aquaponics — full-spectrum aquaculture turnkey solutions.",
  "Livestock Farming Projects":  "Goat, sheep, dairy, poultry & integrated livestock systems with professional shed design and herd management.",
  "Farm Engineering Projects":   "Cold storage, packhouses, irrigation, solar agriculture, land surveying & precision farm development.",
};

const Projects = () => {
  const categoryLinks = navLinks.find(n => n.label === "Projects")?.children || [];

  return (
    <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title="Our Projects | Agri Engineering Projects — IGO Agritech Farms"
        description="Explore 1000+ completed agri engineering projects by IGO Agritech Farms — polyhouse, hydroponics, vertical farming, biofloc, rooftop farming, solar agriculture, and more across India."
        keywords="agri engineering projects India, polyhouse project, hydroponic project, vertical farming project, mushroom farming project, biofloc project, solar agriculture, rooftop farming"
        url="/projects"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-40 overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/assets/projects/main page/agri farming project .jpg"
            alt="IGO Projects"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.18 } } }}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fader} className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C5A03F]/70" />
              <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em]">Portfolio of Excellence</span>
              <div className="h-px w-12 bg-[#C5A03F]/70" />
            </motion.div>
            <motion.h1 variants={fader} className="text-6xl md:text-9xl font-serif text-white mb-8 tracking-tight leading-[0.9]">
              The Gallery of <br /><span className="italic text-[#C5A03F]">Sustenance.</span>
            </motion.h1>
            <motion.p variants={fader} className="text-white/60 text-xl md:text-2xl font-light leading-relaxed mb-14 max-w-3xl mx-auto">
              1,000+ institutional implementations executed across India — from precision polyhouses to integrated aquaculture ecosystems.
            </motion.p>
            <motion.div variants={fader}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white hover:text-[#1A4231] transition-all shadow-2xl shadow-[#C5A03F]/30"
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
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

      {/* ── Category Cards — Asymmetric Layout ── */}
      <section className="py-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Core Disciplines</p>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A]">Select a Project Category</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categoryLinks.map((category: any, i: number) => {
            const desc = CATEGORY_DESC[category.label] || "";

            return (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={category.href}
                  className="group relative block aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] transition-all duration-700"
                >
                  <img
                    src={category.cardImage || "/assets/projects/main page/agri farming project .jpg"}
                    alt={category.label}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 group-hover:from-black/70 transition-all duration-700" />

                  {/* Top badge */}
                  <div className="absolute top-8 left-8">
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[9px] text-white font-bold uppercase tracking-[0.25em]">
                      {category.children?.length || 0} Project Types
                    </span>
                  </div>

                  {/* Corner arrow */}
                  <div className="absolute top-8 right-8 w-12 h-12 bg-[#C5A03F] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 shadow-lg">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>

                  {/* Content bottom */}
                  <div className="absolute inset-x-8 bottom-8">
                    <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:-translate-y-1 transition-transform duration-500 leading-tight mb-3">
                      {category.label}
                    </h3>
                    {desc && (
                      <p className="text-sm text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                        {desc}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[#C5A03F] text-[10px] font-bold uppercase tracking-widest mt-5 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                      Explore Projects <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="py-28 bg-[#0D1F15]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { value: "1,000+", label: "Projects Completed", sub: "Across all disciplines" },
              { value: "4",      label: "Core Disciplines",   sub: "Agri, Aqua, Livestock, Engg" },
              { value: "Pan-India", label: "Delivery Reach",  sub: "28 states & UTs covered" },
              { value: "10+",    label: "Years Excellence",   sub: "Since 2013" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="px-8 py-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-serif text-[#C5A03F] mb-2">{stat.value}</p>
                <p className="text-white font-bold text-sm mb-1">{stat.label}</p>
                <p className="text-white/30 text-[11px] font-medium">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IGO Promise Strip ── */}
      <section className="py-20 bg-[#F4F8F4] border-y border-[#1A4231]/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Turnkey Delivery",   desc: "From site survey and design to installation, training, and AMC — fully managed by our expert teams." },
              { title: "Subsidy Guidance",   desc: "We assist clients in securing government subsidies under NHM, PMMSY, PM-KUSUM and state horticulture schemes." },
              { title: "Pan-India Reach",    desc: "Executed projects across 28 states with logistics and partner networks ensuring on-time delivery anywhere in India." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-1 bg-[#C5A03F] rounded-full shrink-0 self-stretch" />
                <div>
                  <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">{p.title}</h4>
                  <p className="text-black/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-6">Ready to Build?</p>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-8 leading-tight">
              Ready to build your <br />enterprise farm?
            </h2>
            <p className="text-black/50 text-lg leading-relaxed mb-12 font-light">
              Contact our engineering team for a free site assessment and project feasibility report tailored to your land, budget, and goals.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                to="/contact"
                className="px-12 py-5 bg-[#1A4231] text-white text-[10px] font-bold rounded-full hover:bg-black transition-all uppercase tracking-widest shadow-xl shadow-[#1A4231]/25 inline-flex items-center gap-3"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?subject=Project%20Consultation"
                className="px-12 py-5 bg-white border border-black/10 text-black text-[10px] font-bold rounded-full hover:bg-slate-50 hover:border-black/20 transition-all uppercase tracking-widest"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
