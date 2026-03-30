import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, CheckCircle2 } from "lucide-react";
import { indiaPresence } from "@/data/siteData";

// ─── Coordinate System ────────────────────────────────────────────────────────
const GEO = {
  IMG_W: 2760, IMG_H: 1504,
  MAP_LEFT: 1024, MAP_TOP: 356,
  MAP_W: 1734, MAP_H: 1144,
  LON_MIN: 68, LON_MAX: 97,
  LAT_MIN: 8,  LAT_MAX: 37,
} as const;

function geo(lon: number, lat: number): { cx: number; cy: number } {
  const cx = GEO.MAP_LEFT + ((lon - GEO.LON_MIN) / (GEO.LON_MAX - GEO.LON_MIN)) * GEO.MAP_W;
  const cy = GEO.MAP_TOP  + ((GEO.LAT_MAX - lat) / (GEO.LAT_MAX - GEO.LAT_MIN)) * GEO.MAP_H;
  return { cx: Math.round(cx), cy: Math.round(cy) };
}

// ─── Pin Dataset ──────────────────────────────────────────────────────────────
const PINS = [
  { name: "Jammu & Kashmir",   lon: 76.0, lat: 34.0, isHub: false },
  { name: "Punjab",            lon: 75.3, lat: 31.1, isHub: false },
  { name: "Delhi / NCR",       lon: 77.1, lat: 28.7, isHub: true  },
  { name: "Rajasthan",         lon: 73.9, lat: 27.0, isHub: false },
  { name: "Uttar Pradesh",     lon: 80.9, lat: 26.8, isHub: true  },
  { name: "Bihar",             lon: 85.3, lat: 25.1, isHub: false },
  { name: "West Bengal",       lon: 87.9, lat: 23.0, isHub: false },
  { name: "Assam & NE States", lon: 92.9, lat: 26.2, isHub: false },
  { name: "Gujarat",           lon: 71.5, lat: 22.3, isHub: false },
  { name: "Madhya Pradesh",    lon: 78.6, lat: 23.5, isHub: false },
  { name: "Chhattisgarh",      lon: 81.9, lat: 21.3, isHub: false },
  { name: "Odisha",            lon: 85.1, lat: 20.4, isHub: false },
  { name: "Maharashtra",       lon: 75.7, lat: 19.7, isHub: true  },
  { name: "Telangana",         lon: 79.5, lat: 18.0, isHub: false },
  { name: "Andhra Pradesh",    lon: 79.7, lat: 15.9, isHub: true  },
  { name: "Karnataka",         lon: 75.7, lat: 15.3, isHub: true  },
  { name: "Tamil Nadu",        lon: 78.7, lat: 11.1, isHub: true  },
  { name: "Kerala",            lon: 76.5, lat: 10.4, isHub: false },
].map((p) => ({ ...p, ...geo(p.lon, p.lat) }));

const HUB  = "#b87333";
const BASE = "#1e4d35";

interface PinProps {
  cx: number; cy: number; isHub: boolean; name: string;
  isActive: boolean; onEnter: () => void; onLeave: () => void;
}

