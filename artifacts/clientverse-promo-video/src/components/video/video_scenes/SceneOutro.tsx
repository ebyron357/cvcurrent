import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TAGLINE_WORDS = ['Systems.', 'Automation.', 'AI.', 'Operations.'];

export function SceneOutro() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const letters = 'ClientVerse'.split('');

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #07111f 0%, #0A1628 50%, #091321 100%)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'circOut' }}
    >
      {/* Expanding rings */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            border: `1px solid rgba(74,196,224,${0.15 - i * 0.04})`,
            width: `${18 + i * 16}vw`,
            height: `${18 + i * 16}vw`,
          }}
          animate={phase >= 1 ? {
            scale: [1, 1.08, 1],
            opacity: [0.4 - i * 0.1, 0.7 - i * 0.15, 0.4 - i * 0.1],
          } : { scale: 0, opacity: 0 }}
          initial={{ scale: 0, opacity: 0 }}
          transition={{
            scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
            opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
            default: { duration: 0.8, delay: i * 0.1 },
          }}
        />
      ))}

      {/* Center teal dot */}
      <motion.div
        style={{
          width: 'clamp(12px, 1.5vw, 24px)',
          height: 'clamp(12px, 1.5vw, 24px)',
          background: '#4AC4E0',
          borderRadius: '50%',
          marginBottom: '4vh',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />

      {/* Logo name — character reveal */}
      <div style={{ perspective: '1400px', marginBottom: '3vh' }}>
        <div className="flex" style={{ gap: '0.01em' }}>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(48px, 8vw, 140px)',
                color: i < 6 ? '#ffffff' : '#4AC4E0',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
              initial={{ opacity: 0, y: 70, rotateX: -50 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 70, rotateX: -50 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 24,
                delay: phase >= 2 ? i * 0.04 : 0,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Horizontal rule */}
      <motion.div
        style={{ width: '32vw', height: '2px', background: 'linear-gradient(90deg, transparent, #4AC4E0, transparent)', marginBottom: '3.5vh' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={phase >= 3 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Tagline words */}
      <div className="flex flex-wrap justify-center" style={{ gap: 'clamp(6px, 1.5vw, 20px)', maxWidth: '70vw' }}>
        {TAGLINE_WORDS.map((word, i) => (
          <motion.span
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 'clamp(14px, 2vw, 32px)',
              color: i === TAGLINE_WORDS.length - 1 ? '#4AC4E0' : 'rgba(255,255,255,0.75)',
              letterSpacing: '0.02em',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Final line */}
      <motion.p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 'clamp(11px, 1.3vw, 20px)',
          color: 'rgba(255,255,255,0.4)',
          marginTop: '3vh',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        One partner.
      </motion.p>

      {/* Teal bottom bar that grows */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '3px', background: 'linear-gradient(90deg, transparent 0%, #4AC4E0 50%, transparent 100%)', originX: 0.5 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={phase >= 5 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
