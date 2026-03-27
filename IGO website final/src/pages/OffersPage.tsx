import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { Clock, MessageCircle, Phone, Award, Users, Briefcase, Star } from "lucide-react";
import { getActiveOffers, OfferPoster } from "@/data/offersData";
import OffersBanner from "@/components/OffersBanner";

/* ─── Live countdown (reused from banner) ───────────────────── */
const useCountdown = (expiryDate: string | null) => {
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!expiryDate) { setLabel(""); return; }
    const tick = () => {
      const diff = new Date(expiryDate).getTime() - Date.now();
      if (diff <= 0) { setLabel("Offer ended"); return; }
      const d = Math.floor(diff / 86_400_000);
      const h = Math.floor((diff % 86_400_000) / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      setLabel(`${d}d ${h}h ${m}m`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [expiryDate]);
  return label;
};

const BADGE_COLOR: Record<string, string> = {
  "HOT DEAL":  "bg-red-500",
  "NEW":        "bg-blue-500",
  "LIMITED":    "bg-orange-500",
  "SPECIAL":    "bg-purple-500",
  "SEASONAL":   "bg-teal-500",
  "FLASH SALE": "bg-yellow-400 text-black",
};

/* ─── Single offer card ─────────────────────────────────────── */
const OfferCard = ({ poster, delay }: { poster: OfferPoster; delay: number }) => {
  const countdown = useCountdown(poster.expiryDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {poster.image ? (
          <img
            src={poster.image}
            alt={poster.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full" style={{ background: poster.bgColor || "#0a3d0a" }} />
        )}
        {poster.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-white shadow ${BADGE_COLOR[poster.badge] || "bg-primary"}`}>
            {poster.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-[#1A1A1A] font-black text-lg leading-snug mb-1.5">{poster.title}</h3>
        {poster.subtitle && (
          <p className="text-gray-500 text-sm leading-relaxed mb-3">{poster.subtitle}</p>
        )}
        {countdown && (
          <div className="flex items-center gap-1.5 text-orange-500 text-xs font-bold mb-3">
            <Clock className="w-3.5 h-3.5" />
            Expires in: {countdown}
          </div>
        )}
        <Link
          to={poster.ctaLink || "/contact"}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F4529] text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-primary transition-all duration-300"
        >
          {poster.ctaLabel || "Enquire Now"}
        </Link>
      </div>
    </motion.div>
  );
};

/* ─── Trust badges ───────────────────────────────────────────── */
const TRUST = [
  { icon: Award,    label: "75+ Winning Awards" },
  { icon: Users,    label: "2,000+ Team Members" },
  { icon: Briefcase, label: "1,000+ Projects Done" },
  { icon: Star,     label: "15+ Years Excellence" },
];

/* ─── Main page ─────────────────────────────────────────────── */
const OffersPage = () => {
  const [posters, setPosters] = useState<OfferPoster[]>([]);

  useEffect(() => {
    setPosters(getActiveOffers());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Latest Offers & Schemes"
        description="Exclusive offers and agricultural schemes from IGO Agritech Farms. Limited-time discounts on polyhouse setup, hydroponic systems, farm equipment, and consulting services."
        keywords="IGO Agritech Farms offers, polyhouse discount, hydroponic offer, agricultural scheme India"
        url="/offers"
      />

      {/* ── Hero banner carousel ── */}
      <OffersBanner />

      {/* ── Page header ── */}
      <div className="container mx-auto px-6 pt-16 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">
            <div className="w-10 h-[1px] bg-[#C5A03F]" />
            Current Promotions
            <div className="w-10 h-[1px] bg-[#C5A03F]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight mb-4">
            Current Offers &amp; Deals
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Exclusive deals on IGO Agritech farm setups, consulting packages and agri products.
            Limited time — contact us to avail.
          </p>
        </motion.div>
      </div>

      {/* ── Offers grid ── */}
      <section className="container mx-auto px-6 py-14">
        {posters.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold mb-2">No active offers right now.</p>
            <p className="text-sm">Check back soon for exciting deals!</p>
            <Link to="/contact" className="inline-block mt-6 px-8 py-3 bg-[#1F4529] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-primary transition-all">
              Contact Us for Custom Quotes
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posters.map((p, i) => (
              <OfferCard key={p.id} poster={p} delay={i * 0.07} />
            ))}
          </div>
        )}
      </section>

      {/* ── Trust section ── */}
      <section className="bg-[#F4F8F4] border-y border-[#e0ede0] py-12">
        <div className="container mx-auto px-6">
          <p className="text-center text-[#1F4529]/60 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Why Choose IGO Agritech Farms
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#1F4529]" />
                </div>
                <p className="text-[#1A1A1A] font-bold text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Enquire section ── */}
      <section className="bg-[#1F4529] py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-8">
              Contact our team to avail any of these offers or to discuss a custom package tailored to your farm's needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/917397789803"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-black uppercase tracking-widest text-xs rounded-full hover:opacity-90 transition-opacity shadow-xl"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href="tel:+917397789803"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#1F4529] font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/90 transition-all shadow-xl"
              >
                <Phone className="w-4 h-4" />
                +91 73977 89803
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-black uppercase tracking-widest text-xs rounded-full hover:border-white hover:bg-white/10 transition-all"
              >
                Send Enquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default OffersPage;