const MapPin = ({ cx, cy, isHub, name, isActive, onEnter, onLeave }: PinProps) => {
  const fill = isHub ? HUB : BASE;
  const r    = isHub ? 16 : 11;
  const tip  = cy + r * 1.5;
  const tw   = Math.max(name.length * 8 + 24, 100);

  return (
    <g
      className="cursor-pointer group/pin"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      style={{ pointerEvents: "all" }}
    >
      {isHub && (
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={HUB} strokeWidth="2" opacity="0.6">
          <animate attributeName="r" values={`${r};${r+22};${r}`} dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="2;0.5;2" dur="3s" repeatCount="indefinite" />
        </circle>
      )}

      <circle cx={cx} cy={cy + 4} r={r} fill="black" opacity="0.15" filter="blur(4px)" />

      <defs>
        <radialGradient id={`grad-${name.replace(/\s+/g, "")}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke="#fff" strokeWidth="2.5" className="transition-transform duration-300 group-hover/pin:scale-110" />
      <circle cx={cx} cy={cy} r={r * 0.38} fill="#fff" />
      <circle cx={cx} cy={cy} r={r} fill={`url(#grad-${name.replace(/\s+/g, "")})`} pointerEvents="none" />
      <polygon points={`${cx-4},${cy+r-1.5} ${cx+4},${cy+r-1.5} ${cx},${tip}`} fill={fill} className="transition-transform duration-300 group-hover/pin:scale-110" />

      <AnimatePresence>
        {isActive && (
          <motion.g
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <polygon points={`${cx-6},${cy-r-3} ${cx+6},${cy-r-3} ${cx},${cy-r+5}`} fill={BASE} />
            <rect
              x={cx - tw/2} y={cy - r - (isHub ? 52 : 38)}
              width={tw} height={isHub ? 46 : 32}
              rx="10" fill={BASE} stroke={HUB} strokeWidth="1.5"
              className="shadow-xl"
            />
            <text
              x={cx} y={cy - r - (isHub ? 52 : 38) + (isHub ? 19 : 21)}
              textAnchor="middle" fill="#fff"
              fontSize="14" fontWeight="700"
              fontFamily="Outfit,Inter,sans-serif"
              letterSpacing="-0.01em"
            >
              {name}
            </text>
            {isHub && (
              <text
                x={cx} y={cy - r - (isHub ? 52 : 38) + 36}
                textAnchor="middle" fill={HUB}
                fontSize="11" fontWeight="800"
                fontFamily="Outfit,Inter,sans-serif"
                style={{ textTransform: "uppercase" }}
                letterSpacing="0.05em"
              >
                Regional Hub
              </text>
            )}
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
};

const IndiaPresence = () => {
  const [activePin, setActivePin] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.01] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-agri-green-900/[0.03] rounded-full blur-[12rem] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">

          {/* ──────── LEFT: Map Visualization ──────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group/map lg:sticky lg:top-40"
          >
            {/* Map Frame — Premium Aesthetic */}
            <div
              className="relative w-full rounded-[4.5rem] border-[14px] border-white shadow-[0_60px_120px_-30px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-1000 group-hover/map:shadow-[0_90px_180px_-40px_rgba(25,60,30,0.22)]"
              style={{ background: "#fdfaf5" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-agri-earth-900/10 via-transparent to-white/40 pointer-events-none z-10" />

              <div className="relative w-full overflow-hidden bg-[#faf7f2]" style={{ paddingBottom: "54.49%" }}>
                <img
                  src="/assets/home%20page%20map%20.png"
                  alt="IGO India Presence Map"
                  className="absolute inset-0 w-full h-full object-fill opacity-95 transition-transform duration-[2s] group-hover/map:scale-[1.05]"
                />

                <svg
                  viewBox={`0 0 ${GEO.IMG_W} ${GEO.IMG_H}`}
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                  style={{ overflow: "visible", zIndex: 30 }}
                >
                  {PINS.map((pin) => (
                    <MapPin
                      key={pin.name}
                      cx={pin.cx} cy={pin.cy}
                      isHub={pin.isHub} name={pin.name}
                      isActive={activePin === pin.name}
                      onEnter={() => setActivePin(pin.name)}
                      onLeave={() => setActivePin(null)}
                    />
                  ))}
                </svg>
              </div>

              {/* Float Glass UI */}
              <AnimatePresence mode="wait">
                {activePin && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, y: 0, backdropFilter: "blur(24px)" }}
                    exit={{ opacity: 0, y: 20, backdropFilter: "blur(0px)" }}
                    className="absolute top-16 left-1/2 -translate-x-1/2 px-12 py-5 rounded-[2.5rem] text-[12px] font-black tracking-[0.4em] text-white shadow-2xl z-[60] border border-white/30 uppercase text-center"
                    style={{ background: "rgba(25, 60, 30, 0.82)" }}
                  >
                    SELECTING <span className="text-agri-gold-400 ml-4 font-black">{activePin}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Premium Badge System */}
            <motion.div 
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 90 }}
              className="absolute -bottom-12 -right-6 md:-bottom-20 md:-right-16 bg-agri-earth-900/98 backdrop-blur-3xl p-12 rounded-[4rem] shadow-[0_60px_120px_-25px_rgba(0,0,0,0.8)] border border-white/15 max-w-[360px] z-[70] group/badge transition-all duration-700 hover:-translate-y-4 hover:rotate-1"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-agri-gold-500/80 to-transparent" />
              
              <div className="flex items-center gap-8 mb-8">
                <div className="w-20 h-20 rounded-[2rem] bg-agri-gold-500/15 border border-agri-gold-500/40 flex items-center justify-center relative overflow-hidden transition-all duration-1000 group-hover/badge:rotate-[20deg] group-hover/badge:scale-110">
                  <div className="absolute inset-0 bg-agri-gold-500/20 scale-0 group-hover/badge:scale-150 transition-transform duration-1000 rounded-full" />
                  <Globe className="w-10 h-10 text-agri-gold-500 relative z-10" />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white leading-none tracking-tighter">Pan-India</h4>
                  <span className="text-[11px] font-bold text-agri-gold-500 uppercase tracking-[0.3em] mt-3 block">Network Reach</span>
                </div>
              </div>
              <p className="text-[15px] text-white/70 leading-relaxed font-semibold">
                Spearheading high-yield projects across <span className="text-agri-gold-400 font-black underline decoration-agri-gold-500/40 underline-offset-8">28+ States</span> with a verified force of <span className="text-white font-black italic">2,000+ engineers</span>.
              </p>
            </motion.div>
          </motion.div>

          {/* ──────── RIGHT: Content & Stats ──────── */}
          <div className="pl-0 xl:pl-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-20"
            >
              <div className="flex items-center gap-6 text-agri-gold-600 font-black text-[12px] uppercase tracking-[0.6em] mb-12">
                <div className="w-20 h-px bg-agri-gold-500/50" />
                GLOBAL FOOTPRINT
              </div>
              <h2 className="text-7xl md:text-9xl font-serif text-agri-earth-900 leading-[0.9] mb-12 tracking-tighter">
                Cultivating <br />
                <span className="italic text-agri-green-800 font-light drop-shadow-sm">Bharat's Vision.</span>
              </h2>
              <p className="text-2xl text-agri-earth-900/65 font-medium max-w-2xl leading-[1.6]">
                From climate-controlled engineering in the North to precision aquaculture in the South,
                IGO is driving India's agricultural sovereignty with <span className="text-agri-green-800 underline decoration-agri-gold-500/40 underline-offset-[12px] font-black">industrial-grade engineering</span>.
              </p>
            </motion.div>

            {/* Grid Redesign */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {indiaPresence.stats.slice(0, 4).map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1, 
                    delay: idx * 0.15,
                    type: "spring",
                    stiffness: 70
                  }}
                  whileHover={{ y: -15, scale: 1.03 }}
                  className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-agri-earth-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_-20px_rgba(25,60,30,0.12)] transition-all duration-700 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-agri-earth-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-agri-gold-600 mb-2">
                       {stat.sublabel}
                    </div>
                    <div className="text-5xl md:text-6xl font-black text-agri-earth-900 mb-2 group-hover:text-agri-green-800 transition-all duration-500 tracking-tighter leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-agri-earth-900/35 group-hover:text-agri-earth-900/80 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Indian Partner Cluster Redesign */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
              className="mt-20 flex flex-col md:flex-row items-center gap-12 p-12 bg-agri-earth-900/5 backdrop-blur-3xl rounded-[4rem] border border-black/[0.04] shadow-inner"
            >
              <div className="flex -space-x-7">
                {[52, 53, 54, 55, 56].map((i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10, zIndex: 100, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-20 h-20 rounded-full border-[6px] border-white bg-agri-earth-100 overflow-hidden shadow-2xl cursor-pointer relative"
                  >
                    {/* Using high-quality avatars that fit the Indian context better */}
                    <img 
                      src={`https://i.pravatar.cc/150?u=indian-${i}`} 
                      alt="Partner" 
                      className="w-full h-full object-cover filter contrast-[1.05]" 
                    />
                  </motion.div>
                ))}
                <div className="w-20 h-20 rounded-full border-[6px] border-white bg-agri-green-900 flex items-center justify-center text-[15px] text-white font-black shadow-2xl relative z-20">
                  +15K
                </div>
              </div>
              <div className="text-lg md:text-xl font-bold text-agri-earth-900/75 leading-relaxed text-center md:text-left">
                Join <span className="text-agri-green-800 font-black px-4 py-1.5 bg-agri-green-900/10 rounded-xl text-3xl mx-1 shadow-sm">15,000+</span> global stakeholders
                <br className="hidden md:block" /> who trust IGO's high-performance <span className="text-agri-earth-900 font-black decoration-agri-gold-500/60 underline underline-offset-8">scientific engineering</span>.
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndiaPresence;
