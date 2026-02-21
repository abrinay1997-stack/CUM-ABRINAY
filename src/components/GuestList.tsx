import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

interface Signature {
  id: string;
  name: string;
  createdAt?: string;
}

const COLOR_CLASSES = [
  { text: 'text-neon-cyan',   glow: 'drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]',   ring: 'shadow-[0_0_20px_rgba(0,243,255,0.3)]'   },
  { text: 'text-neon-pink',   glow: 'drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]',   ring: 'shadow-[0_0_20px_rgba(255,0,255,0.3)]'   },
  { text: 'text-neon-purple', glow: 'drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]',  ring: 'shadow-[0_0_20px_rgba(188,19,254,0.3)]'  },
  { text: 'text-neon-yellow', glow: 'drop-shadow-[0_0_8px_rgba(252,238,10,0.8)]',  ring: 'shadow-[0_0_20px_rgba(252,238,10,0.3)]'  },
  { text: 'text-white',       glow: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]', ring: 'shadow-[0_0_20px_rgba(255,255,255,0.15)]' },
];

function nameToColor(name: string) {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return COLOR_CLASSES[hash % COLOR_CLASSES.length];
}

function nameToRotation(name: string) {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return ((hash % 14) - 7) * 1.2; // –8.4° to +8.4°
}

function EmptyState() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-16">
      <div className="w-12 h-12 rounded-full border border-neon-cyan/30 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-neon-cyan/60 animate-ping" />
      </div>
      <p className="font-cyber text-gray-600 text-sm tracking-[0.4em] uppercase">
        SÉ EL PRIMERO EN FIRMAR
        <span className={`ml-1 text-neon-cyan ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>_</span>
      </p>
    </div>
  );
}

export default function GuestList() {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [prevIds, setPrevIds] = useState<Set<string>>(new Set());
  const isFirstLoad = useRef(true);

  const fetchSignatures = async () => {
    try {
      const res = await fetch('/api/signatures');
      if (res.ok) {
        const data: Signature[] = await res.json();
        setSignatures(data);
        if (isFirstLoad.current) {
          setPrevIds(new Set(data.map(s => s.id)));
          isFirstLoad.current = false;
        }
      }
    } catch (err) {
      console.error('Failed to fetch signatures', err);
    }
  };

  useEffect(() => {
    fetchSignatures();
    const interval = setInterval(() => {
      fetchSignatures().then(() => {
        setPrevIds(prev => {
          const updated = new Set(prev);
          signatures.forEach(s => updated.add(s.id));
          return updated;
        });
      });
    }, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wall.png')] opacity-40 z-0" />
      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)] z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-neon-pink font-cyber text-xs tracking-[0.6em] uppercase mb-3">
            {signatures.length > 0 ? `${signatures.length} FIRMANTES` : 'MURO OFICIAL'}
          </p>
          <h2 className="text-4xl md:text-6xl font-cyber text-white uppercase tracking-widest">
            MURO DE <span className="text-neon-pink drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]">FIRMAS</span>
          </h2>
          <p className="text-gray-500 font-tech mt-4 text-sm tracking-wider">
            Deja tu marca en la historia de la noche.
          </p>
        </motion.div>

        {/* 3-D perspective grid */}
        <div
          className="p-8 bg-white/[0.02] rounded-3xl border border-white/8 backdrop-blur-sm relative"
          style={{
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6), 0 0 40px rgba(188,19,254,0.05)',
            perspective: '1000px',
          }}
        >
          {/* Corner accent lines */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-neon-purple/30 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-neon-cyan/30 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-neon-cyan/30 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-neon-purple/30 rounded-br-3xl" />

          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 min-h-[360px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {signatures.length === 0 ? (
              <EmptyState />
            ) : (
              <AnimatePresence>
                {signatures.map((sig, index) => {
                  const color = nameToColor(sig.name);
                  const rotation = nameToRotation(sig.name);
                  const isNew = !prevIds.has(sig.id) && !isFirstLoad.current;
                  // Subtle 3-D depth per item
                  const depth = ((index % 3) - 1) * 12;

                  return (
                    <motion.div
                      key={sig.id}
                      initial={isNew
                        ? { opacity: 0, scale: 0, filter: 'blur(12px)', rotateY: -30 }
                        : { opacity: 0, scale: 0.6, filter: 'blur(6px)' }
                      }
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: isNew ? 0 : index * 0.04,
                        type: 'spring',
                        stiffness: 180,
                        damping: 20,
                      }}
                      className="flex items-center justify-center group"
                      style={{ transformStyle: 'preserve-3d', transform: `translateZ(${depth}px)` }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, translateZ: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`
                          font-signature text-3xl md:text-5xl cursor-default select-none
                          ${color.text} ${color.glow}
                          px-3 py-2 rounded-xl
                          group-hover:${color.ring}
                          transition-shadow duration-300
                        `}
                        style={{ transform: `rotate(${rotation}deg)` }}
                      >
                        {sig.name}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
