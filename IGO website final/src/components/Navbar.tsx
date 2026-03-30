import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, companyInfo } from "@/data/siteData";
import { motion, AnimatePresence, LayoutGroup, Variants, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, Globe } from "lucide-react";

// Animation Variants
const dropdownVars: Variants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    scale: 0.98,
    transition: { duration: 0.2 }
  }
};

const HUB  = "#b87333";

// Helper components for the Mega Menu
const MegaMenu = ({ link }: { link: any }) => {
  const [activeSector, setActiveSector] = useState(link.children[0]?.label);
  const currentSector = link.children.find((child: any) => child.label === activeSector);

  return (
    <motion.div 
      variants={dropdownVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute top-full left-0 right-0 pt-6 cursor-default"
    >
      <div className="bg-white/95 border border-black/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[3.5rem] overflow-hidden flex h-[600px] w-full max-w-7xl mx-auto backdrop-blur-3xl ring-1 ring-white/20">
        {/* Level 2: Sectors Sidebar */}
        <div className="w-[420px] bg-agri-earth-50/50 border-r border-black/[0.05] p-10 flex flex-col gap-3 shrink-0">
          <div className="text-[11px] uppercase tracking-[0.4em] font-black text-agri-earth-900/30 mb-6 px-4">DEPARTMENTS</div>
          {link.children.map((sector: any) => (
            <Link
              key={sector.label}
              to={sector.href}
              onMouseEnter={() => setActiveSector(sector.label)}
              className={`flex items-center gap-6 px-6 py-5 rounded-[2rem] transition-all duration-300 text-left relative group ${
                activeSector === sector.label 
                  ? "text-agri-green-900 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)]" 
                  : "text-agri-earth-900/60 hover:text-agri-earth-900 hover:bg-white/50"
              }`}
            >
              {activeSector === sector.label && (
                <motion.div 
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white rounded-[2rem] shadow-sm ring-1 ring-black/5"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                />
              )}
              <div className={`relative z-10 w-14 h-14 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center border border-black/5 shadow-sm bg-white transition-all duration-500 ${activeSector === sector.label ? "scale-110 shadow-lg ring-4 ring-agri-green-900/5 rotate-3" : "group-hover:scale-110 group-hover:-rotate-3"}`}>
                {sector.icon && typeof sector.icon === 'string' && sector.icon.startsWith('/') ? (
                  <img src={sector.icon} alt={sector.label} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl drop-shadow-sm">{sector.icon}</span>
                )}
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <span className={`text-[17px] tracking-tighter leading-tight transition-colors ${activeSector === sector.label ? "text-agri-green-900 font-black" : "text-agri-earth-700 font-bold"}`}>{sector.label}</span>
                <span className="text-[10px] uppercase tracking-widest text-agri-earth-900/40 font-black">Explore Vertical</span>
              </div>
              <ChevronRight className={`relative z-10 ml-auto w-5 h-5 transition-all opacity-0 ${activeSector === sector.label ? "opacity-100 text-agri-green-900 translate-x-0" : "-translate-x-2 group-hover:opacity-40"}`} />
            </Link>
          ))}
        </div>

        {/* Level 3 & 4: Sub-sectors and Projects */}
        <div className="flex-1 p-16 overflow-y-auto bg-white/40 custom-scrollbar w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-end justify-between mb-12 pb-8 border-b border-black/5">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-white flex items-center justify-center p-1 shrink-0 rotate-3 transition-transform hover:rotate-0 duration-500">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-agri-earth-50">
                      {currentSector.icon && typeof currentSector.icon === 'string' && currentSector.icon.startsWith('/') ? (
                        <img src={currentSector.icon} alt={currentSector.label} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">{currentSector.icon}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-black tracking-tighter text-agri-earth-900">
                      {currentSector.label}
                    </h3>
                    <p className="text-base text-agri-earth-900/50 font-medium">Precision engineering for industrial scale excellence.</p>
                  </div>
                </div>
                <Link 
                  to={currentSector.href}
                  className="flex items-center gap-3 text-xs font-black text-agri-green-900 hover:gap-5 transition-all uppercase tracking-[0.2em] bg-agri-green-900/5 px-8 py-4 rounded-full border border-agri-green-900/10"
                >
                  View Details <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-12">
                {currentSector.children?.map((subSector: any) => (
                  <div key={subSector.label} className="flex flex-col gap-6 group/item">
                    {subSector.children ? (
                      <>
                        <Link 
                          to={subSector.href}
                          className="flex items-center gap-4 text-[16px] font-black text-agri-earth-900 border-b-2 border-transparent hover:border-agri-green-900/20 pb-4 mb-2 w-full hover:text-agri-green-900 transition-all group/sub"
                        >
                          {subSector.icon ? (
                            <div className="w-10 h-10 rounded-xl bg-agri-earth-50 border border-black/5 flex items-center justify-center text-agri-green-900 shadow-sm shrink-0 overflow-hidden group-hover/sub:scale-110 transition-transform">
                              {typeof subSector.icon === 'string' && subSector.icon.startsWith('/') ? (
                                <img src={subSector.icon} loading="lazy" className="w-full h-full object-cover" alt="" />
                              ) : typeof subSector.icon === 'string' ? (
                                <span className="text-xl">{subSector.icon}</span>
                              ) : (
                                <subSector.icon className="w-5 h-5" strokeWidth={2.5} />
                              )}
                            </div>
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-agri-green-900/40 shrink-0" />
                          )}
                          <span className="tracking-tight">{subSector.label}</span>
                        </Link>
                        
                        <div className="flex flex-col gap-3 pl-14">
                          {subSector.children.map((project: any) => (
                            <Link
                              key={project.label}
                              to={project.href}
                              className="text-[14px] font-bold text-agri-earth-900/50 hover:text-agri-green-900 transition-all flex items-center gap-3 group/project"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-agri-earth-200 group-hover/project:bg-agri-green-900 group-hover/project:scale-125 transition-all" />
                              <span className="group-hover/project:translate-x-1 transition-transform">{project.label}</span>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={subSector.href}
                        className="flex items-center gap-5 bg-white/50 hover:bg-white border border-black/5 hover:border-agri-green-900/20 rounded-[2.5rem] p-6 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1"
                      >
                         <div className="w-16 h-16 rounded-2xl bg-agri-earth-50 border border-black/5 flex items-center justify-center text-agri-earth-900/40 group-hover/item:text-agri-green-900 shadow-inner shrink-0 transition-all overflow-hidden">
                            {(subSector.icon || subSector.image) && typeof (subSector.icon || subSector.image) === 'string' && (subSector.icon || subSector.image).startsWith('/') ? (
                              <img src={subSector.icon || subSector.image} loading="lazy" className="w-full h-full object-cover group-hover/item:scale-125 transition-transform duration-700" alt="" />
                            ) : typeof subSector.icon === 'string' ? (
                              <span className="text-3xl">{subSector.icon}</span>
                            ) : subSector.icon ? (
                              <subSector.icon className="w-8 h-8" strokeWidth={1.5} />
                            ) : (
                              <Globe className="w-8 h-8 opacity-20" />
                            )}
                         </div>
                         <div className="flex flex-col gap-1 pr-2">
                           <span className="text-[16px] font-black text-agri-earth-900 group-hover/item:text-agri-green-900 transition-colors tracking-tighter">
                             {subSector.label}
                           </span>
                           <span className="text-[10px] text-agri-earth-900/30 font-black uppercase tracking-[0.2em]">
                             EXPLORE PORTFOLIO
                           </span>
                         </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };
  
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  if (isAdmin) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled 
          ? "py-4 bg-white/80 backdrop-blur-3xl border-b border-black/[0.03] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]" 
          : "py-8 bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div className="absolute top-0 left-0 right-0 h-[3px] bg-agri-gold-500 origin-left z-[110]" style={{ scaleX }} />

      <div className="container mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-6 group relative z-[120]">
          <div className="relative">
            <div className="absolute inset-0 bg-agri-green-900/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src={companyInfo.logo} 
              alt="IGO Logo" 
              loading="eager" 
              className={`h-24 md:h-28 w-auto relative z-10 transition-all duration-700 mix-blend-multiply group-hover:scale-110 group-hover:drop-shadow-2xl`} 
            />
          </div>
          <div className="flex flex-col mt-2">
            <span className={`text-3xl font-black tracking-tighter uppercase font-display whitespace-nowrap text-agri-earth-900`}>
              IGO <span className="text-agri-green-800">Agritech</span>
            </span>
            <span className="text-[10px] font-bold text-agri-gold-600 tracking-[0.4em] uppercase -mt-1 scale-90 origin-left">
              India's Vision. Global Impact.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-12 ml-auto">
          <LayoutGroup>
            {navLinks.map((link) => {
              const isMega = link.label === "Projects" || link.label === "Services" || link.label === "Products";
              const isActive = openDropdown === link.label;
              
              return (
                <div 
                  key={link.label}
                  className={isMega ? "static" : "relative"}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={link.href}
                    className={`text-[15px] font-black tracking-tight whitespace-nowrap transition-all py-4 flex items-center gap-2 group/nav ${
                      isActive ? "text-agri-green-800" : "text-agri-earth-900/70 hover:text-agri-earth-900"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown className={`w-4 h-4 transition-all duration-500 ${
                        isActive ? "rotate-180 text-agri-green-800" : "opacity-30 group-hover/nav:opacity-100 group-hover/nav:translate-y-0.5"
                      }`} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {isActive && link.children && (
                      <div className={isMega ? "" : "absolute top-full left-1/2 -translate-x-1/2 pt-6"}>
                        {isMega ? (
                          <MegaMenu link={link} />
                        ) : (
                          <motion.div 
                            variants={dropdownVars}
                            initial="initial" animate="animate" exit="exit"
                            className="bg-white/95 border border-black/10 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-4 w-72 backdrop-blur-2xl ring-1 ring-white/20"
                          >
                            {link.children.map((child: any) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-agri-green-900/5 transition-all group/item"
                              >
                                <div className="flex flex-col gap-1">
                                  <span className="text-[14px] font-bold text-agri-earth-900 group-hover/item:text-agri-green-800 transition-colors">{child.label}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-40 transition-all -translate-x-3 group-hover/item:translate-x-0" />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </LayoutGroup>
          
          <Link
            to="/agri-startup-platform"
            className="group relative px-8 py-4 bg-agri-earth-900 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-agri-green-900/20 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-agri-green-800 to-agri-green-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 text-[13px] font-black text-white uppercase tracking-[0.25em] flex items-center gap-3">
              AgriStartup Gateway
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-agri-gold-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`xl:hidden p-4 z-[120] rounded-2xl bg-agri-earth-900/5 hover:bg-agri-earth-900/10 transition-all text-agri-earth-900`}
        >
          {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu — Premium Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col p-10 pt-40 overflow-y-auto"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-agri-green-900/5 rounded-full blur-[8rem] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-black tracking-[0.5em] text-agri-earth-900/20 mb-6 uppercase">Navigation Menu</span>
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-black/5 py-6">
                   <Link to={link.href} className="text-4xl font-black tracking-tighter text-agri-earth-900 hover:text-agri-green-900 transition-colors flex items-center justify-between group">
                     {link.label}
                     <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                   </Link>
                </div>
              ))}
              
              <div className="mt-16 group">
                <Link 
                   to="/agri-startup-platform" 
                   className="flex items-center justify-between p-10 bg-agri-earth-900 text-white rounded-[3rem] font-black text-2xl shadow-2xl transition-all hover:bg-agri-green-900 hover:-translate-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-black tracking-[0.3em] opacity-40 uppercase">Startup Hub</span>
                    <span>Agri Startup Gateway</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-agri-gold-500" />
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="mt-auto pt-16 flex items-center justify-between border-t border-black/5">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-agri-earth-900/30 tracking-widest uppercase">Contact Support</span>
                 <span className="text-sm font-bold text-agri-earth-900">connect@igoagritech.com</span>
               </div>
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center">
                   <Globe className="w-5 h-5 opacity-40" />
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;