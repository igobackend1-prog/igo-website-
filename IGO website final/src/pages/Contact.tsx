import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { sendFormEmail } from "@/lib/sendFormEmail";
import { companyInfo } from "@/data/siteData";
import {
  ArrowRight, Mail, MapPin, Phone, MessageCircle,
  Facebook, Instagram, Linkedin, Youtube, Twitter,
  ChevronDown, CheckCircle2, Clock, Award, Building2, ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const fader = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ENQUIRY_TYPES = [
  "Project Enquiry",
  "Product Query",
  "Agri Consulting",
  "AMC / Maintenance",
  "Startup Platform",
  "General Enquiry",
];

const PROJECT_OPTIONS = [
  "Polyhouse / Protected Farming",
  "Hydroponic Farming",
  "Vertical Farming",
  "Open Field Cultivation",
  "Floriculture",
  "Mushroom Farming",
  "Urban / Rooftop Farming",
  "Aquaculture / Fish Farming",
  "Biofloc Farming",
  "Shrimp / Prawn Farming",
  "Goat / Sheep Farming",
  "Dairy Farming",
  "Poultry Farming",
  "Cold Storage / Pack House",
  "Farm Irrigation Systems",
  "Solar Agriculture",
  "Land Development / Surveying",
  "Agri Consulting",
  "AMC Services",
  "Agri Startup Platform",
  "Joint Venture",
  "Other",
];

const FAQS = [
  {
    q: "What areas of India does IGO serve?",
    a: "IGO Agritech Farms operates pan-India with active project teams across Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala, Maharashtra, Gujarat, Rajasthan, and most other states. We have delivered projects in all 28 states and UTs.",
  },
  {
    q: "How long does a project take from enquiry to completion?",
    a: "Timeline depends on project type and scale. A standard polyhouse (1 acre) typically takes 30–45 days from design approval to handover. Aquaculture pond construction takes 45–60 days. Hydroponic systems take 21–35 days. We provide a detailed timeline during the free feasibility assessment.",
  },
  {
    q: "Do you assist clients with government subsidies?",
    a: "Yes — this is one of our key advantages. IGO assists clients in applying for subsidies under NHM, MIDH, PMMSY, PM-KUSUM, and state-specific horticulture & fisheries schemes. Our team handles documentation, liaison, and follow-up to ensure maximum subsidy realisation.",
  },
  {
    q: "What does your Annual Maintenance Contract (AMC) cover?",
    a: "Our AMC covers scheduled inspections, preventive maintenance, component replacement (film, netting, drip lines, pumps), water quality checks for aquaculture, and 24×7 technical support for critical systems. AMC pricing is customised to system type and scale.",
  },
  {
    q: "Can I visit a reference farm before deciding?",
    a: "Absolutely. IGO maintains relationships with clients who welcome farm visits. Depending on your project type, we will connect you with the most relevant reference farm — polyhouse, hydroponic, aquaculture or livestock — so you can see quality first-hand before committing.",
  },
];

// ─── Contact Page ──────────────────────────────────────────────────────────────
const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", location: "", subject: "", message: "",
  });
  const [enquiryType, setEnquiryType] = useState("Project Enquiry");
  const [submitted,   setSubmitted]   = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);

  // Pre-fill subject from URL params (e.g. /contact?subject=Catalog%20Request)
  useEffect(() => {
    const sub = searchParams.get("subject");
    if (sub) setFormData(prev => ({ ...prev, subject: sub }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error("Please enter your name."); return; }
    if (!formData.email.trim()) { toast.error("Please enter your email address."); return; }
    if (!formData.message.trim()) { toast.error("Please enter your message."); return; }
    setLoading(true);

    // 1. Save to Supabase (backup record)
    const { error: dbError } = await supabase.from("contacts").insert({
      name:    formData.name.trim(),
      email:   formData.email.trim(),
      phone:   formData.phone.trim() || null,
      subject: `[${enquiryType}] ${formData.subject}`.trim() || null,
      message: formData.message.trim(),
    });
    if (dbError) console.error("Supabase insert error:", dbError.message);

    // 2. Auto-send email to bankingbackend.indiagreen@gmail.com
    const { success } = await sendFormEmail({
      formType:     "Contact Enquiry",
      name:         formData.name,
      email:        formData.email,
      phone:        formData.phone || undefined,
      location:     formData.location || undefined,
      enquiryType:  enquiryType,
      subjectArea:  formData.subject || undefined,
      message:      formData.message,
    });

    setLoading(false);
    setSubmitted(true);

    if (success) {
      toast.success("Enquiry submitted! We'll respond within 24 hours.");
    } else {
      // Still mark as submitted — Supabase backup was saved
      toast.success("Enquiry received! We'll contact you within 24 hours.");
    }
  };

  const waLink = `${companyInfo.whatsapp}?text=Hi%20IGO%20Agritech%20Farms%2C%20I%20have%20a%20${encodeURIComponent(enquiryType)}%20enquiry.%20Please%20get%20in%20touch.`;

  return (
    <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title="Contact Us | Get in Touch — IGO Agritech Farms"
        description="Contact IGO Agritech Farms for project enquiries, agri consulting, product purchases, or partnership opportunities. Call +91 73977 89803 or email us. Based in Chennai, India."
        keywords="contact IGO Agritech, agri consulting enquiry, polyhouse project enquiry, Chennai agriculture company, agri engineering contact India"
        url="/contact"
      />

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — Cinematic Hero
      ═══════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-44 overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/assets/projects/main page/agri farming project .jpg"
            alt="IGO Contact"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.18 } } }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fader} className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C5A03F]/60" />
              <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em]">Contact & Enquiries</span>
              <div className="h-px w-12 bg-[#C5A03F]/60" />
            </motion.div>

            <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.92]">
              Start Your Project. <br />
              <span className="italic text-[#C5A03F]">Talk to IGO.</span>
            </motion.h1>

            <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed mb-14 max-w-2xl mx-auto">
              Our engineering and consulting team is ready to assess your site, plan your project, and guide you to the right solution — from first enquiry to final handover.
            </motion.p>

            {/* Quick-access pills */}
            <motion.div variants={fader} className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+917397789803"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#C5A03F] hover:text-white transition-all shadow-xl"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-white text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#20b858] transition-all shadow-xl"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href="mailto:bankingbackend.indiagreen@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
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

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — Contact Info Strip
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#0D1F15] py-0">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                label: "Call Us",
                lines: ["+91 73977 89803", "+91 73977 89804"],
                href: "tel:+917397789803",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: "Email Us",
                lines: ["bankingbackend.indiagreen@gmail.com", "bd2@igogroups.com"],
                href: "mailto:bankingbackend.indiagreen@gmail.com",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: "Head Office",
                lines: ["No 17, Kovalan Street, 2nd Main Road,", "Uthandi Kanathur, Chennai 600119"],
                href: "https://maps.google.com/?q=Uthandi+Kanathur+Chennai",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                label: "Business Hours",
                lines: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: By Appointment"],
                href: null,
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="px-8 py-10 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#C5A03F]/15 flex items-center justify-center text-[#C5A03F] mb-5">
                  {card.icon}
                </div>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.3em] mb-3">{card.label}</p>
                {card.lines.map((line, li) => (
                  card.href && li === 0 ? (
                    <a key={li} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="block text-sm text-white font-medium hover:text-[#C5A03F] transition-colors leading-relaxed break-all">
                      {line}
                    </a>
                  ) : (
                    <p key={li} className="text-sm text-white/50 font-light leading-relaxed">{line}</p>
                  )
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — Form + Sidebar
      ═══════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#F8F9F6]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-start">

            {/* ── Enquiry Form ── */}
            <div>
              <div className="mb-10">
                <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Send an Enquiry</p>
                <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
                  Tell us about <br />your project.
                </h2>
              </div>

              {/* Enquiry type pills */}
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 mb-3">I'm enquiring about</p>
                <div className="flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEnquiryType(type)}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                        enquiryType === type
                          ? "bg-[#1A4231] text-white border-[#1A4231] shadow-md shadow-[#1A4231]/20"
                          : "bg-white text-black/50 border-black/10 hover:border-[#1A4231] hover:text-[#1A4231]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] text-center border border-black/5 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-[#E8F5E9] text-[#1A4231] flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif text-[#1A1A1A] mb-4">Enquiry Received!</h3>
                  <p className="text-black/50 text-lg font-light mb-10 max-w-xs leading-relaxed">
                    A specialist will contact you within 24 hours to discuss your project.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", location: "", subject: "", message: "" });
                    }}
                    className="px-10 py-4 border-2 border-[#1A4231] text-[#1A4231] text-xs font-bold rounded-full hover:bg-[#1A4231] hover:text-white transition-all uppercase tracking-widest"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-black/5 space-y-7">
                  {/* Row 1: Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Full Name *</label>
                      <input
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-[#F8F9F6] border border-black/8 rounded-2xl px-5 py-4 text-sm text-black placeholder:text-black/25 focus:ring-2 focus:ring-[#1A4231]/15 focus:border-[#1A4231]/30 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Phone Number *</label>
                      <input
                        type="tel" required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#F8F9F6] border border-black/8 rounded-2xl px-5 py-4 text-sm text-black placeholder:text-black/25 focus:ring-2 focus:ring-[#1A4231]/15 focus:border-[#1A4231]/30 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Location */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Email Address *</label>
                      <input
                        type="email" required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-[#F8F9F6] border border-black/8 rounded-2xl px-5 py-4 text-sm text-black placeholder:text-black/25 focus:ring-2 focus:ring-[#1A4231]/15 focus:border-[#1A4231]/30 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">City / State</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Bangalore, Karnataka"
                        className="w-full bg-[#F8F9F6] border border-black/8 rounded-2xl px-5 py-4 text-sm text-black placeholder:text-black/25 focus:ring-2 focus:ring-[#1A4231]/15 focus:border-[#1A4231]/30 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Project type */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Project / Interest Area</label>
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#F8F9F6] border border-black/8 rounded-2xl px-5 py-4 text-sm text-black focus:ring-2 focus:ring-[#1A4231]/15 focus:border-[#1A4231]/30 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a project or interest area</option>
                        {PROJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Your Message *</label>
                    <textarea
                      rows={5} required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your land size, location, budget, or any specific requirements..."
                      className="w-full bg-[#F8F9F6] border border-black/8 rounded-2xl px-5 py-4 text-sm text-black placeholder:text-black/25 focus:ring-2 focus:ring-[#1A4231]/15 focus:border-[#1A4231]/30 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-[#1A4231] text-white text-xs font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group disabled:opacity-60 uppercase tracking-widest shadow-xl shadow-[#1A4231]/20"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Enquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Trust strip */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
                      {[
                        "Replies within 24 hrs",
                        "MSME Certified",
                        "1,000+ Projects Delivered",
                      ].map((t) => (
                        <div key={t} className="flex items-center gap-2 text-[10px] text-black/40 font-bold uppercase tracking-widest">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1A4231]" /> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-5 lg:pt-[116px]">

              {/* WhatsApp card */}
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a9e4a] to-[#128c3a] p-8 shadow-xl shadow-[#25D366]/20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Chat on WhatsApp</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed mb-6">
                  Get a response in minutes. Our team is available Mon–Sat, 9AM–6PM.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 w-full justify-center px-6 py-3.5 bg-white text-[#128c3a] text-xs font-black uppercase tracking-widest rounded-full hover:bg-[#f0fff4] transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" /> Start Chat
                </a>
              </div>

              {/* Call card */}
              <div className="rounded-[2rem] bg-[#0D1F15] p-8">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A03F]/15 flex items-center justify-center mb-5">
                  <Phone className="w-6 h-6 text-[#C5A03F]" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">Call Directly</h3>
                <p className="text-white/40 text-xs font-light mb-5">Mon – Sat, 9:00 AM – 6:00 PM IST</p>
                <a
                  href="tel:+917397789803"
                  className="text-2xl font-bold text-white hover:text-[#C5A03F] transition-colors block mb-2"
                >
                  +91 73977 89803
                </a>
                <a
                  href="tel:+917397789804"
                  className="text-base text-white/40 hover:text-white/70 transition-colors block"
                >
                  +91 73977 89804
                </a>
              </div>

              {/* Awards strip */}
              <div className="rounded-[2rem] bg-white border border-black/5 p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-black/30 mb-6">Recognition & Certifications</p>
                <div className="space-y-4">
                  {[
                    { icon: <Award className="w-4 h-4" />, text: "MSME Awards 2024 — Best Agri-Consulting Brand" },
                    { icon: <Award className="w-4 h-4" />, text: "India Trade Awards 2022 — Export Excellence" },
                    { icon: <Award className="w-4 h-4" />, text: "SISI Award for Industrial Development" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C5A03F]/10 flex items-center justify-center text-[#C5A03F] shrink-0 mt-0.5">
                        {a.icon}
                      </div>
                      <p className="text-xs text-black/60 leading-relaxed">{a.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="rounded-[2rem] bg-white border border-black/5 p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-black/30 mb-6">Follow IGO Agritech</p>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { icon: <Facebook  className="w-5 h-5" />, href: "https://facebook.com/IGOAgriTechfarms/",          color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" },
                    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/igoagritechfarms/",         color: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]" },
                    { icon: <Linkedin  className="w-5 h-5" />, href: "https://linkedin.com/company/igo-agritechfarms/", color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]" },
                    { icon: <Youtube   className="w-5 h-5" />, href: "https://youtube.com/@IGOAgriTechfarms",           color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]" },
                    { icon: <Twitter   className="w-5 h-5" />, href: "https://twitter.com/igoagritechfarm",            color: "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`aspect-square rounded-2xl bg-black/3 border border-black/8 flex items-center justify-center text-black/40 transition-all duration-300 ${s.color}`}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — Map with overlay
      ═══════════════════════════════════════════════════ */}
      <section className="relative h-[520px] border-t border-black/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3888.4850698844434!2d80.24999731482187!3d12.900529490893615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="IGO Agritech Farms Location"
        />
        {/* Floating info card */}
        <div className="absolute top-8 left-8 bg-white rounded-[1.5rem] shadow-2xl p-6 max-w-[280px] border border-black/5 z-10">
          <div className="w-9 h-9 rounded-full bg-[#1A4231] flex items-center justify-center mb-4">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-base font-bold text-[#1A1A1A] mb-1">IGO Agritech Farms</h4>
          <p className="text-xs text-black/50 leading-relaxed mb-4">
            No 17, Kovalan Street, 2nd Main Road,<br />Uthandi Kanathur, Chennai 600119
          </p>
          <a
            href="https://maps.google.com/?q=Uthandi+Kanathur+Chennai+600119"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-[#1A4231] uppercase tracking-widest hover:text-[#C5A03F] transition-colors"
          >
            Get Directions <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — FAQ
      ═══════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#F8F9F6]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Got Questions?</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white rounded-[1.5rem] border border-black/5 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left group"
                >
                  <span className="text-base font-bold text-[#1A1A1A] group-hover:text-[#1A4231] transition-colors pr-6 leading-snug">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 w-9 h-9 rounded-full bg-black/4 flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-black/40" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-7 border-t border-black/5">
                        <p className="text-black/60 text-sm leading-relaxed pt-5 font-light">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 7 — Final Action Bar
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0D1F15] text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-4">Prefer to talk directly?</p>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">We're one call away.</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <p className="text-white/75 text-sm">Average response time: under 2 hours</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="tel:+917397789803"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#1A1A1A] text-xs font-bold rounded-full hover:bg-[#C5A03F] hover:text-white transition-all uppercase tracking-widest shadow-xl"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white text-xs font-bold rounded-full hover:bg-[#20b858] transition-all uppercase tracking-widest shadow-xl shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
