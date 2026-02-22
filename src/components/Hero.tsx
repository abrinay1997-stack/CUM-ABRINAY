import { motion } from 'motion/react';
import { ChevronDown, Zap } from 'lucide-react';
import Countdown from './Countdown';

const CORNERS = [
  'top-0 left-0 border-t-2 border-l-2',
  'top-0 right-0 border-t-2 border-r-2',
  'bottom-0 left-0 border-b-2 border-l-2',
  'bottom-0 right-0 border-b-2 border-r-2',
] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white pt-20 pb-10">
      {/* Ambient glows — these are background-only, no filter on content ancestors */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-neon-purple/15 blur-[140px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-cyan/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center w-full">

        {/* ── LOGO ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'circOut' }}
          className="relative mb-8 flex flex-col items-center select-none"
        >
          {/* Scan-bracket corners */}
          <div className="absolute -inset-4 pointer-events-none">
            {CORNERS.map((cls, i) => (
              <motion.div
                key={i}
                className={`absolute w-7 h-7 border-neon-cyan/50 ${cls}`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
              />
            ))}
          </div>

          {/* ABRINAY PRESENTS */}
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-cyber text-[10px] md:text-xs uppercase mb-3"
            style={{
              color: '#00f3ff',
              letterSpacing: '0.6em',
              textShadow: '0 0 6px #00f3ff, 0 0 14px #00f3ff',
            }}
          >
            ABRINAY PRESENTS
          </motion.p>

          {/* LICENCIA label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="font-cyber font-black text-xl md:text-3xl uppercase"
            style={{
              color: '#d580ff',
              letterSpacing: '0.45em',
              textShadow: '0 0 6px #bc13fe, 0 0 18px #bc13fe, 0 0 36px #bc13fe',
            }}
          >
            LICENCIA
          </motion.p>

          {/* Giant P — neon tube via text-shadow only, no clip-path, no filter */}
          <motion.span
            className="font-cyber font-black text-[7.5rem] md:text-[13rem] leading-none block"
            style={{ color: '#e8f5ff' }}
            animate={{
              textShadow: [
                '0 0 5px #fff, 0 0 12px #fff, 0 0 22px #fff, 0 0 45px #bc13fe, 0 0 85px #bc13fe, 0 0 95px #bc13fe',
                '0 0 5px #fff, 0 0 14px #fff, 0 0 28px #fff, 0 0 58px #bc13fe, 0 0 110px #bc13fe, 0 0 140px #bc13fe',
                '0 0 4px #fff, 0 0 10px #fff, 0 0 19px #fff, 0 0 38px #bc13fe, 0 0 72px #bc13fe, 0 0 85px #bc13fe',
                '0 0 5px #fff, 0 0 12px #fff, 0 0 22px #fff, 0 0 45px #bc13fe, 0 0 85px #bc13fe, 0 0 95px #bc13fe',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            P
          </motion.span>

          {/* Gradient separator line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="w-44 md:w-72 h-px mt-2"
            style={{
              background:
                'linear-gradient(to right, transparent, #bc13fe 35%, #00f3ff 65%, transparent)',
              boxShadow: '0 0 8px #bc13fe',
            }}
          />
        </motion.div>
        {/* ── END LOGO ─────────────────────────────────────────────── */}

        {/* Event info badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16 w-full max-w-3xl"
        >
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.1)]">
            <Zap className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm md:text-lg font-tech font-bold text-gray-200 tracking-wider uppercase">
              7 de Marzo, 2026
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(188,19,254,0.1)]">
            <span className="w-2 h-2 rounded-full bg-neon-pink animate-ping" />
            <span className="text-sm md:text-lg font-tech font-bold text-gray-200 tracking-wider uppercase">
              Vía Argentina, Panamá
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 border border-neon-pink/50 backdrop-blur-md">
            <span className="text-sm md:text-base font-cyber font-bold text-neon-pink tracking-wider">
              +18
            </span>
          </div>
        </motion.div>

        {/* Countdown */}
        <Countdown targetDate="2026-03-07T00:00:00-05:00" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => {
          document.getElementById('description')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-neon-cyan font-cyber">Scroll</span>
          <ChevronDown className="w-8 h-8 text-neon-cyan" style={{ filter: 'drop-shadow(0 0 6px #00f3ff)' }} />
        </div>
      </motion.div>
    </section>
  );
}
