import { motion } from 'motion/react';
import { ChevronDown, Zap } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white pt-20 pb-10">
      {/* Neon Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-cyan/10 blur-[100px] rounded-full z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center w-full">
        
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative mb-8 group"
        >
          <div className="absolute inset-0 bg-neon-pink/30 blur-3xl rounded-full animate-pulse" />
          <div className="relative text-[8rem] md:text-[12rem] leading-none font-cyber font-black flex items-center justify-center tracking-tighter">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-neon-cyan to-neon-purple">P</span>
            <motion.span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-neon-pink z-0"
              animate={{ x: [-2, 2, -2], opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
            >
              P
            </motion.span>
            <motion.span 
              className="absolute -top-4 -right-8 md:-right-12 text-[6rem] md:text-[8rem] text-neon-yellow drop-shadow-[0_0_15px_rgba(252,238,10,0.8)]"
              animate={{ 
                rotate: [0, 10, -5, 0],
                textShadow: ["0 0 10px #fcee0a", "0 0 30px #fcee0a", "0 0 10px #fcee0a"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ?
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12 space-y-4 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-neon-purple/0 via-neon-purple/10 to-neon-purple/0 blur-xl -z-10" />
          <h2 className="text-lg md:text-xl font-cyber text-neon-cyan tracking-[0.3em] uppercase border-b border-neon-cyan/30 pb-2 inline-block">
            ABRINAY PRESENTS
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-cyber font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            LICENCIA <span className="text-neon-pink glitch-text">P</span>
          </h1>
        </motion.div>

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
          const nextSection = document.getElementById('description');
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-neon-cyan font-cyber">Scroll</span>
          <ChevronDown className="w-8 h-8 text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
        </div>
      </motion.div>
    </section>
  );
}
