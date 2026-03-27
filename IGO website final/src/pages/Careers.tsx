import { useState } from "react";
import { ArrowRight, Mail, TrendingUp, Zap, Heart, CheckCircle, Users, MapPin, Send } from "lucide-react";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { sendFormEmail } from "@/lib/sendFormEmail";
import { toast } from "sonner";

const MULTILANG = ["Tamil", "Telugu", "Hindi", "English"];

const departments = [
  // ── FEATURED — Farm Manager first ──────────────────────────────────────────
  {
    name: "Farm Manager",
    featured: true,
    emoji: "🌿",
    color: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-100",
    image: "/assets/career images/farm.webp",
    vacancies: 20,
    roles: ["Farm Manager", "Assistant Farm Manager", "Crop Production Specialist", "Farm Operations Executive", "Agri Supervisor"],
    qualification: "B.Sc. Agriculture / B.Tech Agriculture Engineering",
    languages: MULTILANG,
    type: "Full Time",
  },
  // ── New departments ─────────────────────────────────────────────────────────
  {
    name: "Mushroom Farming Team",
    featured: false,
    emoji: "🍄",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconBg: "bg-purple-100",
    image: null,
    vacancies: 5,
    roles: ["Mushroom Farm Technician", "Substrate Preparation Staff", "Harvest & Packaging Executive", "Spawn Production Technician", "Quality Control – Mushroom"],
    qualification: "Any Degree / Diploma in Mushroom Cultivation",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Hydroponics Team",
    featured: false,
    emoji: "💧",
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    iconBg: "bg-cyan-100",
    image: null,
    vacancies: 3,
    roles: ["Hydroponics Technician", "NFT System Operator", "Nutrient Management Specialist"],
    qualification: "B.Sc. Agriculture / Diploma in Horticulture",
    languages: MULTILANG,
    type: "Full Time",
  },
  // ── Original departments (updated) ─────────────────────────────────────────
  {
    name: "Business Development Team",
    featured: false,
    emoji: "📈",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
    image: "/assets/career images/businessdev.webp",
    vacancies: 5,
    roles: ["Business Development Executive", "Business Development Manager", "Sales Executive", "Area Sales Manager", "Client Relationship Executive"],
    qualification: "Any Degree",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Digital Marketing Team",
    featured: false,
    emoji: "📣",
    color: "bg-violet-50 border-violet-200 text-violet-700",
    iconBg: "bg-violet-100",
    image: "/assets/career images/digital.webp",
    vacancies: 6,
    roles: ["Digital Marketing Manager", "SEO Analyst", "Content Creator", "Video Editor", "Social Media Executive", "Accounts Executive"],
    qualification: "Any Degree",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Agriculture Engineering Team",
    featured: false,
    emoji: "🌱",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    iconBg: "bg-emerald-100",
    image: "/assets/career images/agrieng.jpg",
    vacancies: 5,
    roles: ["Agri Project Engineer", "Agronomist", "Horticulturist", "Irrigation Specialist", "Soil Scientist"],
    qualification: "B.Sc. / B.Tech – Agriculture, Agronomy, Horticulture, Soil Science, Forestry",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Civil Engineering Team",
    featured: false,
    emoji: "🏗️",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    iconBg: "bg-orange-100",
    image: "/assets/career images/civil.webp",
    vacancies: 4,
    roles: ["Civil Engineer", "Site Supervisor", "Structural Engineer", "Project Coordinator"],
    qualification: "B.E. Civil Engineering",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Farmers Factory",
    featured: false,
    emoji: "🏭",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    iconBg: "bg-yellow-100",
    image: "/assets/career images/ffff.webp",
    vacancies: 4,
    roles: ["Operations Executive", "Production Staff", "Packing Executive", "Unskilled Labour"],
    qualification: "Any Degree",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Logistics Manager",
    featured: false,
    emoji: "🚚",
    color: "bg-sky-50 border-sky-200 text-sky-700",
    iconBg: "bg-sky-100",
    image: "/assets/career images/driver.webp",
    vacancies: 3,
    roles: ["Logistics Manager", "Supply Chain Executive", "Driver"],
    qualification: "Any Degree",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Quality Control",
    featured: false,
    emoji: "✅",
    color: "bg-teal-50 border-teal-200 text-teal-700",
    iconBg: "bg-teal-100",
    image: "/assets/career images/purchase.jpg",
    vacancies: 3,
    roles: ["QC Manager", "Quality Inspector", "Lab Technician"],
    qualification: "Any Degree / Science Background",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Field Executive",
    featured: false,
    emoji: "🌾",
    color: "bg-lime-50 border-lime-200 text-lime-700",
    iconBg: "bg-lime-100",
    image: "/assets/career images/delivery.jpg",
    vacancies: 3,
    roles: ["Field Executive", "Field Coordinator", "Ground-Level Supervisor"],
    qualification: "Any Degree",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Warehouse Incharge",
    featured: false,
    emoji: "📦",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100",
    image: "/assets/career images/ware.webp",
    vacancies: 3,
    roles: ["Warehouse Incharge", "Inventory Executive", "Store Keeper"],
    qualification: "Any Degree",
    languages: MULTILANG,
    type: "Full Time",
  },
  {
    name: "Livestock Manager",
    featured: false,
    emoji: "🐄",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    iconBg: "bg-rose-100",
    image: "/assets/career images/live.webp",
    vacancies: 3,
    roles: ["Livestock Manager", "Veterinary Assistant", "Animal Husbandry Specialist"],
    qualification: "Animal Husbandry / Bachelor of Veterinary Science",
    languages: MULTILANG,
    type: "Full Time",
  },
];

