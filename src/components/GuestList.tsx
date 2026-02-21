import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface GuestListProps {
  guests: string[];
}

export default function GuestList({ guests }: GuestListProps) {
  return (
    <section className="py-24 px-4 bg-[#050505] border-t border-white/5 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-cyber text-center text-white mb-16 uppercase tracking-widest">
          <span className="text-neon-cyan">Invitados</span> Confirmados
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {guests.map((guest, index) => (
            <motion.div
              key={`${guest}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:border-neon-purple/50 transition-all duration-300 hover:bg-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink p-[1px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
                <span className="text-gray-200 font-tech text-lg tracking-wide group-hover:text-neon-cyan transition-colors truncate">
                  {guest}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
