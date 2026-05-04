import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PILLARS = [
  { label: 'Systems', icon: 'S' },
  { label: 'Automation', icon: 'A' },
  { label: 'AI', icon: 'I' },
  { label: 'Operations', icon: 'O' },
];

export function SceneConsulting() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 60),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{
        background: 'linear-gradient(135deg, #060c1c 0%, #0A1628 45%, #0d1e38 100%)',
        paddingLeft: '8vw',
        paddingRight: '8vw',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.16, ease: 'circOut' }}
    >
      {/* Top eyebrow */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5vh' }}
        initial={{ opacity: 0, x: -20 }}
        animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ width: '20px', height: '20px', background: '#4AC4E0', borderRadius: '50%' }} />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 'clamp(10px, 1.1vw, 16px)',
          color: '#4AC4E0',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Service 04
        </span>
      </motion.div>

      {/* Main headline — full width, large */}
      <div style={{ perspective: '1200px', marginBottom: '4vh' }}>
        {['FULL OPERATIONAL', 'ECOSYSTEM.'].map((line, li) => (
          <motion.div
            key={li}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 96px)',
              color: li === 1 ? '#4AC4E0' : '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              display: 'block',
            }}
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -30 }}
            transition={{ duration: 0.7, delay: li * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Rule */}
      <motion.div
        style={{ height: '2px', background: 'rgba(74,196,224,0.35)', marginBottom: '4vh', originX: 0, maxWidth: '60vw' }}
        initial={{ scaleX: 0 }}
        animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Four pillars */}
      <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 48px)', flexWrap: 'wrap' }}>
        {PILLARS.map((p, i) => (
          <motion.div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1vh',
              flex: '1 1 18%',
              minWidth: '120px',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon box */}
            <div style={{
              width: 'clamp(36px, 4vw, 60px)',
              height: 'clamp(36px, 4vw, 60px)',
              border: '1.5px solid rgba(74,196,224,0.5)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(74,196,224,0.07)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(14px, 1.8vw, 28px)',
                color: '#4AC4E0',
              }}>
                {p.icon}
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 'clamp(12px, 1.5vw, 22px)',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '-0.01em',
            }}>
              {p.label}
            </span>
            {/* Micro line */}
            <motion.div
              style={{ height: '1px', background: '#4AC4E0', originX: 0, width: '100%', maxWidth: '80px' }}
              initial={{ scaleX: 0 }}
              animate={phase >= 4 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        ))}
      </div>

      {/* Sub text */}
      <motion.p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 'clamp(12px, 1.5vw, 22px)',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '4vh',
          maxWidth: '55vw',
          lineHeight: 1.5,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        One partner. Every layer of your business — built, operated, and optimized.
      </motion.p>

      {/* Ambient drifting shapes */}
      <motion.div
        className="absolute"
        style={{ right: '10vw', top: '20vh', width: '18vw', height: '18vw', border: '1px solid rgba(74,196,224,0.08)', borderRadius: '50%' }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute"
        style={{ right: '14vw', top: '24vh', width: '10vw', height: '10vw', border: '1px solid rgba(74,196,224,0.14)', borderRadius: '50%' }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute"
        style={{ right: '18vw', top: '28vh', width: '4vw', height: '4vw', background: 'rgba(74,196,224,0.2)', borderRadius: '50%' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
