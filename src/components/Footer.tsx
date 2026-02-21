import { Instagram, Twitter, Mail, Disc } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-4 border-t border-white/10 relative overflow-hidden">
      {/* Decorative neon line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-[0_0_10px_#00f3ff]" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="mb-8 p-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
          <Disc className="w-8 h-8 text-neon-pink animate-spin-slow" />
        </div>

        <h3 className="text-3xl font-cyber text-white mb-8 tracking-widest">
          LICENCIA <span className="text-neon-pink">P</span>
        </h3>
        
        <div className="flex gap-8 mb-10">
          <a href="#" className="group p-3 rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300">
            <Instagram className="w-6 h-6 text-gray-400 group-hover:text-neon-cyan transition-colors" />
          </a>
          <a href="#" className="group p-3 rounded-full bg-white/5 border border-white/10 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300">
            <Twitter className="w-6 h-6 text-gray-400 group-hover:text-neon-purple transition-colors" />
          </a>
          <a href="#" className="group p-3 rounded-full bg-white/5 border border-white/10 hover:border-neon-pink hover:bg-neon-pink/10 transition-all duration-300">
            <Mail className="w-6 h-6 text-gray-400 group-hover:text-neon-pink transition-colors" />
          </a>
        </div>
        
        <div className="text-xs md:text-sm text-gray-500 space-y-3 font-tech">
          <p>© 2026 Abrinay. Todos los derechos reservados.</p>
          <p className="text-neon-yellow font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse" />
            Evento Estrictamente +18. ID Requerido.
          </p>
        </div>
      </div>
    </footer>
  );
}
