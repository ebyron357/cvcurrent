import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const SERVICES = [
  { label: 'System Audit™', symbol: '01' },
  { label: 'System Cleanup™', symbol: '02' },
  { label: 'System Rebuild™', symbol: '03' },
  { label: 'System Migration™', symbol: '04' },
  { label: 'System Optimization™', symbol: '05' },
];

export function SceneSystemRescue() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 60),
      setTimeout(() => setPhase(2), 350),
      setTimeout(() => setPhase(3), 800),
      setTimeout(() => setPhase(4), 1400),
      setTimeout(() => setPhase(5), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex"
      style={{ background: 'linear-gradient(135deg, #070f1f 0%, #0A1628 50%, #091420 100%)' }}
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.18, ease: 'circOut' }}
    >
      {/* Left column — ~55% */}
      <div className="relative flex flex-col justify-center" style={{ width: '52%', paddingLeft: '8vw', paddingRight: '4vw' }}>
        {/* Eyebrow tag */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, x: -20 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ width: '20px', height: '20px', background: '#4AC4E0', borderRadius: '2px' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'clamp(10px, 1.1vw, 16px)',
            color: '#4AC4E0',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Service 01
          </span>
        </motion.div>

        {/* Main title */}
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em', perspective: '1000px' }}>
          {['SYSTEM', 'RESCUE™'].map((word, wi) => (
            <motion.div
              key={wi}
              style={{
                fontSize: 'clamp(40px, 6.5vw, 110px)',
                color: wi === 1 ? '#4AC4E0' : '#ffffff',
                display: 'block',
              }}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -30 }}
              transition={{ duration: 0.7, delay: wi * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          style={{ height: '2px', background: 'rgba(74,196,224,0.35)', marginTop: '3vh', originX: 0, maxWidth: '80%' }}
          initial={{ scaleX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />

        {/* Description */}
        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.6vw, 24px)',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '2.5vh',
            lineHeight: 1.5,
            maxWidth: '36vw',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          We audit, clean, rebuild, and optimize broken systems — fast.
        </motion.p>

        {/* Pulsing indicator */}
        <motion.div
          style={{ marginTop: '4vh', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            style={{ width: '8px', height: '8px', background: '#4AC4E0', borderRadius: '50%' }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(10px, 1vw, 14px)', color: '#4AC4E0', letterSpacing: '0.1em' }}>
            ACTIVE ENGAGEMENT
          </span>
        </motion.div>
      </div>

      {/* Vertical divider */}
      <motion.div
        style={{ width: '1px', background: 'rgba(74,196,224,0.2)', alignSelf: 'stretch', originY: 0.5 }}
        initial={{ scaleY: 0 }}
        animate={phase >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Right column — services list */}
      <div className="relative flex flex-col justify-center" style={{ flex: 1, paddingLeft: '4vw', paddingRight: '6vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.8vh, 28px)' }}>
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}
              initial={{ opacity: 0, x: 40 }}
              animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: 'clamp(10px, 1vw, 15px)',
                color: '#4AC4E0',
                opacity: 0.7,
                minWidth: '2.5em',
                letterSpacing: '0.08em',
              }}>
                {svc.symbol}
              </span>
              <motion.div
                style={{ flex: 1, height: '1px', background: 'rgba(74,196,224,0.25)', originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(13px, 1.6vw, 24px)',
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>
                {svc.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Continuously drifting accent for dead-time coverage */}
        <motion.div
          className="absolute"
          style={{ bottom: '15vh', right: '5vw', width: '5vw', height: '5vw', border: '1px solid rgba(74,196,224,0.2)', borderRadius: '4px' }}
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
