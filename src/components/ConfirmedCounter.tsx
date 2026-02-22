import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Signature {
  id: string;
  name: string;
}

const COLOR_STYLES = [
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
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{display}</>;
}

// 16 slots scattered across the area (x/y as percentages)
const SLOTS = [
  { x: 5,  y: 7  }, { x: 27, y: 4  }, { x: 52, y: 10 }, { x: 75, y: 6  }, { x: 93, y: 14 },
  { x: 14, y: 31 }, { x: 38, y: 27 }, { x: 62, y: 34 }, { x: 86, y: 29 },
  { x: 8,  y: 56 }, { x: 32, y: 53 }, { x: 57, y: 60 }, { x: 79, y: 55 },
  { x: 21, y: 79 }, { x: 48, y: 77 }, { x: 72, y: 83 },
] as const;

function FloatingName({
  names,
  slot,
  initialDelay,
}: {
  names: string[];
  slot: { readonly x: number; readonly y: number };
  initialDelay: number;
}) {
  // Keep a ref to always access latest names without restarting the cycle
  const namesRef = useRef(names);
  useEffect(() => { namesRef.current = names; }, [names]);

  const [current, setCurrent] = useState({ name: '', visible: false });

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    const show = () => {
      const n = namesRef.current;
      if (!n.length) return;
      setCurrent({ name: n[Math.floor(Math.random() * n.length)], visible: true });
      // Visible for 2.2–4.2 seconds
      t = setTimeout(hide, 2200 + Math.random() * 2000);
    };

    const hide = () => {
      setCurrent(s => ({ ...s, visible: false }));
      // Gap between appearances: 0.7–2 seconds
      t = setTimeout(show, 700 + Math.random() * 1300);
    };

    t = setTimeout(show, initialDelay);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <AnimatePresence mode="wait">
        {current.visible && (
          <motion.span
            key={current.name}
            initial={{ opacity: 0, scale: 0.75, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)'  }}
            exit={{    opacity: 0, scale: 0.75, filter: 'blur(10px)' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className={`font-signature text-xl md:text-3xl ${nameToColor(current.name)} drop-shadow-[0_0_12px_currentColor] select-none whitespace-nowrap block`}
          >
            {current.name}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConfirmedCounter() {
  const [signatures, setSignatures] = useState<Signature[]>([]);

  useEffect(() => {
    const load = () =>
      fetch('/api/signatures')
        .then(r => (r.ok ? r.json() : []))
        .then((data: Signature[]) => setSignatures(data))
        .catch(() => {});
    load();
    const iv = setInterval(load, 30_000);
    return () => clearInterval(iv);
  }, []);

  const count = signatures.length;
  const names = useMemo(() => signatures.map(s => s.name), [signatures]);

  // Stable random delays per slot — computed once on mount so they don't shift on re-render
  const slotDelays = useMemo(() => SLOTS.map(() => Math.random() * 2000), []);

  return (
    <section className="pt-24 pb-0 px-4 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-purple/10 blur-[120px] pointer-events-none" />

      {/* Counter — just the number */}
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-neon-pink font-cyber text-xs tracking-[0.6em] uppercase mb-4"
        >
          CUPO LIMITADO
        </motion.p>

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
          className="font-tech text-gray-400 text-sm tracking-[0.3em] uppercase mb-12"
        >
          confirmados
        </motion.p>
      </div>

      {/* Floating names — appear & disappear individually at random slots */}
      {names.length > 0 && (
        <div className="relative mt-8 min-h-[440px] md:min-h-[520px]">
          {SLOTS.map((slot, i) => (
            <FloatingName
              key={i}
              names={names}
              slot={slot}
              initialDelay={slotDelays[i]}
            />
          ))}

          {/* Bottom fade to black — modern page ending */}
          <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />
        </div>
      )}
    </section>
  );
}
