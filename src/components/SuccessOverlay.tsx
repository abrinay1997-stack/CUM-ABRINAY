import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface SuccessOverlayProps {
  show: boolean;
  onClose: () => void;
  name: string;
}

export default function SuccessOverlay({ show, onClose, name }: SuccessOverlayProps) {
  const [countdown, setCountdown] = useState(4);
  const [phase, setPhase] = useState<'scanning' | 'granted'>('scanning');

  useEffect(() => {
    if (!show) {
      setPhase('scanning');
      setCountdown(4);
      return;
    }

    // Brief scan phase then switch to "granted"
    const scanTimer = setTimeout(() => setPhase('granted'), 1200);

    return () => clearTimeout(scanTimer);
  }, [show]);

  useEffect(() => {
    if (!show || phase !== 'granted') return;

    setCountdown(4);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show, phase, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/97 overflow-hidden"
        >
          {/* Cyberpunk grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.025)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          {/* Horizontal scan line */}
          <motion.div
            initial={{ top: '-2px' }}
            animate={{ top: '102%' }}
            transition={{ duration: 1.1, ease: 'linear' }}
            className="absolute left-0 right-0 h-[2px] bg-neon-cyan/60 shadow-[0_0_24px_rgba(0,243,255,0.9),0_0_60px_rgba(0,243,255,0.4)] z-20 pointer-events-none"
          />

          {/* Corner brackets */}
          {[
            'top-8 left-8 border-t-2 border-l-2',
            'top-8 right-8 border-t-2 border-r-2',
            'bottom-8 left-8 border-b-2 border-l-2',
            'bottom-8 right-8 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`absolute w-12 h-12 border-neon-cyan/60 ${cls}`}
            />
          ))}

          {/* Scanning phase */}
          <AnimatePresence mode="wait">
            {phase === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center relative z-10"
              >
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-neon-cyan/20 border-t-neon-cyan"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-2 rounded-full border border-neon-purple/40 border-b-neon-purple"
                  />
                </div>
                <p className="text-neon-cyan font-cyber text-sm tracking-[0.5em] uppercase">
                  VERIFICANDO...
                </p>
              </motion.div>
            )}

            {/* Granted phase */}
            {phase === 'granted' && (
              <motion.div
                key="granted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-center relative z-10 px-6 max-w-lg mx-auto"
              >
                {/* Check icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }}
                  className="relative mx-auto w-20 h-20 mb-8 flex items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-full bg-neon-cyan/10 animate-ping" style={{ animationDuration: '1.5s' }} />
                  <div className="absolute inset-0 rounded-full border-2 border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.5)]" />
                  <Check className="w-10 h-10 text-neon-cyan relative z-10" strokeWidth={2.5} />
                </motion.div>

                {/* Status label */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-neon-cyan font-cyber text-xs tracking-[0.6em] uppercase mb-3"
                >
                  SISTEMA // VERIFICADO
                </motion.p>

                {/* Main heading with glitch */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 relative"
                >
                  <h1 className="text-6xl md:text-8xl font-cyber font-black text-white uppercase leading-none tracking-widest" style={{ textShadow: '0 0 40px rgba(0,243,255,0.6)' }}>
                    ACCESO
                  </h1>
                  {/* Glitch duplicate */}
                  <motion.h1
                    animate={{ x: [-3, 3, -3], opacity: [0, 0.6, 0] }}
                    transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 2.5 }}
                    className="absolute inset-0 text-6xl md:text-8xl font-cyber font-black text-neon-pink uppercase leading-none tracking-widest pointer-events-none"
                  >
                    ACCESO
                  </motion.h1>
                  <h1 className="text-6xl md:text-8xl font-cyber font-black text-neon-cyan uppercase leading-none tracking-widest" style={{ textShadow: '0 0 40px rgba(0,243,255,0.8)' }}>
                    CONCEDIDO
                  </h1>
                </motion.div>

                {/* Name */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-10 space-y-1"
                >
                  <p className="text-gray-500 font-tech text-xs tracking-[0.3em] uppercase">Bienvenido/a</p>
                  <p className="text-white font-cyber text-xl md:text-2xl tracking-widest">{name}</p>
                </motion.div>

                {/* Countdown ring */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                      <motion.circle
                        cx="28" cy="28" r="24"
                        fill="none"
                        stroke="#00f3ff"
                        strokeWidth="2"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        strokeDashoffset={`${2 * Math.PI * 24 * (countdown / 4)}`}
                        strokeLinecap="round"
                        transition={{ duration: 1, ease: 'linear' }}
                      />
                    </svg>
                    <span className="text-lg font-cyber text-white relative z-10">{countdown}</span>
                  </div>
                  <p className="text-gray-600 font-tech text-xs tracking-[0.3em] uppercase">
                    Revisa tu correo · Nos vemos el 7 de Marzo
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
