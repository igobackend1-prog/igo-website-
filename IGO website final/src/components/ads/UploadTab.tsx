import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image, CheckCircle, AlertCircle } from "lucide-react";
import {
  OfferPoster, BADGE_OPTIONS, CTA_PRESETS,
  compressImage, generateId, getOffers, saveOffers, addHistory,
} from "@/data/offersData";

interface Props {
  editingPoster?: OfferPoster | null;
  onEditComplete?: () => void;
}

const EMPTY: Omit<OfferPoster, "id" | "createdAt" | "updatedAt"> = {
  title: "", subtitle: "", badge: "", ctaLabel: "Get Quote",
  ctaLink: "/contact", image: "", bgColor: "#0a3d0a",
  isActive: true, displayOrder: 1, expiryDate: null, note: "",
};

const UploadTab = ({ editingPoster, onEditComplete }: Props) => {
  const [form,        setForm]        = useState({ ...EMPTY });
  const [customLink,  setCustomLink]  = useState("");
  const [preview,     setPreview]     = useState("");
  const [isDragging,  setIsDragging]  = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast,       setToast]       = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEditing = !!editingPoster;

  // Pre-fill when editing
  useEffect(() => {
    if (editingPoster) {
      const { id, createdAt, updatedAt, ...rest } = editingPoster;
      setForm({ ...rest });
      setPreview(editingPoster.image || "");
      if (!CTA_PRESETS.find(p => p.value === editingPoster.ctaLink)) {
        setForm(f => ({ ...f, ctaLink: "__custom__" }));
        setCustomLink(editingPoster.ctaLink);
      }
    } else {
      setForm({ ...EMPTY });
      setPreview("");
    }
  }, [editingPoster]);

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("err", "Please upload an image file (.jpg, .webp, .png)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("err", "File too large. Max 5 MB.");
      return;
    }
    setIsUploading(true);
    try {
      const b64 = await compressImage(file);
      setForm(f => ({ ...f, image: b64 }));
      setPreview(b64);
    } catch {
      showToast("err", "Image processing failed. Try another file.");
    }
    setIsUploading(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const finalLink = form.ctaLink === "__custom__" ? customLink : form.ctaLink;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { showToast("err", "Title is required."); return; }

    const offers = getOffers();

    if (isEditing && editingPoster) {
      const idx = offers.findIndex(o => o.id === editingPoster.id);
      if (idx > -1) {
        offers[idx] = {
          ...editingPoster,
          ...form,
          ctaLink: finalLink,
          updatedAt: new Date().toISOString(),
        };
        saveOffers(offers);
        addHistory({
          action: "updated",
          posterTitle: form.title,
          posterId: editingPoster.id,
          changeNote: form.note || "Poster updated",
          snapshot: offers[idx],
        });
        showToast("ok", "Poster updated successfully!");
        onEditComplete?.();
      }
    } else {
      const newOrder = offers.length > 0 ? Math.max(...offers.map(o => o.displayOrder)) + 1 : 1;
      const poster: OfferPoster = {
        ...form,
        ctaLink: finalLink,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        displayOrder: form.displayOrder || newOrder,
      };
      saveOffers([...offers, poster]);
      addHistory({
        action: "published",
        posterTitle: form.title,
        posterId: poster.id,
        changeNote: form.note || "New poster published",
        snapshot: poster,
      });
      showToast("ok", form.isActive ? "Poster published successfully!" : "Poster saved as draft.");
      setForm({ ...EMPTY });
      setPreview("");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-black text-white mb-6">
        {isEditing ? "Edit Offer Poster" : "Upload New Offer Poster"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image drop zone */}
        <div>
          <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">
            Poster Image
          </label>

          {preview ? (
            <div className="relative rounded-xl overflow-hidden border border-white/15 group">
              <img src={preview} alt="Preview" loading="lazy" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={() => { setPreview(""); setForm(f => ({ ...f, image: "" })); }}
                  className="px-4 py-2 bg-white/20 text-white text-xs font-bold rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-white/15 hover:border-white/30 hover:bg-white/[0.03]"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-white/20 border-t-[#6FD898] rounded-full"
                  />
                  <p className="text-white/50 text-sm">Processing image…</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center">
                    <Image className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-semibold">Drag & drop or click to upload</p>
                    <p className="text-white/30 text-xs mt-1">Recommended: 1200 × 500 px · JPG / WEBP / PNG · Max 5 MB</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>

        {/* Title */}
        <Field label="Offer Title *">
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="e.g. 20% Off on Polyhouse Installation"
            className={inputCls}
          />
        </Field>

        {/* Subtitle */}
        <Field label="Subtitle">
          <input
            value={form.subtitle}
            onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
            placeholder="e.g. Valid till March 31, 2026"
            className={inputCls}
          />
        </Field>

        {/* Badge + CTA Label — 2 col */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Badge">
            <select
              value={form.badge}
              onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
              className={inputCls}
            >
              {BADGE_OPTIONS.map(b => (
                <option key={b} value={b} className="bg-[#0F1F13]">
                  {b || "— None —"}
                </option>
              ))}
            </select>
          </Field>
          <Field label="CTA Button Label">
            <input
              value={form.ctaLabel}
              onChange={e => setForm(f => ({ ...f, ctaLabel: e.target.value }))}
              placeholder="Get Quote"
              className={inputCls}
            />
          </Field>
        </div>

        {/* CTA Link */}
        <Field label="CTA Link">
          <select
            value={form.ctaLink}
            onChange={e => setForm(f => ({ ...f, ctaLink: e.target.value }))}
            className={inputCls}
          >
            {CTA_PRESETS.map(p => (
              <option key={p.value} value={p.value} className="bg-[#0F1F13]">
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        {form.ctaLink === "__custom__" && (
          <Field label="Custom URL">
            <input
              value={customLink}
              onChange={e => setCustomLink(e.target.value)}
              placeholder="https://... or /page"
              className={inputCls}
            />
          </Field>
        )}

        {/* Expiry + BG colour — 2 col */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Expiry Date (optional)">
            <input
              type="date"
              value={form.expiryDate || ""}
              onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value || null }))}
              className={inputCls + " [color-scheme:dark]"}
            />
          </Field>
          <Field label="Background Colour">
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={form.bgColor}
                onChange={e => setForm(f => ({ ...f, bgColor: e.target.value }))}
                className="w-12 h-10 rounded-lg border border-white/15 bg-transparent cursor-pointer"
              />
              <input
                value={form.bgColor}
                onChange={e => setForm(f => ({ ...f, bgColor: e.target.value }))}
                className={inputCls + " flex-1"}
              />
            </div>
          </Field>
        </div>

        {/* Display order */}
        <Field label="Display Order (1 = first in carousel)">
          <input
            type="number"
            min={1}
            max={20}
            value={form.displayOrder}
            onChange={e => setForm(f => ({ ...f, displayOrder: Number(e.target.value) }))}
            className={inputCls}
          />
        </Field>

        {/* Internal note */}
        <Field label="Internal Note (not shown publicly)">
          <textarea
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            rows={2}
            placeholder="e.g. Summer 2026 campaign"
            className={inputCls + " resize-none"}
          />
        </Field>

        {/* Status toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
            className={`w-11 h-6 rounded-full transition-colors ${
              form.isActive ? "bg-primary" : "bg-white/15"
            } relative shrink-0`}
          >
            <motion.span
              animate={{ x: form.isActive ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow block"
            />
          </button>
          <span className="text-white/70 text-sm font-medium">
            {form.isActive ? "Publish immediately (visible on homepage)" : "Save as draft (hidden from public)"}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          {isEditing && (
            <button
              type="button"
              onClick={onEditComplete}
              className="px-6 py-3 bg-white/8 border border-white/12 text-white/70 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/12 transition-all"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 py-3.5 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
          >
            {isEditing ? "Save Changes" : (form.isActive ? "🚀 Publish Poster" : "💾 Save Draft")}
          </button>
        </div>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold z-50 ${
              toast.type === "ok"
                ? "bg-emerald-900 border border-emerald-500/30 text-emerald-200"
                : "bg-red-900 border border-red-500/30 text-red-200"
            }`}
          >
            {toast.type === "ok"
              ? <CheckCircle className="w-4 h-4 shrink-0" />
              : <AlertCircle className="w-4 h-4 shrink-0" />
            }
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const inputCls =
  "w-full px-4 py-3 bg-white/[0.06] border border-white/12 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.09] transition-all";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">
      {label}
    </label>
    {children}
  </div>
);

export default UploadTab;
