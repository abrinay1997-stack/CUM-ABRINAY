import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, Lock } from 'lucide-react';

interface RegistrationFormProps {
  onNewGuest: (name: string) => void;
}

export default function RegistrationForm({ onNewGuest }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAdult: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.isAdult) {
      alert("Por favor confirma que eres mayor de 18.");
      return;
    }

    setStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
    onNewGuest(formData.name);
    setFormData({ name: '', email: '', isAdult: false });
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="py-24 px-4 bg-black relative">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/20 blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-cyan/20 blur-[100px] pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-black/60 border border-white/10 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.1)] backdrop-blur-xl relative overflow-hidden"
        >
          {/* Top Border Gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple" />

          <div className="flex justify-center mb-6">
            <Lock className="w-8 h-8 text-neon-cyan mb-2" />
          </div>

          <h2 className="text-3xl font-cyber text-center text-white mb-2 uppercase tracking-wider">Asegura tu Lugar</h2>
          <p className="text-center text-gray-400 mb-8 text-sm font-tech">Entradas limitadas para los elegidos. Acceso encriptado.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-xs uppercase tracking-wider text-neon-cyan mb-2 font-cyber">Nombre Completo</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-tech text-lg placeholder-gray-600"
                placeholder="Tu Nombre"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neon-cyan mb-2 font-cyber">Correo Electrónico</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-tech text-lg placeholder-gray-600"
                placeholder="tu@email.com"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
              <input
                type="checkbox"
                id="age-check"
                required
                checked={formData.isAdult}
                onChange={e => setFormData({...formData, isAdult: e.target.checked})}
                className="mt-1 accent-neon-pink w-5 h-5"
              />
              <label htmlFor="age-check" className="text-sm text-gray-300 font-tech leading-tight">
                +18?
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80 text-white font-cyber font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(188,19,254,0.4)] transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest border border-white/20"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Procesando...
                </>
              ) : status === 'success' ? (
                <>
                  <Check className="w-5 h-5" /> Confirmado
                </>
              ) : (
                "Solicitar Acceso"
              )}
            </button>
            
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-neon-cyan text-center text-sm mt-2 font-tech"
              >
                Bienvenido a la lista. Nos pondremos en contacto.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
