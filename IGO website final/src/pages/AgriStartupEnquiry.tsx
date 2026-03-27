import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  ArrowRight, CheckCircle, Rocket, Sprout, Building2,
  Mail, Phone, User, Lightbulb, Target, Handshake,
  BarChart3, Globe, Award, ChevronDown, Check,
} from "lucide-react";
import { toast } from "sonner";
import { sendFormEmail } from "@/lib/sendFormEmail";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Polyhouse / Protected Farming",
  "Hydroponic Farming",
  "Vertical Farming",
  "Aquaculture / Fish Farming",
  "Biofloc / Shrimp Farming",
  "Goat / Sheep / Livestock Farming",
  "Dairy Farming",
  "Poultry Farming",
  "Organic Farming",
  "Mushroom Farming",
  "Agri-Tech / Smart Farming",
  "Farm Engineering & Infrastructure",
  "Agri Export Business",
  "Farm-to-Consumer Brand",
  "Agri Fintech / Investment",
  "Other",
];

const STAGES = [
  { id: "idea",        label: "Idea Stage",     desc: "Just an idea, not yet started",         icon: <Lightbulb className="w-5 h-5" /> },
  { id: "planning",    label: "Planning",        desc: "Research & business planning underway",  icon: <Target className="w-5 h-5" /> },
  { id: "early",       label: "Early Stage",     desc: "Started but not yet operational",        icon: <Sprout className="w-5 h-5" /> },
  { id: "operational", label: "Operational",     desc: "Running, looking to grow",               icon: <BarChart3 className="w-5 h-5" /> },
  { id: "scaling",     label: "Scaling",         desc: "Established and expanding",              icon: <Rocket className="w-5 h-5" /> },
];

const SUPPORT_OPTIONS = [
  { id: "planning",    label: "Business Planning",        icon: <Target className="w-4 h-4" /> },
  { id: "setup",       label: "Farm Setup & Infrastructure", icon: <Building2 className="w-4 h-4" /> },
  { id: "tech",        label: "Technology & Equipment",   icon: <Lightbulb className="w-4 h-4" /> },
  { id: "market",      label: "Market Access & Buyers",   icon: <Globe className="w-4 h-4" /> },
  { id: "subsidy",     label: "Subsidies & Funding",      icon: <Award className="w-4 h-4" /> },
  { id: "jv",          label: "JV / Partnership",         icon: <Handshake className="w-4 h-4" /> },
  { id: "mentorship",  label: "Mentorship & Training",    icon: <User className="w-4 h-4" /> },
  { id: "export",      label: "Export Assistance",        icon: <BarChart3 className="w-4 h-4" /> },
];

const TRUST = [
  { value: "1,000+", label: "Projects Delivered" },
  { value: "28",     label: "States Covered" },
  { value: "₹100Cr+",label: "Partnerships Funded" },
  { value: "75+",    label: "Industry Awards" },
];

