import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION = 5000; // 5 seconds

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), SPLASH_DURATION);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        >
          {/* Ad card */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[90vw] max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/assets/demo poster/main page image .png"
              alt="IGO Agritech Farms Advertisement"
              className="w-full h-auto block"
            />

            {/* Countdown badge */}
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Closing in {countdown}s
            </div>

            {/* Close button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-3 left-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors"
              aria-label="Close advertisement"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
