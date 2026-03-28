import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleLeft, ToggleRight, Pencil, Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import {
  OfferPoster, getOffers, saveOffers, addHistory,
} from "@/data/offersData";

type Filter = "all" | "active" | "inactive";

interface Props {
  onEdit: (poster: OfferPoster) => void;
  onAddNew: () => void;
  refreshKey: number;
}

const BADGE_COLOR: Record<string, string> = {
  "HOT DEAL":  "bg-red-500/20 text-red-300 border-red-500/30",
  "NEW":        "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "LIMITED":    "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "SPECIAL":    "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "SEASONAL":   "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "FLASH SALE": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

const UpdateTab = ({ onEdit, onAddNew, refreshKey }: Props) => {
  const [offers,        setOffers]        = useState<OfferPoster[]>([]);
  const [filter,        setFilter]        = useState<Filter>("all");
  const [deletingId,    setDeletingId]    = useState<string | null>(null);

  const reload = () => setOffers(getOffers().sort((a, b) => a.displayOrder - b.displayOrder));

  useEffect(() => { reload(); }, [refreshKey]);

  const toggle = (id: string) => {
    const updated = getOffers().map(o => {
      if (o.id !== id) return o;
      const next = { ...o, isActive: !o.isActive, updatedAt: new Date().toISOString() };
      addHistory({
        action: next.isActive ? "activated" : "deactivated",
        posterTitle: o.title,
        posterId: o.id,
        changeNote: next.isActive ? "Poster activated" : "Poster deactivated",
        snapshot: next,
      });
      return next;
    });
    saveOffers(updated);
    reload();
  };

  const deleteOffer = (id: string) => {
    const all = getOffers();
    const target = all.find(o => o.id === id);
    if (target) {
      addHistory({
        action: "deleted",
        posterTitle: target.title,
        posterId: id,
        changeNote: "Poster deleted",
        snapshot: target,
      });
    }
    saveOffers(all.filter(o => o.id !== id));
    setDeletingId(null);
    reload();
  };

  const move = (id: string, dir: 1 | -1) => {
    const list = getOffers().sort((a, b) => a.displayOrder - b.displayOrder);
    const idx  = list.findIndex(o => o.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= list.length) return;
    const tmp                  = list[idx].displayOrder;
    list[idx].displayOrder     = list[swap].displayOrder;
    list[swap].displayOrder    = tmp;
    list[idx].updatedAt        = new Date().toISOString();
    list[swap].updatedAt       = new Date().toISOString();
    saveOffers(list);
    addHistory({
      action: "reordered",
      posterTitle: list[idx].title,
      posterId: id,
      changeNote: `Moved ${dir === -1 ? "up" : "down"}`,
      snapshot: null,
    });
    reload();
  };

  const now = new Date();
  const isExpired = (o: OfferPoster) => !!o.expiryDate && new Date(o.expiryDate) < now;

  const filtered = offers.filter(o => {
    if (filter === "active")   return o.isActive && !isExpired(o);
    if (filter === "inactive") return !o.isActive || isExpired(o);
    return true;
  });

  const activeCount   = offers.filter(o => o.isActive && !isExpired(o)).length;
  const inactiveCount = offers.length - activeCount;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-white">Manage Offer Posters</h2>
          <p className="text-white/40 text-xs mt-0.5">
            {activeCount} active · {inactiveCount} inactive · {offers.length} total
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {(["all", "active", "inactive"] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-white/8 text-white/50 hover:bg-white/12"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-sm">No posters found.</p>
          <button onClick={onAddNew} className="mt-3 text-[#6FD898] text-xs font-semibold hover:underline">
            Upload your first poster →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((o, idx) => (
              <motion.div
                key={o.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-white/[0.04] border border-white/10 rounded-xl p-4 flex gap-4 items-center"
              >
                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-white/8">
                  {o.image ? (
                    <img src={o.image} alt={o.title} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 text-[10px]">No img</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-white font-bold text-sm truncate">{o.title}</span>
                    {o.badge && (
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${BADGE_COLOR[o.badge] || "bg-white/10 text-white/50 border-white/15"}`}>
                        {o.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-[10px] text-white/40">
                    <span>Order: #{o.displayOrder}</span>
                    {o.expiryDate && (
                      <span className={isExpired(o) ? "text-red-400" : "text-white/40"}>
                        {isExpired(o) ? "⚠ Expired" : `Expires: ${new Date(o.expiryDate).toLocaleDateString("en-IN")}`}
                      </span>
                    )}
                    <span>{new Date(o.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  {/* Status pill */}
                  <span className={`inline-block mt-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    o.isActive && !isExpired(o)
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-red-500/20 text-red-300"
                  }`}>
                    {o.isActive && !isExpired(o) ? "● Active" : "● Inactive"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Reorder */}
                  <button
                    onClick={() => move(o.id, -1)}
                    disabled={idx === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-all disabled:opacity-20"
                    title="Move up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => move(o.id, 1)}
                    disabled={idx === filtered.length - 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-all disabled:opacity-20"
                    title="Move down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Toggle */}
                  <button
                    onClick={() => toggle(o.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-[#6FD898] hover:bg-white/8 transition-all"
                    title={o.isActive ? "Deactivate" : "Activate"}
                  >
                    {o.isActive
                      ? <ToggleRight className="w-4 h-4 text-[#6FD898]" />
                      : <ToggleLeft  className="w-4 h-4" />
                    }
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => onEdit(o)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setDeletingId(o.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
            onClick={() => setDeletingId(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0F1F13] border border-white/12 rounded-2xl p-7 max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-white font-black text-lg mb-2">Delete Poster?</h3>
              <p className="text-white/50 text-sm mb-6">
                This poster will be removed from the carousel. A backup snapshot is saved in History so you can restore it.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 py-3 bg-white/8 border border-white/12 text-white/70 font-bold text-xs uppercase rounded-xl hover:bg-white/12 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteOffer(deletingId!)}
                  className="flex-1 py-3 bg-red-500/80 text-white font-black text-xs uppercase rounded-xl hover:bg-red-500 transition-all"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateTab;
