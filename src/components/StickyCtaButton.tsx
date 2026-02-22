import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function StickyCtaButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <a
            href="#registro"
            className="pointer-events-auto flex items-center gap-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-cyber font-bold py-3 px-8 rounded-full shadow-[0_0_40px_rgba(188,19,254,0.6)] uppercase tracking-widest text-sm border border-white/20 hover:shadow-[0_0_60px_rgba(188,19,254,0.8)] hover:scale-105 transition-all active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            ASEGURAR MI LUGAR
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
