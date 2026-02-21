import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Signature {
  id: number;
  name: string;
}

interface GuestListProps {
  guests: string[]; // Kept for compatibility but we'll use internal state for the board
}

export default function GuestList({ guests: initialGuests }: GuestListProps) {
  const [signatures, setSignatures] = useState<Signature[]>([]);

  const fetchSignatures = async () => {
    try {
      const res = await fetch('/api/signatures');
      if (res.ok) {
        const data = await res.json();
        setSignatures(data);
      }
    } catch (error) {
      console.error("Failed to fetch signatures", error);
    }
  };

  useEffect(() => {
    fetchSignatures();
    // Poll for new signatures every 5 seconds
    const interval = setInterval(fetchSignatures, 5000);
    return () => clearInterval(interval);
  }, []);

  // Colors for signatures to rotate through
  const colors = [
    'text-neon-pink drop-shadow-[0_0_5px_#ff00ff]',
    'text-neon-cyan drop-shadow-[0_0_5px_#00f3ff]',
    'text-neon-purple drop-shadow-[0_0_5px_#bc13fe]',
    'text-neon-yellow drop-shadow-[0_0_5px_#fcee0a]',
    'text-white drop-shadow-[0_0_5px_#ffffff]'
  ];

  return (
    <section className="py-24 px-4 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wall.png')] opacity-50 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-cyber text-center text-white mb-4 uppercase tracking-widest">
          MURO DE <span className="text-neon-pink">FIRMAS</span>
        </h2>
        <p className="text-center text-gray-400 font-tech mb-16 text-lg">
          Deja tu marca en la historia de la noche.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] min-h-[400px]">
          {signatures.map((sig, index) => {
            // Deterministic random rotation based on name length
            const rotation = (sig.name.length % 10 - 5) * 2; 
            const colorClass = colors[index % colors.length];
            
            return (
              <motion.div
                key={sig.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-center justify-center"
              >
                <div 
                  className={`font-signature text-3xl md:text-5xl ${colorClass} transform hover:scale-110 transition-transform duration-300 cursor-default`}
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {sig.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
