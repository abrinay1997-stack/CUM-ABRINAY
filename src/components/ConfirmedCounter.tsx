import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const MAX_SPOTS = 100;

interface Signature {
  id: string;
  name: string;
}

const COLOR_STYLES: string[] = [
  'text-neon-cyan',
  'text-neon-pink',
  'text-neon-purple',
  'text-neon-yellow',
  'text-white',
];

function nameToColor(name: string) {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return COLOR_STYLES[hash % COLOR_STYLES.length];
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = display;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value]);

  return <>{display}</>;
}

export default function ConfirmedCounter() {
  const [signatures, setSignatures] = useState<Signature[]>([]);

  useEffect(() => {
    fetch('/api/signatures')
      .then(r => r.ok ? r.json() : [])
      .then((data: Signature[]) => setSignatures(data))
      .catch(() => {});
  }, []);

  const count = signatures.length;
  const progress = Math.min((count / MAX_SPOTS) * 100, 100);
  const names = signatures.map(s => s.name);

  return (
    <section className="py-24 px-4 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-purple/10 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-neon-pink font-cyber text-xs tracking-[0.6em] uppercase mb-4"
        >
          CUPO LIMITADO
        </motion.p>

        {/* Big counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mb-2"
        >
          <span className="font-cyber text-[96px] md:text-[140px] leading-none font-black text-white drop-shadow-[0_0_60px_rgba(0,243,255,0.5)]">
            <AnimatedNumber value={count} />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-tech text-gray-400 text-sm tracking-[0.3em] uppercase mb-10"
        >
          de {MAX_SPOTS} lugares confirmados
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full h-[3px] bg-white/10 rounded-full mb-3 overflow-hidden origin-left"
        >
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink rounded-full shadow-[0_0_10px_rgba(0,243,255,0.6)]"
          />
        </motion.div>

        <p className="font-tech text-xs text-gray-600 tracking-widest uppercase mb-16">
          {MAX_SPOTS - count} lugares restantes
        </p>

        {/* Scrolling names ticker */}
        {names.length > 0 && (
          <div className="overflow-hidden relative">
            {/* fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: Math.max(names.length * 3, 20), repeat: Infinity, ease: 'linear' }}
              className="flex gap-10 whitespace-nowrap"
            >
              {[...names, ...names].map((name, i) => (
                <span
                  key={i}
                  className={`font-signature text-2xl md:text-3xl ${nameToColor(name)} drop-shadow-[0_0_6px_currentColor]`}
                >
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
