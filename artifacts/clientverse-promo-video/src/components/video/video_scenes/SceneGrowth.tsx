import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const BARS = [
  { h: 30, label: 'Q1' },
  { h: 48, label: 'Q2' },
  { h: 65, label: 'Q3' },
  { h: 88, label: 'Q4' },
];

export function SceneGrowth() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 60),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #071120 0%, #0A1628 55%, #060e1d 100%)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.15, ease: 'circOut' }}
    >
      {/* Diagonal stripe accents */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: 0,
            bottom: 0,
            left: `${72 + i * 8}vw`,
            width: '1px',
            background: `rgba(74,196,224,${0.08 - i * 0.02})`,
            transform: 'skewX(-12deg)',
          }}
          initial={{ scaleY: 0 }}
          animate={phase >= 1 ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Main content — left 60% */}
      <div className="absolute flex flex-col justify-center" style={{ left: '8vw', top: 0, bottom: 0, width: '55vw' }}>
        {/* Eyebrow */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2vh' }}
          initial={{ opacity: 0, x: -20 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <motion.polyline
              points="2,16 6,10 10,12 14,6 18,4"
              stroke="#4AC4E0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </svg>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'clamp(10px, 1.1vw, 16px)',
            color: '#4AC4E0',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Service 03
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ perspective: '1000px' }}>
          {['GROWTH', 'SYSTEMS'].map((word, wi) => (
            <motion.div
              key={wi}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(48px, 7.5vw, 130px)',
                color: '#ffffff',
                letterSpacing: '-0.04em',
                lineHeight: 0.87,
                display: 'block',
              }}
              initial={{ opacity: 0, y: 50, rotateX: -35 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -35 }}
              transition={{ duration: 0.65, delay: wi * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        {/* Teal accent word */}
        <motion.div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(48px, 7.5vw, 130px)',
            color: '#4AC4E0',
            letterSpacing: '-0.04em',
            lineHeight: 0.87,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          ENGINE.
        </motion.div>

        {/* Divider + description */}
        <motion.div
          style={{ height: '2px', background: 'rgba(74,196,224,0.35)', marginTop: '3vh', originX: 0, maxWidth: '40vw' }}
          initial={{ scaleX: 0 }}
          animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.7vw, 26px)',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '2.5vh',
            maxWidth: '38vw',
            lineHeight: 1.5,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Lead generation, CRM pipelines, and conversion systems that compound.
        </motion.p>
      </div>

      {/* Right side — animated bar chart */}
      <div
        className="absolute flex items-end"
        style={{ right: '8vw', bottom: '18vh', gap: 'clamp(8px, 2vw, 28px)', height: '42vh' }}
      >
        {BARS.map((bar, i) => (
          <div key={i} className="flex flex-col items-center" style={{ gap: '0.8vh' }}>
            <motion.div
              style={{
                width: 'clamp(24px, 4vw, 56px)',
                background: i === BARS.length - 1
                  ? '#4AC4E0'
                  : `rgba(74,196,224,${0.25 + i * 0.15})`,
                borderRadius: '3px 3px 0 0',
                originY: 1,
              }}
              initial={{ scaleY: 0, height: `${bar.h}%` }}
              animate={phase >= 3 ? { scaleY: 1, height: `${bar.h}%` } : { scaleY: 0, height: `${bar.h}%` }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'clamp(9px, 0.9vw, 13px)',
                color: i === BARS.length - 1 ? '#4AC4E0' : 'rgba(255,255,255,0.4)',
                letterSpacing: '0.05em',
              }}
              initial={{ opacity: 0 }}
              animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              {bar.label}
            </motion.span>
          </div>
        ))}

        {/* Arrow up */}
        <motion.div
          style={{ alignSelf: 'flex-start', marginBottom: '2vh' }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: [0, -8, 0] } : { opacity: 0, y: 20 }}
          transition={phase >= 4 ? {
            opacity: { duration: 0.3 },
            y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          } : { duration: 0.3 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <polyline points="8,24 16,8 24,24" stroke="#4AC4E0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* Baseline */}
      <motion.div
        className="absolute"
        style={{ right: '6vw', bottom: '18vh', left: '55vw', height: '1px', background: 'rgba(74,196,224,0.3)', originX: 1 }}
        initial={{ scaleX: 0 }}
        animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      {/* Continuous orbit ring */}
      <motion.div
        className="absolute"
        style={{ bottom: '10vh', left: '4vw', width: '5vw', height: '5vw', border: '1px solid rgba(74,196,224,0.2)', borderRadius: '50%' }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}
