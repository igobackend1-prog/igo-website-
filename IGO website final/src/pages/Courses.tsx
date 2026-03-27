import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { sendFormEmail } from "@/lib/sendFormEmail";
import { courses } from "@/data/siteData";
import {
  GraduationCap, Users, BookOpen, CheckCircle2, ArrowRight,
  Leaf, Award, Clock, Star, Phone, Mail, MessageCircle,
  ChevronDown, CheckCircle, Sprout, Microscope, MapPin, Bus, FlaskConical, TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

// ─── Data ──────────────────────────────────────────────────────────────────────
const streams = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Professional Training",
    desc: "Intensive hands-on programs for entrepreneurs and farmers to master high-tech farming systems.",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Student Internships",
    desc: "Real-world industry exposure for agriculture and engineering students at our modern farm facilities.",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Specialized Courses",
    desc: "Short-term technical courses covering nutrient management, pest control, system design, and more.",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
  },
];

const highlights = [
  { icon: <Award className="w-5 h-5" />, label: "MSME Certified" },
  { icon: <Sprout className="w-5 h-5" />, label: "Practical Farm Training" },
  { icon: <Microscope className="w-5 h-5" />, label: "Expert-Led Sessions" },
  { icon: <Star className="w-5 h-5" />, label: "Certificate of Completion" },
  { icon: <Users className="w-5 h-5" />, label: "Small Batch Sizes" },
  { icon: <CheckCircle className="w-5 h-5" />, label: "Job Placement Support" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const Academy = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const allPrograms = [
    ...courses.map((c) => c.title),
    "Student Internship (Agriculture)",
    "Student Internship (Engineering)",
    "Custom / Other Program",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) {
      toast.error("Please select a program of interest.");
      return;
    }
    setLoading(true);

    // 1. Save to Supabase (backup record)
    const { error: dbError } = await supabase.from("course_enquiries").insert({
      name:    formData.name.trim(),
      email:   formData.email.trim(),
      phone:   formData.phone.trim(),
      course:  selectedCourse,
      message: formData.message.trim() || null,
    });
    if (dbError) console.error("Supabase insert error:", dbError.message);

    // 2. Auto-send email to bankingbackend.indiagreen@gmail.com
    const { success } = await sendFormEmail({
      formType: "IGO Academy Enrollment",
      name:     formData.name,
      email:    formData.email,
      phone:    formData.phone || undefined,
      course:   selectedCourse,
      message:  formData.message || undefined,
    });

    setLoading(false);
    setSubmitted(true);

    if (success) {
      toast.success("Enrollment enquiry submitted! We'll contact you within 24 hours.");
    } else {
      toast.success("Enquiry received! Our team will reach out to you shortly.");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Agri Training & Academy | Farming Courses — IGO Agritech Farms"
        description="Enroll in IGO Agritech Farms' agriculture training programs. Hands-on courses in polyhouse farming, hydroponics, vertical farming, mushroom cultivation, biofloc, and agri entrepreneurship."
        keywords="agri training India, farming course, polyhouse training, hydroponics course, agri academy Chennai, mushroom farming course, vertical farming training"
        url="/courses"
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-20 overflow-hidden bg-[#0C1A14]">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#6FD898] text-[10px] font-black uppercase tracking-[0.35em] mb-6 border border-white/20">
                <GraduationCap className="w-3.5 h-3.5" /> India's Premier Agri Training Hub
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-5">
                IGO <span className="text-[#6FD898] italic font-serif">Academy</span>
              </h1>
              <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
                Empowering the next generation of Agri-Entrepreneurs with scientific training, practical internship programs, and MSME certified technical courses.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: "500+", label: "Trained" },
                  { value: "10+", label: "Programs" },
                  { value: "MSME", label: "Certified" },
                  { value: "5★", label: "Rated" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Stream cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-4 w-full lg:w-[360px] shrink-0"
            >
              {streams.map((s, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-4 hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#6FD898]/20 text-[#6FD898] flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm leading-snug">{s.title}</div>
                    <div className="text-white/70 text-xs leading-relaxed mt-0.5">{s.desc.split(".")[0]}.</div>
                  </div>
                </div>
              ))}
              <a
                href="#enquiry"
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#6FD898] text-[#0C1A14] font-bold text-sm hover:bg-[#4ade80] transition-all group"
              >
                Enroll Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="h-10 bg-[#F9F9F7]" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </section>

      {/* ── COURSES GRID ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Available Programs</div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Training Courses</h2>
            </div>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors shrink-0"
            >
              Enquire Now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-border p-6 flex flex-col shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 text-primary text-[10px] font-black uppercase tracking-[0.25em] border border-primary/15">
                    <Clock className="w-3 h-3" /> {c.duration}
                  </div>
                  {"level" in c && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                      {(c as any).level}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{c.description}</p>
                <div className="space-y-2 mb-5">
                  {c.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs font-medium text-foreground/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> {t}
                    </div>
                  ))}
                </div>
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all"
                >
                  Enquire About This Course <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Training Methodology</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">How Our Training Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", icon: <BookOpen className="w-6 h-6" />, title: "Theory & Fundamentals", desc: "In-depth classroom sessions on science, business models, and industry best practices from our expert faculty." },
              { step: "02", icon: <FlaskConical className="w-6 h-6" />, title: "Live Demo Sessions", desc: "Watch expert farmers demonstrate system setup, operations, and troubleshooting at our working farm facilities." },
              { step: "03", icon: <Sprout className="w-6 h-6" />, title: "Hands-On Practice", desc: "Get your hands dirty — students build, operate, and manage systems themselves under expert supervision." },
              { step: "04", icon: <TrendingUp className="w-6 h-6" />, title: "Business Planning", desc: "Guided DPR writing, ROI calculation, subsidy navigation, and post-training market linkage support." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-[#F9F9F7] rounded-2xl border border-border p-6 flex flex-col gap-4"
              >
                <div className="absolute top-4 right-4 text-[40px] font-black text-primary/8 leading-none select-none">{item.step}</div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1.5 leading-snug">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIAL VISITS ─────────────────────────────────────────── */}
      <section className="py-16 bg-[#0C1A14] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#6FD898] text-[10px] font-black uppercase tracking-[0.35em] mb-6 border border-white/20">
                <Bus className="w-3.5 h-3.5" /> Campus & Industrial Visits
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
                Bringing Agri-Tech <span className="text-[#6FD898] italic font-serif">to Your Campus</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                IGO Agritech Farms partners with agricultural colleges, engineering institutions, and vocational training centres to deliver immersive industrial visits and guest lecture programs. Students gain first-hand exposure to polyhouse farming, hydroponics, aquaculture, and smart farm technologies at our live operational facilities.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <MapPin className="w-4 h-4" />, label: "Live farm facility tours in Chennai" },
                  { icon: <Users className="w-4 h-4" />, label: "Batch visits for 20–200+ students" },
                  { icon: <GraduationCap className="w-4 h-4" />, label: "Expert demonstrations & Q&A sessions" },
                  { icon: <Award className="w-4 h-4" />, label: "Participation certificates for all students" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6FD898]/20 text-[#6FD898] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-[#6FD898] text-[#0C1A14] font-bold text-sm hover:bg-[#4ade80] transition-all group"
              >
                Request a Campus Visit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Right — visit highlights grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { title: "Polyhouse Farming", desc: "Explore our multi-span climate-controlled polyhouses with live crops and fertigation systems." },
                { title: "Hydroponic Systems", desc: "See NFT, DWC, and vertical hydroponic setups in active commercial operation." },
                { title: "Biofloc Aquaculture", desc: "Live biofloc tanks with shrimp and fish farming at various growth stages." },
                { title: "Smart Farm Tech", desc: "IoT sensors, automated irrigation, and real-time farm monitoring dashboards." },
              ].map((item, i) => (
                <div key={i} className="bg-white/8 border border-white/15 rounded-2xl p-5 hover:bg-white/12 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#6FD898] mb-3" />
                  <h4 className="font-bold text-white text-sm mb-2 leading-snug">{item.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY SECTION ───────────────────────────────────────────── */}
      <section id="enquiry" className="py-20 bg-white">
        <div className="container mx-auto px-6">

          {/* Section label */}
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Enrollment</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Start Your <span className="text-primary italic font-serif">Learning Journey</span>
            </h2>
            <p className="text-muted-foreground text-base mt-3 max-w-xl mx-auto">
              Fill out the form below and our academic counselor will reach out within 24 hours to discuss your program.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[380px_1fr] gap-10 xl:gap-16 max-w-5xl mx-auto">

            {/* ── Left info panel ── */}
            <div className="space-y-5">
              {/* Dark card */}
              <div className="bg-[#0C1A14] rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/15 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-primary mb-4">Why Train with IGO?</div>
                <h3 className="text-xl font-bold mb-5 text-white leading-snug">India's Most Trusted Agri Training Brand</h3>
                <div className="space-y-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                        {h.icon}
                      </div>
                      <span className="text-sm text-white/70 font-medium">{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="bg-[#F9F9F7] rounded-3xl p-6 border border-border">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-primary mb-4">Reach Us Directly</div>
                <div className="space-y-3">
                  <a href="tel:+917397789803" className="flex items-center gap-3 text-sm font-semibold hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    +91 73977 89803
                  </a>
                  <a href="mailto:bankingbackend.indiagreen@gmail.com" className="flex items-center gap-3 text-sm font-semibold hover:text-primary transition-colors break-all">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    bankingbackend.indiagreen@gmail.com
                  </a>
                  <a
                    href="https://wa.me/917397789803?text=Hi%20IGO%2C%20I'm%20interested%20in%20your%20Academy%20programs."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-semibold text-[#128c3a] hover:text-[#0a5c25] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#25D366]/15 text-[#128c3a] flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "500+", label: "Students Trained" },
                  { value: "95%", label: "Satisfaction Rate" },
                  { value: "10+", label: "Courses Offered" },
                  { value: "24h", label: "Response Time" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F9F9F7] rounded-2xl p-4 border border-border text-center">
                    <div className="text-xl font-bold text-primary">{s.value}</div>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-24 bg-[#F9F9F7] rounded-3xl border border-border text-center h-full"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Enquiry Received</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">You're on the list!</h3>
                    <p className="text-muted-foreground text-base mb-8 max-w-xs leading-relaxed">
                      Our academic counselor will contact you within 24 hours to discuss your program options.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", message: "" });
                        setSelectedCourse("");
                      }}
                      className="px-8 py-3 rounded-full border-2 border-primary text-primary text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all"
                    >
                      Submit Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="bg-[#F9F9F7] rounded-3xl border border-border p-8 md:p-10 space-y-6"
                  >
                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Full Name *</label>
                        <input
                          type="text" required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full bg-white border border-border rounded-2xl px-5 py-3.5 text-sm font-medium placeholder:text-black/25 focus:ring-2 focus:ring-primary/15 focus:border-primary/40 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Phone Number *</label>
                        <input
                          type="tel" required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white border border-border rounded-2xl px-5 py-3.5 text-sm font-medium placeholder:text-black/25 focus:ring-2 focus:ring-primary/15 focus:border-primary/40 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Email Address *</label>
                      <input
                        type="email" required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-white border border-border rounded-2xl px-5 py-3.5 text-sm font-medium placeholder:text-black/25 focus:ring-2 focus:ring-primary/15 focus:border-primary/40 outline-none transition-all"
                      />
                    </div>

                    {/* Program selection — visual pills */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                        Program of Interest *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {allPrograms.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setSelectedCourse(p)}
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                              selectedCourse === p
                                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                : "bg-white text-foreground/60 border-border hover:border-primary/40 hover:text-primary"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                      {!selectedCourse && (
                        <p className="text-[10px] text-muted-foreground">Select one program above</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                        Additional Details <span className="text-muted-foreground/50 normal-case font-medium">(optional)</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your background, goals, preferred batch dates, or any questions..."
                        className="w-full bg-white border border-border rounded-2xl px-5 py-3.5 text-sm font-medium placeholder:text-black/25 focus:ring-2 focus:ring-primary/15 focus:border-primary/40 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#0C1A14] transition-all flex items-center justify-center gap-3 group disabled:opacity-60 shadow-lg shadow-primary/20"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          Submit Academy Enquiry
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Trust strip */}
                    <div className="flex flex-wrap justify-center gap-5 pt-2">
                      {["Reply within 24 hrs", "MSME Certified", "500+ Students Trained"].map((t) => (
                        <div key={t} className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3 text-primary" /> {t}
                        </div>
                      ))}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0C1A14] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Ready to Begin?</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                Join IGO Academy Today
              </h2>
              <p className="text-white/40 text-sm mt-2">Batches start every month — limited seats available.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+917397789803"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/20"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Academy;