const fader = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const AgriStartupEnquiry = () => {
  const [form, setForm] = useState({
    founderName:   "",
    companyName:   "",
    email:         "",
    phone:         "",
    category:      "",
    idea:          "",
    stage:         "",
    support:       [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const toggle = (id: string) =>
    setForm(f => ({
      ...f,
      support: f.support.includes(id)
        ? f.support.filter(s => s !== id)
        : [...f.support, id],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.founderName.trim()) { toast.error("Please enter your name."); return; }
    if (!form.email.trim()) { toast.error("Please enter your email address."); return; }
    if (!form.category) { toast.error("Please select a startup category."); return; }
    if (!form.stage) { toast.error("Please select your current stage."); return; }
    if (form.support.length === 0) { toast.error("Please select at least one support area."); return; }
    setLoading(true);

    const supportLabels = form.support
      .map(id => SUPPORT_OPTIONS.find(s => s.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const stageLabel = STAGES.find(s => s.id === form.stage)?.label || form.stage;

    // Build a full detailed message with all form sections
    const detailedMessage =
      `Company / Startup Name : ${form.companyName || "—"}\n` +
      `Startup Category       : ${form.category}\n` +
      `Current Stage          : ${stageLabel}\n` +
      `Support Needed         : ${supportLabels}\n\n` +
      `Startup Idea / Description:\n${form.idea || "—"}`;

    const { success } = await sendFormEmail({
      formType:     "Agri Startup Enquiry",
      name:         form.founderName,
      email:        form.email,
      phone:        form.phone || undefined,
      interestArea: form.category || undefined,
      message:      detailedMessage,
    });

    setLoading(false);
    setSubmitted(true);

    if (success) {
      toast.success("Startup enquiry submitted! Our venture team will reach out within 24 hours.");
    } else {
      toast.success("Enquiry received! We'll contact you within 24 hours.");
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) return (
    <div className="min-h-screen bg-[#0C1A14] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg"
      >
        <div className="w-24 h-24 rounded-full bg-[#C5A03F]/15 border border-[#C5A03F]/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-[#C5A03F]" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-[#C5A03F]/50" />
          <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">Enquiry Received</span>
          <div className="h-px w-10 bg-[#C5A03F]/50" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-5 leading-tight">
          Your Startup Journey<br />
          <span className="italic text-[#C5A03F]">Begins Now.</span>
        </h2>
        <p className="text-white/55 text-lg font-light leading-relaxed mb-10">
          Our venture team will review your enquiry and reach out within <strong className="text-white/80">24 hours</strong> to schedule your free discovery call.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/agri-startup-platform"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white hover:text-[#1A4231] transition-all"
          >
            Back to Platform <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white/20 transition-all"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );

  // ── Main page ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title="Agri Startup Enquiry"
        description="Register your agri startup with IGO Agritech Farms. Get incubation support, funding guidance, land access, and market connections to grow your agricultural business."
        keywords="agri startup enquiry, agriculture startup registration India, IGO incubation programme, farming startup support"
        url="/startup-enquiry"
      />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-[#0C1A14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,63,0.12),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,66,49,0.7),transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.14 } } }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fader} className="flex items-center justify-center gap-4 mb-7">
              <div className="h-px w-10 bg-[#C5A03F]/60" />
              <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">IGO Agri Startup Platform</span>
              <div className="h-px w-10 bg-[#C5A03F]/60" />
            </motion.div>

            <motion.h1 variants={fader} className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.93] tracking-tight mb-7">
              Launch Your<br />
              <span className="italic text-[#C5A03F]">Agri Startup.</span>
            </motion.h1>

            <motion.p variants={fader} className="text-white/55 text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Tell us about your vision. Our venture team will design the right partnership, technology stack, and market strategy — built around your startup.
            </motion.p>

            {/* Trust stats */}
            <motion.div
              variants={fader}
              className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto"
            >
              {TRUST.map(t => (
                <div key={t.label} className="px-5 py-4 text-center">
                  <p className="text-xl font-serif text-[#C5A03F]">{t.value}</p>
                  <p className="text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">{t.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
            <path d="M0 60V30C360 0 720 60 1080 30C1260 15 1380 30 1440 36V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ FORM ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-14 items-start">

            {/* ── LEFT — Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-3">Your Startup Profile</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-10 leading-tight">
                Tell Us About<br />
                <span className="italic text-[#1A4231]">Your Venture</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* ── Section A: Contact Info ── */}
                <div className="bg-[#F4F8F4] rounded-[1.75rem] p-7 border border-[#1A4231]/8 space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A4231]/50 mb-1">A — Founder & Company</p>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Founder Name */}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 block mb-2">
                        Founder Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25" />
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={form.founderName}
                          onChange={e => setForm({ ...form, founderName: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/8 rounded-xl text-sm text-black placeholder-black/25 focus:outline-none focus:border-[#1A4231]/40 focus:ring-2 focus:ring-[#1A4231]/8 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 block mb-2">
                        Company / Startup Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25" />
                        <input
                          type="text"
                          placeholder="Your company name (if any)"
                          value={form.companyName}
                          onChange={e => setForm({ ...form, companyName: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/8 rounded-xl text-sm text-black placeholder-black/25 focus:outline-none focus:border-[#1A4231]/40 focus:ring-2 focus:ring-[#1A4231]/8 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 block mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25" />
                        <input
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/8 rounded-xl text-sm text-black placeholder-black/25 focus:outline-none focus:border-[#1A4231]/40 focus:ring-2 focus:ring-[#1A4231]/8 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 block mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/8 rounded-xl text-sm text-black placeholder-black/25 focus:outline-none focus:border-[#1A4231]/40 focus:ring-2 focus:ring-[#1A4231]/8 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Section B: Startup Category ── */}
                <div className="bg-[#F4F8F4] rounded-[1.75rem] p-7 border border-[#1A4231]/8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A4231]/50 mb-4">B — Startup Category <span className="text-red-400">*</span></p>
                  <div className="relative">
                    <select
                      required
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-5 py-4 bg-white border border-black/8 rounded-xl text-sm text-black appearance-none focus:outline-none focus:border-[#1A4231]/40 focus:ring-2 focus:ring-[#1A4231]/8 transition-all cursor-pointer"
                    >
                      <option value="">Select your startup category...</option>
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
                  </div>
                </div>

                {/* ── Section C: Startup Idea ── */}
                <div className="bg-[#F4F8F4] rounded-[1.75rem] p-7 border border-[#1A4231]/8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A4231]/50 mb-4">C — Your Startup Idea</p>
                  <textarea
                    rows={4}
                    placeholder="Describe your startup idea — what you want to build, the problem you're solving, and your vision for the business..."
                    value={form.idea}
                    onChange={e => setForm({ ...form, idea: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-black/8 rounded-xl text-sm text-black placeholder-black/25 focus:outline-none focus:border-[#1A4231]/40 focus:ring-2 focus:ring-[#1A4231]/8 transition-all resize-none"
                  />
                </div>

                {/* ── Section D: Current Stage ── */}
                <div className="bg-[#F4F8F4] rounded-[1.75rem] p-7 border border-[#1A4231]/8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A4231]/50 mb-5">D — Current Stage <span className="text-red-400">*</span></p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {STAGES.map(s => {
                      const active = form.stage === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setForm({ ...form, stage: s.id })}
                          className={`relative text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                            active
                              ? "border-[#1A4231] bg-[#1A4231] text-white shadow-lg shadow-[#1A4231]/15"
                              : "border-black/8 bg-white text-black hover:border-[#1A4231]/30 hover:bg-[#EDF5EE]"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${active ? "bg-white/15 text-[#C5A03F]" : "bg-[#1A4231]/8 text-[#1A4231]"}`}>
                            {s.icon}
                          </div>
                          <p className={`font-bold text-sm ${active ? "text-white" : "text-[#1A1A1A]"}`}>{s.label}</p>
                          <p className={`text-[10px] mt-0.5 leading-relaxed ${active ? "text-white/65" : "text-black/40"}`}>{s.desc}</p>
                          {active && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#C5A03F] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Section E: Support Needed ── */}
                <div className="bg-[#F4F8F4] rounded-[1.75rem] p-7 border border-[#1A4231]/8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A4231]/50 mb-2">E — Support Needed <span className="text-red-400">*</span></p>
                  <p className="text-xs text-black/40 font-medium mb-5">Select all that apply</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SUPPORT_OPTIONS.map(s => {
                      const active = form.support.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggle(s.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-250 ${
                            active
                              ? "border-[#C5A03F] bg-[#C5A03F]/8 text-[#1A1A1A]"
                              : "border-black/8 bg-white text-black/70 hover:border-[#1A4231]/20 hover:bg-[#EDF5EE]"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${active ? "bg-[#C5A03F] text-white" : "bg-black/5 text-black/40"}`}>
                            {s.icon}
                          </div>
                          <span className={`text-sm font-semibold ${active ? "text-[#1A1A1A]" : "text-black/60"}`}>{s.label}</span>
                          {active && <Check className="w-4 h-4 text-[#C5A03F] ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-[#1A4231] text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all duration-300 shadow-xl shadow-[#1A4231]/20 disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full block shrink-0"
                      />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Startup Enquiry
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Trust line */}
                <div className="flex flex-wrap justify-center gap-6 pt-2">
                  {["Free consultation", "Response within 24 hrs", "No commitment required"].map(t => (
                    <div key={t} className="flex items-center gap-1.5 text-black/35 text-[10px] font-semibold">
                      <CheckCircle className="w-3.5 h-3.5 text-[#1A4231]/50 shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>

              </form>
            </motion.div>

            {/* ── RIGHT — Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 lg:sticky lg:top-28"
            >
              {/* Why IGO card */}
              <div className="bg-[#0C1A14] rounded-[1.75rem] p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#C5A03F]/15 border border-[#C5A03F]/25 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-[#C5A03F]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Why IGO?</p>
                    <p className="text-white/40 text-[10px]">India's #1 Agri Partner</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "10+ years of real farm execution",
                    "1,000+ successful agri projects",
                    "Pan-India presence across 28 states",
                    "₹100Cr+ worth partnerships delivered",
                    "75+ national & industry awards",
                    "Dedicated startup partnership manager",
                  ].map(pt => (
                    <div key={pt} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#C5A03F]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#C5A03F]" />
                      </div>
                      <span className="text-white/65 text-xs font-medium leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process card */}
              <div className="bg-[#F4F8F4] rounded-[1.75rem] p-7 border border-[#1A4231]/8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A4231]/50 mb-5">What Happens Next</p>
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Review",      desc: "Our team studies your enquiry within 24 hours" },
                    { step: "02", title: "Discovery",   desc: "Free 30-min call to understand your vision" },
                    { step: "03", title: "Proposal",    desc: "Custom partnership model tailored to you" },
                    { step: "04", title: "Onboarding",  desc: "We begin building your agri startup" },
                  ].map((s, i) => (
                    <div key={s.step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-[#1A4231] text-[#C5A03F] flex items-center justify-center shrink-0 text-[9px] font-black">
                        {s.step}
                      </div>
                      <div className={i < 3 ? "pb-4 border-b border-black/6 flex-1" : "flex-1"}>
                        <p className="font-bold text-xs text-[#1A1A1A] mb-0.5">{s.title}</p>
                        <p className="text-black/45 text-[11px] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="bg-white rounded-[1.75rem] p-6 border border-black/8 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/35 mb-4">Prefer to Talk Directly?</p>
                <a
                  href="tel:+917397789803"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F4F8F4] hover:bg-[#EDF5EE] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#1A4231] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1A1A1A]">+91 73977 89803</p>
                    <p className="text-black/40 text-[10px]">Mon–Sat · 9am–6pm</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/917397789803?text=Hi%20IGO%2C%20I%20have%20an%20agri%20startup%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F4F8F4] hover:bg-[#EDF5EE] transition-colors mt-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 text-lg font-bold">
                    W
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1A1A1A]">Chat on WhatsApp</p>
                    <p className="text-black/40 text-[10px]">Instant response</p>
                  </div>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AgriStartupEnquiry;
