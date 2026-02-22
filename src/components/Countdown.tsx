import { motion } from 'motion/react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const timeLeft = useCountdown(targetDate);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="grid grid-cols-4 gap-3 md:gap-6 text-center w-full max-w-3xl"
    >
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center group">
          <div className="relative w-full aspect-square md:aspect-auto md:h-32 flex items-center justify-center bg-black/40 border border-neon-cyan/30 rounded-xl overflow-hidden group-hover:border-neon-cyan/80 transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.05)]">
            <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent opacity-50" />
            <span className="relative text-3xl md:text-6xl font-cyber font-bold text-white" style={{ textShadow: '0 0 10px rgba(0,243,255,0.5)' }}>
              {String(value).padStart(2, '0')}
            </span>
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
          </div>
          <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] text-neon-purple mt-3 font-cyber font-bold">
            {unit === 'days' ? 'Días' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Min' : 'Seg'}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
