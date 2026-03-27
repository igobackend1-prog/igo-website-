import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, LayoutList, History, LogOut, Globe, BarChart3 } from "lucide-react";
import { useAdsAuth } from "@/hooks/useAdsAuth";
import SEO from "@/components/SEO";
import { getOffers, getActiveOffers, OfferPoster } from "@/data/offersData";
import UploadTab   from "@/components/ads/UploadTab";
import UpdateTab   from "@/components/ads/UpdateTab";
import HistoryTab  from "@/components/ads/HistoryTab";

type Tab = "upload" | "update" | "history";

const TABS = [
  { id: "upload"  as Tab, label: "Upload",  icon: Upload },
  { id: "update"  as Tab, label: "Manage",  icon: LayoutList },
  { id: "history" as Tab, label: "History", icon: History },
];

const AdsDashboard = () => {
  const { isLoggedIn, logout } = useAdsAuth();
  const navigate               = useNavigate();
  const [activeTab,      setActiveTab]      = useState<Tab>("upload");
  const [editingPoster,  setEditingPoster]  = useState<OfferPoster | null>(null);
  const [refreshKey,     setRefreshKey]     = useState(0);
  const [stats,          setStats]          = useState({ total: 0, active: 0 });

  // Protect route
  useEffect(() => {
    if (!isLoggedIn) navigate("/ads/login", { replace: true });
  }, [isLoggedIn, navigate]);

  // Refresh stats whenever something changes
  useEffect(() => {
    const total  = getOffers().length;
    const active = getActiveOffers().length;
    setStats({ total, active });
  }, [refreshKey, activeTab]);

  const handleEdit = (poster: OfferPoster) => {
    setEditingPoster(poster);
    setActiveTab("upload");
  };

  const handleEditComplete = () => {
    setEditingPoster(null);
    setRefreshKey(k => k + 1);
    setActiveTab("update");
  };

  const handleAddNew = () => {
    setEditingPoster(null);
    setActiveTab("upload");
  };

  const handleLogout = () => {
    logout();
    navigate("/ads/login");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#060E08] flex flex-col">
      <SEO title="Ads Dashboard" description="IGO Agritech Farms ads management dashboard." noIndex />

      {/* ── Top header ── */}
      <header className="border-b border-white/8 bg-[#0A1510]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <img
              src="https://www.igoagritechfarms.com/images/logo.png"
              alt="IGO"
              className="h-7 object-contain invert brightness-0 invert opacity-70"
            />
            <div className="w-px h-5 bg-white/15" />
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-[#6FD898]" />
              <span className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">
                Advertising Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 bg-white/6 border border-white/10 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
            >
              <Globe className="w-3.5 h-3.5" /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-56 border-r border-white/8 bg-[#0A1510]/50 p-5 flex flex-col shrink-0">

          {/* Nav tabs */}
          <nav className="space-y-1.5 mb-6">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); if (id !== "upload") setEditingPoster(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === id
                    ? "bg-primary/20 text-[#6FD898] border border-primary/25"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-5" />

          {/* Stats */}
          <div className="space-y-3 mb-6">
            <div className="bg-white/[0.04] border border-white/8 rounded-xl p-3">
              <p className="text-[#6FD898] text-2xl font-black">{stats.active}</p>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-0.5">Active Posters</p>
            </div>
            <div className="bg-white/[0.04] border border-white/8 rounded-xl p-3">
              <p className="text-white/70 text-2xl font-black">{stats.total}</p>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-0.5">Total Posters</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-5" />

          {/* Preview link */}
          <Link
            to="/offers"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/8 text-white/40 hover:text-[#6FD898] hover:border-primary/25 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            Preview Offers Page
          </Link>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <motion.div
            key={activeTab + (editingPoster?.id || "")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "upload" && (
              <UploadTab
                editingPoster={editingPoster}
                onEditComplete={handleEditComplete}
              />
            )}
            {activeTab === "update" && (
              <UpdateTab
                onEdit={handleEdit}
                onAddNew={handleAddNew}
                refreshKey={refreshKey}
              />
            )}
            {activeTab === "history" && (
              <HistoryTab refreshKey={refreshKey} />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdsDashboard;
