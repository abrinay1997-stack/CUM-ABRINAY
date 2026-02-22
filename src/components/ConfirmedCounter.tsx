import { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'motion/react';

const MAX_SPOTS = 100;

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

// Deterministic shuffle with seed so each row is always different
function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = Math.imul(s, 1664525) + 1013904223;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

// Build enough copies so the ticker always fills the screen regardless of count
function buildLoop(names: string[]): { items: string[]; copies: number } {
  if (names.length === 0) return { items: [], copies: 0 };
  // At least 3 full copies, minimum 30 slots total
  const copies = Math.max(3, Math.ceil(30 / names.length));
  const items = Array.from({ length: copies }, () => names).flat();
  return { items, copies };
}

function NameTicker({
  names,
  direction = 1,
  speed = 60,
}: {
  names: string[];
  direction?: 1 | -1;
  speed?: number; // px/second
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [unitWidth, setUnitWidth] = useState(0);
  const { items, copies } = useMemo(() => buildLoop(names), [names]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el || copies === 0) return;
    // Use rAF to ensure font/layout is settled before measuring
    const id = requestAnimationFrame(() => {
      setUnitWidth(el.scrollWidth / copies);
    });
    return () => cancelAnimationFrame(id);
  }, [items, copies]);

  if (names.length === 0) return null;

  const duration = unitWidth > 0 ? unitWidth / speed : 30;
  const dist = direction === 1 ? -unitWidth : unitWidth;

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={wrapRef}
        animate={unitWidth > 0 ? { x: [0, dist] } : { x: 0 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex gap-8 whitespace-nowrap w-max"
      >
        {items.map((name, i) => (
          <span
            key={i}
            className={`font-signature text-2xl md:text-3xl ${nameToColor(name)} drop-shadow-[0_0_8px_currentColor] select-none`}
          >
            {name}
          </span>
        ))}
      </motion.div>
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
  const progress = Math.min((count / MAX_SPOTS) * 100, 100);

  // Each row gets an independently seeded shuffle so they're all different
  const names = useMemo(() => signatures.map(s => s.name), [signatures]);
  const row1 = useMemo(() => shuffle(names, 7), [names]);
  const row2 = useMemo(() => shuffle(names, 42), [names]);
  const row3 = useMemo(() => shuffle(names, 99), [names]);

  return (
    <section className="pt-24 pb-0 px-4 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-purple/10 blur-[120px] pointer-events-none" />

      {/* Counter block */}
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
          className="font-tech text-gray-400 text-sm tracking-[0.3em] uppercase mb-10"
        >
          de {MAX_SPOTS} lugares confirmados
        </motion.p>

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
      </div>

      {/* Names ticker — 3 rows, fills footer space, different speeds & directions */}
      {names.length > 0 && (
        <div className="relative mt-4">
          <div className="space-y-6 py-8">
            <NameTicker names={row1} direction={1}  speed={60} />
            <NameTicker names={row2} direction={-1} speed={45} />
            <NameTicker names={row3} direction={1}  speed={75} />
          </div>

          {/* Bottom fade — replaces footer, creates a modern ending */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        </div>
      )}
    </section>
  );
}
