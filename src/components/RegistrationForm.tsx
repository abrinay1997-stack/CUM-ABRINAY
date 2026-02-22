import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Lock, AlertCircle } from 'lucide-react';
import SuccessOverlay from './SuccessOverlay';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ name: '', email: '', isAdult: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [registeredName, setRegisteredName] = useState('');
  const [confirmedCount, setConfirmedCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/signatures')
      .then(r => r.ok ? r.json() : [])
      .then((data: Array<{ id: string }>) => setConfirmedCount(data.length))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name.trim(), email: formData.email.trim() }),
      });

      if (response.ok) {
        setRegisteredName(formData.name.trim());
        setFormData({ name: '', email: '', isAdult: false });
        setStatus('idle');
        setShowOverlay(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.error || 'Error del servidor. Intenta de nuevo.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Sin conexión. Verifica tu internet e intenta de nuevo.');
      setStatus('error');
    }
  };

  return (
    <>
      <SuccessOverlay
        show={showOverlay}
        onClose={() => setShowOverlay(false)}
        name={registeredName}
      />

      <section id="registro" className="py-24 px-4 bg-black relative">
        {/* Background glows */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/20 blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-cyan/20 blur-[100px] pointer-events-none" />

        <div className="max-w-md mx-auto relative z-10">

          {/* Urgency badge */}
          {confirmedCount !== null && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-tech text-xs text-gray-300 tracking-widest uppercase">
                <span className="text-white font-bold">{confirmedCount}</span> ya confirmaron · Lugares limitados
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black/60 border border-white/10 p-8 rounded-2xl shadow-[0_0_60px_rgba(188,19,254,0.15)] backdrop-blur-xl relative overflow-hidden"
          >
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple" />

            <div className="flex justify-center mb-6">
              <Lock className="w-8 h-8 text-neon-cyan drop-shadow-[0_0_12px_rgba(0,243,255,0.8)]" />
            </div>

            <h2 className="text-4xl font-cyber text-center text-white mb-2 uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Asegura tu Lugar
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm font-tech">
              Entradas limitadas para los elegidos. Acceso encriptado.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neon-cyan mb-2 font-cyber">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-tech text-lg placeholder-gray-600"
                  placeholder="Tu Nombre"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neon-cyan mb-2 font-cyber">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={e => setFormData({ ...formData, isAdult: e.target.checked })}
                  className="mt-1 accent-neon-pink w-5 h-5 cursor-pointer"
                />
                <label htmlFor="age-check" className="text-sm text-gray-300 font-tech leading-tight cursor-pointer">
                  Confirmo que soy mayor de <span className="text-neon-pink font-bold">18 años</span>
                </label>
              </div>

              {/* Error message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-tech"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-cyber font-bold py-5 rounded-xl shadow-[0_0_40px_rgba(188,19,254,0.5)] hover:shadow-[0_0_60px_rgba(188,19,254,0.7)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-lg border border-white/20"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Procesando...
                  </>
                ) : (
                  'Solicitar Acceso'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
