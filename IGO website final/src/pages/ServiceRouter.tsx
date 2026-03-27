import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, TrendingUp } from "lucide-react";
import { navLinks } from "@/data/siteData";
import SEO from "@/components/SEO";

const fader: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const LOCAL_FALLBACK = "/assets/home page image .png";

const getServiceCategory = (categorySlug: string) => {
  const services = navLinks.find(l => l.label === "Services")?.children || [];
  return services.find((s: any) => s.href === `/services/${categorySlug}`) as any | undefined;
};

const getServiceItem = (categorySlug: string, serviceSlug: string) => {
  const cat = getServiceCategory(categorySlug);
  if (!cat) return undefined;
  return cat.children?.find((c: any) => c.href === `/services/${categorySlug}/${serviceSlug}`) as any | undefined;
};

// ─── Category View ────────────────────────────────────────────────────────────
const CategoryView: React.FC<{ categorySlug: string }> = ({ categorySlug }) => {
  const cat = getServiceCategory(categorySlug);
  if (!cat) return <Navigate to="/services" />;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.igoagritechfarms.com/services" },
      { "@type": "ListItem", "position": 3, "name": cat.label, "item": `https://www.igoagritechfarms.com/services/${categorySlug}` }
    ]
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title={`${cat.label} Services`}
        description={`Professional ${cat.label} services by IGO Agritech Farms. Expert agricultural engineering and consulting with ${cat.children?.length || 0} specialised services across India.`}
        keywords={`${cat.label}, agricultural services, IGO Agritech Farms, farming services India`}
        url={`/services/${categorySlug}`}
        image={cat.cardImage || undefined}
        jsonLd={breadcrumb}
      />
      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={cat.cardImage || LOCAL_FALLBACK}
            alt={cat.label}
            className="w-full h-full object-cover"
            onError={e => { (e.currentTarget as HTMLImageElement).src = LOCAL_FALLBACK; }}
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#C5A03F] font-bold text-xs uppercase tracking-widest mb-14 hover:opacity-60 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-4xl"
          >
            <motion.div variants={fader} className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#C5A03F]/60" />
              <span className="text-[#C5A03F] font-bold text-xs uppercase tracking-[0.3em]">
                {cat.children?.length || 0} Services Available
              </span>
            </motion.div>
            <motion.h1
              variants={fader}
              className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.95]"
            >
              {cat.label}
            </motion.h1>
            <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
              Professional agricultural services under {cat.label}. IGO delivers turnkey precision and deep domain expertise across every discipline.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cat.children?.map((service: any, i: number) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={service.href} className="group block h-full">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden relative mb-8 shadow-lg shadow-black/5 border border-black/5">
                  <img
                    src={service.image || LOCAL_FALLBACK}
                    alt={service.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    onError={e => { (e.currentTarget as HTMLImageElement).src = LOCAL_FALLBACK; }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                    <ArrowRight className="w-5 h-5 text-[#1A4231]" />
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                    <div className="w-6 h-[1px] bg-[#C5A03F]" />
                    <span className="text-[10px] text-[#C5A03F] font-bold uppercase tracking-widest">Explore Service</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] group-hover:text-[#1A4231] transition-colors leading-[1.1]">
                    {service.label}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-[#1A4231] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Need a Custom Solution?</h2>
          <p className="text-white/60 text-lg font-light mb-10 max-w-xl mx-auto">
            Our engineering team will assess your site and build a tailored implementation plan.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#C5A03F] text-white text-xs font-bold rounded-full hover:bg-white hover:text-[#1A4231] transition-all uppercase tracking-widest shadow-xl shadow-black/20"
          >
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// ─── Detail View ──────────────────────────────────────────────────────────────
const DetailView: React.FC<{ categorySlug: string; serviceSlug: string }> = ({ categorySlug, serviceSlug }) => {
  const cat = getServiceCategory(categorySlug);
  const service = getServiceItem(categorySlug, serviceSlug);

  if (!service || !cat) return <Navigate to={`/services/${categorySlug}`} />;

  const serviceImage = service.image || LOCAL_FALLBACK;

  const serviceBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.igoagritechfarms.com/services" },
      { "@type": "ListItem", "position": 3, "name": cat.label, "item": `https://www.igoagritechfarms.com/services/${categorySlug}` },
      { "@type": "ListItem", "position": 4, "name": service.label, "item": `https://www.igoagritechfarms.com/services/${categorySlug}/${serviceSlug}` }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.label,
    "description": `IGO Agritech Farms delivers professional ${service.label} services with industrial-grade expertise and complete turnkey implementation.`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "IGO Agritech Farms",
      "url": "https://www.igoagritechfarms.com"
    },
    "areaServed": "India",
    "serviceType": cat.label,
    "image": serviceImage.startsWith("/") ? `https://www.igoagritechfarms.com${serviceImage}` : serviceImage
  };

  const deliverables = [
    { title: "Project Report", desc: "Detailed technical & financial feasibility study." },
    { title: "Design Layout", desc: "Professional architectural and structural blueprints." },
    { title: "Setup Support", desc: "End-to-end installation by expert engineering teams." },
    { title: "Training", desc: "Staff training on modern agricultural techniques." }
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231] pt-32">
      <SEO
        title={service.label}
        description={`IGO Agritech Farms delivers professional ${service.label} with industrial-grade expertise. Turnkey implementation, site survey, training, and AMC support across India.`}
        keywords={`${service.label}, ${cat.label}, agricultural service India, IGO Agritech Farms`}
        url={`/services/${categorySlug}/${serviceSlug}`}
        image={serviceImage.startsWith("/") ? serviceImage : undefined}
        jsonLd={{ "@context": "https://schema.org", "@graph": [serviceBreadcrumb, serviceSchema] }}
      />
      <section className="pb-32 container mx-auto px-6">
        <Link
          to={`/services/${categorySlug}`}
          className="inline-flex items-center gap-2 text-[#C5A03F] font-bold text-xs uppercase tracking-widest mb-12 hover:opacity-60 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {cat.label}
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <motion.div variants={fader} className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#C5A03F]" />
                <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">Expert Service Execution</p>
              </motion.div>
              <motion.h1 variants={fader} className="text-5xl md:text-8xl leading-[0.9] font-serif tracking-tight text-[#1A1A1A]">
                {service.label}
              </motion.h1>
            </div>

            <motion.p variants={fader} className="text-black/60 text-lg md:text-xl leading-relaxed max-w-lg font-light">
              IGO Agritech Farms delivers industrial-grade expertise for <strong>{service.label}</strong>. Our professional implementation combines technical precision with deep agricultural knowledge to ensure maximum efficiency and sustainability.
            </motion.p>

            <motion.div variants={fader} className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/contact"
                className="px-10 py-5 bg-[#1A4231] text-white text-[10px] font-bold rounded-full hover:bg-black transition-all uppercase tracking-[0.2em] inline-flex items-center gap-3 shadow-lg shadow-[#1A4231]/20"
              >
                Enquire Service <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-4 px-6 border-l border-black/10">
                <div>
                  <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold">Advisory</p>
                  <p className="text-sm font-serif text-black/80">Professional Consulting</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-4 bg-[#C5A03F]/5 rounded-[40px] blur-2xl group-hover:bg-[#C5A03F]/10 transition-colors" />
            <div className="rounded-[32px] overflow-hidden aspect-[4/5] shadow-2xl relative border border-black/5">
              <img
                src={serviceImage}
                alt={service.label}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={e => { (e.currentTarget as HTMLImageElement).src = LOCAL_FALLBACK; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 border-t border-black/5 pt-32"
        >
          <div className="flex items-center gap-4 text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em] mb-16">
            <div className="w-12 h-[1px] bg-[#C5A03F]" />
            SERVICE DELIVERABLES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="p-10 bg-[#FDFDFD] rounded-[2.5rem] border border-black/[0.03] hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-full bg-[#C5A03F]/10 flex items-center justify-center text-[#C5A03F] mb-8">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h5 className="text-2xl font-serif text-black mb-3">{item.title}</h5>
                <p className="text-black/40 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-40 bg-[#0A0A0A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[#1A4231]/10 blur-[120px] rounded-full translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <p className="text-[#C5A03F] font-bold text-xs uppercase tracking-[0.4em] mb-8">Standard of Excellence</p>
              <h2 className="text-5xl md:text-6xl font-serif mb-12 leading-tight">
                Professional <br />Turnkey Implementation
              </h2>
              <div className="space-y-12">
                {[
                  { title: "Strategic Analysis", desc: "Rigorous feasibility assessment and site-specific engineering design." },
                  { title: "Expert Installation", desc: "Professional on-site execution using institutional-grade materials and precision tech." },
                  { title: "Operational Excellence", desc: "Comprehensive handover with expert training and long-term maintenance support." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-6xl font-serif text-white/5 group-hover:text-[#C5A03F]/20 transition-colors">{i + 1}</div>
                    <div className="pt-2">
                      <h4 className="text-2xl font-serif text-white mb-3">{step.title}</h4>
                      <p className="text-white/40 leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#C5A03F]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#C5A03F]" />
                  </div>
                  <p className="text-sm font-light text-white/60 leading-relaxed">Institutional-grade safety & performance standards</p>
                </div>
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-[#1A4231] to-[#0D2118] p-8 flex flex-col justify-end">
                  <p className="text-3xl font-serif text-white mb-2">Efficiency</p>
                  <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Maximum Output Focus</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-700">
                  <img src={serviceImage} className="w-full h-full object-cover" alt={service.label} />
                </div>
                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#C5A03F]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#C5A03F]" />
                  </div>
                  <p className="text-sm font-light text-white/60 leading-relaxed">Scalable solutions for commercial growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Router ───────────────────────────────────────────────────────────────────
const ServiceRouter: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, subcategory]);

  if (!category) return <Navigate to="/services" />;
  if (!subcategory) return <CategoryView categorySlug={category} />;
  return <DetailView categorySlug={category} serviceSlug={subcategory} />;
};

export default ServiceRouter;
