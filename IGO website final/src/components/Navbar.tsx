import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, companyInfo } from "@/data/siteData";
import { motion, AnimatePresence, LayoutGroup, Variants } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Leaf, Droplets, Fish, Settings, ArrowRight, ShieldCheck, Truck } from "lucide-react";

// Animation Variants
const dropdownVars: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: { duration: 0.2 }
  }
};

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
      className="absolute top-full left-0 right-0 pt-4 cursor-default"
    >
      <div className="bg-white border border-black/10 shadow-[0_40px_80px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden flex h-[550px] w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/98">
        {/* Level 2: Sectors Sidebar */}
        <div className="w-[380px] bg-slate-50 border-r border-black/[0.05] p-6 flex flex-col gap-2 shrink-0">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30 mb-4 px-4 mt-2">Sectors</div>
          {link.children.map((sector: any) => (
            <Link
              key={sector.label}
              to={sector.href}
              onMouseEnter={() => setActiveSector(sector.label)}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 text-left relative group ${
                activeSector === sector.label 
                  ? "text-primary font-bold" 
                  : "text-black/60 hover:text-black hover:bg-black/[0.02]"
              }`}
            >
              {activeSector === sector.label && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white shadow-sm ring-1 ring-black/5 rounded-xl"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                />
              )}
              <div className={`relative z-10 w-12 h-12 shrink-0 rounded-full overflow-hidden flex items-center justify-center border border-black/5 shadow-sm bg-white transition-transform duration-300 ${activeSector === sector.label ? "scale-110 shadow-md ring-2 ring-primary/20" : "group-hover:scale-110"}`}>
                {sector.icon && typeof sector.icon === 'string' && sector.icon.startsWith('/') ? (
                  <img src={sector.icon} alt={sector.label} className="w-full h-full object-cover object-center" />
                ) : (
                  <span className="text-2xl drop-shadow-sm">{sector.icon}</span>
                )}
              </div>
              <span className={`relative z-10 text-[15px] leading-tight transition-colors ${activeSector === sector.label ? "text-primary font-bold" : "text-black/70 font-medium group-hover:text-black"}`}>{sector.label}</span>
              <ChevronRight className={`relative z-10 ml-auto w-5 h-5 transition-all opacity-0 ${activeSector === sector.label ? "opacity-100 text-primary translate-x-0" : "-translate-x-2 group-hover:opacity-40"}`} />
            </Link>
          ))}
        </div>

        {/* Level 3 & 4: Sub-sectors and Projects */}
        <div className="flex-1 p-10 overflow-y-auto bg-white custom-scrollbar w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-black/10 shadow-lg bg-white flex items-center justify-center p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      {currentSector.icon && typeof currentSector.icon === 'string' && currentSector.icon.startsWith('/') ? (
                        <img src={currentSector.icon} alt={currentSector.label} className="w-full h-full object-cover object-center" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                          <span className="text-3xl drop-shadow-md">{currentSector.icon}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-black">
                      {currentSector.label}
                    </h3>
                    <p className="text-sm text-black/50 font-medium mt-1">Explore all sub-categories and projects</p>
                  </div>
                </div>
                <Link 
                  to={currentSector.href}
                  className="flex items-center gap-2 text-xs font-bold text-primary hover:gap-3 transition-all uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
                {currentSector.children?.map((subSector: any) => (
                  <div key={subSector.label} className="flex flex-col gap-4">
                    {subSector.children ? (
                      /* Deep Hierarchical Structure (4-Layers) */
                      <>
                        <Link 
                          to={subSector.href}
                          className="flex items-center gap-3 text-[14px] font-bold text-black border-b border-black/5 pb-3 mb-2 w-full hover:text-primary transition-colors group/sub"
                        >
                          {subSector.icon ? (
                            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-center text-primary shadow-sm shrink-0 overflow-hidden group-hover/sub:scale-110 transition-transform">
                              {typeof subSector.icon === 'string' && subSector.icon.startsWith('/') ? (
                                <img src={subSector.icon} className="w-full h-full object-cover object-center" alt="" />
                              ) : typeof subSector.icon === 'string' ? (
                                <span className="text-lg">{subSector.icon}</span>
                              ) : (
                                <subSector.icon className="w-4 h-4" strokeWidth={2} />
                              )}
                            </div>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0" />
                          )}
                          <span className="leading-tight">{subSector.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/sub:opacity-100 ml-auto transition-all -translate-x-2 group-hover/sub:translate-x-0" />
                        </Link>
                        
                        <div className="flex flex-col gap-1.5 pl-11">
                          {subSector.children.map((project: any) => (
                            <Link
                              key={project.label}
                              to={project.href}
                              className="text-[13px] font-medium text-black/60 hover:text-primary transition-all flex items-center gap-2 group/project py-0.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover/project:bg-primary shrink-0 transition-colors" />
                              <span className="group-hover/project:translate-x-0.5 transition-transform leading-tight">{project.label}</span>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      /* Direct Leaf-Node Structure (3-Layers or Simple Links) */
                      <Link
                        to={subSector.href}
                        className="flex items-center gap-4 group/service bg-slate-50/40 hover:bg-slate-50 border border-black/5 hover:border-black/10 rounded-2xl p-4 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md"
                      >
                         <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-black/40 group-hover/service:text-primary shadow-sm shrink-0 transition-colors overflow-hidden">
                            {(subSector.icon || subSector.image) && typeof (subSector.icon || subSector.image) === 'string' && (subSector.icon || subSector.image).startsWith('/') ? (
                              <img src={subSector.icon || subSector.image} className="w-full h-full object-cover object-center rounded-xl" alt="" />
                            ) : typeof subSector.icon === 'string' ? (
                              <span className="text-xl">{subSector.icon}</span>
                            ) : subSector.icon ? (
                              <subSector.icon className="w-6 h-6" strokeWidth={1.5} />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-primary/40" />
                            )}
                         </div>
                         <div className="flex flex-col gap-1 pr-2">
                           <span className="text-[14px] font-bold text-black group-hover/service:text-primary transition-colors leading-tight">
                             {subSector.label}
                           </span>
                           <span className="text-[11px] text-black/40 font-medium line-clamp-1 uppercase tracking-wider">
                             View Details
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


const MobileNavLink = ({ link, depth = 0 }: { link: any, depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = link.children && link.children.length > 0;

  const fontSize = depth === 0 ? "text-xl font-black" : depth === 1 ? "text-lg font-bold text-black/80" : depth === 2 ? "text-base font-semibold text-black/60" : "text-sm font-medium text-black/40";
  const py = depth === 0 ? "py-4" : "py-3";

  return (
    <div className="flex flex-col">
      <div 
        className={`flex items-center justify-between border-b border-black/5 ${py} ${fontSize}`}
      >
        <Link 
          to={link.href} 
          className="flex items-center gap-3 flex-1"
          onClick={() => {
            if (!hasChildren) setIsOpen(false);
          }}
        >
          {link.icon && typeof link.icon === 'string' && link.icon.startsWith('/') ? (
            <img src={link.icon} alt="" className={`object-contain opacity-70 ${depth === 0 ? "w-6 h-6" : "w-5 h-5"}`} />
          ) : link.icon && typeof link.icon !== 'string' ? (
            <link.icon className={`opacity-70 ${depth === 0 ? "w-6 h-6" : "w-5 h-5"}`} />
          ) : (
            <span className="opacity-80">{link.icon}</span>
          )}
          <span className={depth > 0 ? "tracking-tight" : ""}>{link.label}</span>
        </Link>
        {hasChildren && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="p-2 -mr-2"
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5 opacity-30" />
            </motion.div>
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50"
          >
            <div className={`pl-${Math.min((depth + 1) * 4, 8)} pr-4 py-2 flex flex-col`}>
              {/* Optional: Add a "View All" link for the current category in mobile if needed */}
              {link.children.map((child: any) => (
                <MobileNavLink key={child.label} link={child} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  if (isAdmin) return null;

  const navClasses = "bg-white/95 backdrop-blur-md border-b border-black/[0.05] py-4 shadow-sm";

  const textColorClass = "text-black";
  const linkColorClass = "text-black/70";
  const logoInvertClass = "";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navClasses}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group z-50">
          <img src={companyInfo.logo} alt="IGO Logo" className={`h-14 w-auto drop-shadow-md group-hover:scale-105 transition-transform ${logoInvertClass}`} />
          <div className="flex flex-col leading-none drop-shadow-sm">
            <span className={`text-2xl font-black tracking-tight uppercase font-display ${textColorClass}`}>IGO <span className="text-primary">Agritech</span></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <LayoutGroup>
            {navLinks.map((link) => {
              const isMega = link.label === "Projects" || link.label === "Services" || link.label === "Products";
              
              return (
                <div 
                  key={link.label}
                  className={isMega ? "static" : "relative"}
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={`text-sm font-semibold ${linkColorClass} hover:text-primary transition-all py-2 flex items-center gap-1 group`}
                  >
                    {link.label}
                    {link.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180 text-primary" : "opacity-30 group-hover:opacity-100"}`} />}
                  </Link>

                  <AnimatePresence>
                    {openDropdown === link.label && link.children && (
                      <div className={isMega ? "" : "absolute top-full left-1/2 -translate-x-1/2 pt-4"}>
                        {isMega ? (
                          <MegaMenu link={link} />
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="bg-white border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-2xl p-2 w-56 overflow-hidden"
                          >
                            {link.children.map((child: any) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-black/[0.02] transition-colors group/item"
                              >
                                <span className="text-[13px] font-medium text-black/70 group-hover/item:text-black">{child.label}</span>
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-30 transition-all -translate-x-2 group-hover/item:translate-x-0" />
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
            className="px-6 py-2.5 text-xs font-semibold rounded-full transition-all uppercase tracking-widest bg-black text-white shadow-lg shadow-black/10"
          >
            Agri Startup Platform
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 z-50 rounded-full hover:bg-black/5 transition-colors ${textColorClass}`}
        >
          {mobileOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-40 flex flex-col p-6 pt-24 overflow-y-auto"
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <MobileNavLink key={link.label} link={link} />
              ))}
              
              <div className="mt-8 pt-8 border-t border-black/5">
                <Link 
                   to="/agri-startup-platform" 
                   className="flex items-center justify-between p-6 bg-black text-white rounded-2xl font-bold text-lg"
                >
                  <span>Agri Startup Hub</span>
                  <ArrowRight className="w-5 h-5 text-primary" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;