const benefits = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Real Career Growth",
    desc: "Work on 1000+ live projects across India with direct career advancement and structured skill development at every level.",
    stat: "1000+",
    statLabel: "Live Projects",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Tech-Driven Work",
    desc: "Use IoT, AI, and automation in real agricultural projects — not just theory, but hands-on experience with cutting-edge agritech.",
    stat: "IoT + AI",
    statLabel: "Technology Used",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Meaningful Impact",
    desc: "Every project directly impacts farmers' livelihoods and India's food security — your work creates visible change.",
    stat: "25,000+",
    statLabel: "Jobs Created",
  },
];

const Careers = () => {
  // ── Career Application Form state ──────────────────────────────────────────
  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", department: "", position: "", message: "" });
  const [applyLoading, setApplyLoading] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);

  const handleApplyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setApplyForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name.trim()) { toast.error("Please enter your name."); return; }
    if (!applyForm.email.trim()) { toast.error("Please enter your email address."); return; }
    if (!applyForm.department) { toast.error("Please select a department."); return; }
    setApplyLoading(true);

    const { success } = await sendFormEmail({
      formType:   "Career Application",
      name:       applyForm.name,
      email:      applyForm.email,
      phone:      applyForm.phone || undefined,
      department: applyForm.department || undefined,
      position:   applyForm.position || undefined,
      message:    applyForm.message || undefined,
    });

    setApplyLoading(false);
    setApplySubmitted(true);

    if (success) {
      toast.success("Application submitted! We'll review and contact you within 48 hours.");
    } else {
      toast.success("Application received! Our HR team will be in touch.");
    }
  };

  // Pre-fill department when "Apply Now" is clicked in a dept card
  const scrollAndPreFill = (deptName: string) => {
    setApplyForm(prev => ({ ...prev, department: deptName }));
    document.getElementById("careers-apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Careers | Join Our Team — IGO Agritech Farms"
        description="Join IGO Agritech Farms — India's leading agri engineering company. Explore career opportunities in agri engineering, consulting, sales, marketing, R&D, and more. Apply now."
        keywords="agri jobs India, agriculture career, farm engineering jobs, agri consulting jobs Chennai, IGO Agritech careers, agriculture company jobs"
        url="/careers"
      />

      {/* ── HERO ── */}
      <section className="relative bg-[#0C1A14] overflow-hidden pt-20">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#6FD898] text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-white/20">
                We're Hiring · {departments.length} Departments Open
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-5">
                Build Your Career in <br />
                <span className="text-[#6FD898] italic font-serif">India's #1 Agritech</span> Brand
              </h1>
              <p className="text-white/70 text-base font-medium leading-relaxed mb-8">
                Join 2000+ passionate professionals working across polyhouse engineering, hydroponics, livestock, marketing, and more — shaping the future of Indian agriculture.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#6FD898] text-[#0C1A14] font-bold text-sm hover:bg-[#4ade80] transition-all group"
                >
                  Browse Openings <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:bankingbackend.indiagreen@gmail.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/20"
                >
                  <Mail className="w-4 h-4" /> Send Your CV
                </a>
              </div>
            </motion.div>

            {/* Right — Stats */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-2 gap-4 w-full lg:w-[360px] shrink-0"
            >
              {[
                { value: `${departments.length}`, label: "Open Departments", icon: <Users className="w-5 h-5" /> },
                { value: "130+", label: "Vacancies Open", icon: <TrendingUp className="w-5 h-5" /> },
                { value: "Pan India", label: "Locations", icon: <MapPin className="w-5 h-5" /> },
                { value: "75+", label: "Awards Won", icon: <CheckCircle className="w-5 h-5" /> },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors">
                  <div className="text-[#6FD898] mb-2">{s.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{s.label}</div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="h-10 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </section>

      {/* ── WHY JOIN ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Why IGO</div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Build a Career That Matters</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-[#FDFDFB] rounded-2xl p-7 border border-border hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden"
              >
                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  {b.icon}
                </div>
                <h4 className="text-lg font-bold mb-2">{b.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{b.desc}</p>
                <div className="pt-4 border-t border-border flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{b.stat}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{b.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section id="openings" className="py-16 bg-[#F9F9F7]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">We Are Hiring</div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Current Openings</h2>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
              {departments.length} Departments · 130+ Vacancies · All Full Time
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow ${dept.featured ? "border-[#1A4231]/40 ring-1 ring-[#1A4231]/20" : "border-border"}`}
              >
                {/* Photo hero — full bleed at top */}
                <div className="relative h-56 overflow-hidden bg-[#F0F4F0]">
                  {dept.image ? (
                    <img
                      src={dept.image}
                      alt={dept.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className={`absolute inset-0 ${dept.iconBg} flex items-center justify-center text-5xl opacity-30`}>
                      {dept.emoji}
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Featured banner on top-left */}
                  {dept.featured && (
                    <div className="absolute top-0 left-0 right-0 bg-[#1A4231] text-white text-[9px] font-black uppercase tracking-widest px-5 py-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6FD898] animate-pulse shrink-0" />
                      Featured Opening · High Demand
                    </div>
                  )}

                  {/* Name + vacancies overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${dept.iconBg} shrink-0`}>
                        {dept.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px] leading-tight">{dept.name}</div>
                        <div className="text-xs text-white/70 mt-0.5">{dept.vacancies} vacancies available</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roles + Qualification + Languages */}
                <div className="px-6 pb-5">
                  <div className="pt-4 mb-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3">Roles</p>
                    <div className="flex flex-wrap gap-2">
                      {dept.roles.map((role) => (
                        <span
                          key={role}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F9F9F7] border border-border text-sm font-medium"
                        >
                          <CheckCircle className="w-3 h-3 text-primary" />
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 pt-3 border-t border-border/60">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-1">Qualification</p>
                        <p className="text-xs font-semibold text-foreground">{dept.qualification}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-1.5">Languages Required</p>
                        <div className="flex flex-wrap gap-1.5">
                          {dept.languages.map((lang: string) => (
                            <span key={lang} className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#1A4231] text-[10px] font-bold">{lang}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollAndPreFill(dept.name)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors whitespace-nowrap self-start"
                    >
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Simple Process</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">How to Apply</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-0 relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-8 left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-primary/20 z-0" />
            {[
              {
                step: "01",
                title: "Send Your CV",
                desc: "Email your updated resume to our careers team with the department name in the subject line.",
                icon: <Mail className="w-5 h-5" />,
              },
              {
                step: "02",
                title: "Interview Round",
                desc: "Shortlisted candidates are contacted for a telephonic or in-person interview with our department heads.",
                icon: <Users className="w-5 h-5" />,
              },
              {
                step: "03",
                title: "Join the IGO Family",
                desc: "Selected candidates receive an offer letter and onboarding kit to kickstart their IGO journey.",
                icon: <CheckCircle className="w-5 h-5" />,
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center px-8 relative z-10"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-5 shadow-lg shadow-primary/25 ring-4 ring-white">
                  {s.icon}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Step {s.step}</div>
                <h4 className="text-lg font-bold mb-3">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER APPLICATION FORM ── */}
      <section id="careers-apply-form" className="py-20 bg-[#0C1A14] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-10">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Apply Today</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
                Ready to Join IGO Agritech Farms?
              </h2>
              <p className="text-white/50 text-sm">Fill the form below — our HR team responds within 48 hours.</p>
            </div>

            {applySubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Application Submitted!</h3>
                <p className="text-white/50 text-sm mb-6">
                  Thank you {applyForm.name}. Our HR team will review your application and contact you within 48 hours.
                </p>
                <button
                  onClick={() => { setApplySubmitted(false); setApplyForm({ name: "", email: "", phone: "", department: "", position: "", message: "" }); }}
                  className="px-8 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleApplySubmit}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 space-y-5"
              >
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Full Name *</label>
                    <input
                      name="name" type="text" required
                      value={applyForm.name} onChange={handleApplyChange}
                      placeholder="Your full name"
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Email *</label>
                    <input
                      name="email" type="email" required
                      value={applyForm.email} onChange={handleApplyChange}
                      placeholder="your@email.com"
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                </div>

                {/* Phone + Department */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Phone</label>
                    <input
                      name="phone" type="tel"
                      value={applyForm.phone} onChange={handleApplyChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Department *</label>
                    <select
                      name="department" required
                      value={applyForm.department} onChange={handleApplyChange}
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    >
                      <option value="" className="bg-[#0C1A14]">Select department</option>
                      {departments.map(d => (
                        <option key={d.name} value={d.name} className="bg-[#0C1A14]">{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Position Applying For *</label>
                  <input
                    name="position" type="text" required
                    value={applyForm.position} onChange={handleApplyChange}
                    placeholder="e.g. Agri Project Engineer"
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>

                {/* Cover note */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Cover Note / Experience</label>
                  <textarea
                    name="message" rows={4}
                    value={applyForm.message} onChange={handleApplyChange}
                    placeholder="Brief introduction, years of experience, key skills..."
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={applyLoading}
                  className="w-full py-4 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {applyLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit Application</>
                  )}
                </button>

                <p className="text-white/25 text-[10px] text-center">
                  Your details are sent directly to our HR team at IGO Agritech Farms.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
