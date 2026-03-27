import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Eye, EyeOff, X, Phone } from "lucide-react";
import { useAdsAuth } from "@/hooks/useAdsAuth";
import SEO from "@/components/SEO";

const AdsLogin = () => {
  const [username,    setUsername]    = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [showForgot,  setShowForgot]  = useState(false);
  const { login } = useAdsAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(username, password);
    setLoading(false);
    if (ok) {
      navigate("/ads/dashboard");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#060E08] flex items-center justify-center px-4 relative overflow-hidden">
      <SEO title="Ads Login" description="IGO Agritech Farms ads portal login." noIndex />
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo + title */}
        <div className="text-center mb-8">
          <img
            src="https://www.igoagritechfarms.com/images/logo.png"
            alt="IGO Agritech Farms"
            className="h-11 object-contain mx-auto mb-5 invert brightness-0 invert opacity-80"
          />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4">
            <Lock className="w-6 h-6 text-[#6FD898]" />
          </div>
          <h1 className="text-white text-2xl font-black tracking-tight">Advertising Portal</h1>
          <p className="text-white/35 text-sm mt-1.5 font-medium">IGO Agritech Farms — Internal Access Only</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.25em] block mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/[0.06] border border-white/12 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.09] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.25em] block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3.5 bg-white/[0.06] border border-white/12 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.09] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-[#6FD898]/60 hover:text-[#6FD898] text-xs font-semibold transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2.5 px-4">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2.5">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full block shrink-0"
                  />
                  Signing in…
                </span>
              ) : "Sign In to Portal →"}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white/25 hover:text-white/50 text-xs font-medium transition-colors">
            ← Back to Website
          </Link>
        </div>
      </motion.div>

      {/* Forgot password modal */}
      <AnimatePresence>
        {showForgot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
            onClick={() => setShowForgot(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0F1F13] border border-white/12 rounded-2xl p-8 max-w-sm w-full text-center relative"
            >
              <button
                onClick={() => setShowForgot(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-5 h-5 text-[#6FD898]" />
              </div>
              <h3 className="text-white font-black text-lg mb-2">Reset Password</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                To reset your advertising portal credentials, please contact the IGO administrator:
              </p>
              <a
                href="tel:+917397789803"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary/15 border border-primary/25 text-[#6FD898] font-bold text-sm rounded-xl hover:bg-primary/25 transition-all"
              >
                <Phone className="w-4 h-4" />
                +91 73977 89803
              </a>
              <button
                onClick={() => setShowForgot(false)}
                className="block w-full mt-5 text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdsLogin;
