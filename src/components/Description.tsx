import { motion } from 'motion/react';

export default function Description() {
  return (
    <section id="description" className="py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] z-0" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Holographic Card */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent blur-xl -z-10 rounded-3xl" />
          <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(188,19,254,0.1)] relative overflow-hidden">
            
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-pink" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-pink" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan" />

            <h2 className="text-4xl md:text-6xl font-cyber text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple mb-12 uppercase tracking-widest leading-tight">
              ¿ESTÁS DENTRO?
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-2xl md:text-4xl text-white font-cyber font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                NEON. <span className="text-neon-pink">DESEO.</span> SECRETO.
              </p>
              
              <p className="text-lg md:text-xl text-gray-400 font-tech tracking-wide">
                Una noche. Sin reglas. Solo tú y la música.
              </p>
            </div>

            <div className="mt-12 p-8 border border-neon-pink/30 bg-neon-pink/5 rounded-xl backdrop-blur-sm relative group hover:bg-neon-pink/10 transition-colors duration-500">
              <div className="absolute inset-0 bg-neon-pink/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-neon-pink font-cyber tracking-[0.2em] uppercase text-sm mb-3">DRESS CODE</p>
              <p className="text-white text-2xl md:text-3xl font-cyber font-bold italic mb-2 drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">"Sexy"</p>
              <p className="text-gray-400 text-base md:text-lg font-tech mt-2">Neon atrevido.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
