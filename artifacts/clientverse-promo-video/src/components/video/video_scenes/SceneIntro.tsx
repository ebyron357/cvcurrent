import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function SceneIntro() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 350),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1800),
      setTimeout(() => setPhase(5), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const headline = 'THE OPERATIONAL BACKBONE'.split('');
  const subline = 'Your Company Has Been Missing.';

  return (
    <motion.div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0d1f3d 60%, #071021 100%)' }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.18, ease: 'circOut' }}
    >
      {/* ClientVerse wordmark — top-left logo lockup */}
      <motion.div
        className="absolute"
        style={{ left: '8vw', top: '5.5vh', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        initial={{ opacity: 0, y: -10 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* CV diamond mark */}
        <motion.div
          style={{
            width: 'clamp(28px, 3vw, 46px)',
            height: 'clamp(28px, 3vw, 46px)',
            background: 'linear-gradient(135deg, #4AC4E0 0%, #2a8fa8 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 20px rgba(74,196,224,0.35)',
          }}
          initial={{ scale: 0, rotate: -20 }}
          animate={phase >= 1 ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.05 }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(13px, 1.4vw, 22px)',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>
            CV
          </span>
        </motion.div>

        {/* Wordmark text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(15px, 1.6vw, 26px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            Client<span style={{ color: '#4AC4E0' }}>Verse</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 'clamp(8px, 0.75vw, 11px)',
            color: 'rgba(74,196,224,0.7)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            Business OS
          </span>
        </div>
      </motion.div>

      {/* Teal accent bar — draws in */}
      <motion.div
        className="absolute left-0"
        style={{ top: '17vh', height: '2px', background: 'linear-gradient(90deg, #4AC4E0, rgba(74,196,224,0))', originX: 0 }}
        initial={{ scaleX: 0, width: '55vw' }}
        animate={phase >= 1 ? { scaleX: 1, width: '55vw' } : { scaleX: 0, width: '55vw' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Floating accent dot cluster */}
      <motion.div
        className="absolute"
        style={{ right: '8vw', top: '20vh' }}
        animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[0, 1, 2, 3, 4, 5].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              background: '#4AC4E0',
              left: `${(i % 3) * 18}px`,
              top: `${Math.floor(i / 3) * 18}px`,
              opacity: 0.4 + (i % 3) * 0.15,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 1 ? { scale: 1, opacity: 0.4 + (i % 3) * 0.15 } : { scale: 0, opacity: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 20 }}
          />
        ))}
      </motion.div>

      {/* Main headline — character stagger */}
      <div
        className="absolute"
        style={{ left: '8vw', top: '24vh', perspective: '1200px' }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.88 }}>
          <div className="flex flex-wrap" style={{ maxWidth: '80vw' }}>
            {headline.map((char, i) => (
              <motion.span
                key={i}
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(48px, 7.5vw, 130px)',
                  color: char === ' ' ? 'transparent' : '#ffffff',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  minWidth: char === ' ' ? '0.3em' : undefined,
                }}
                initial={{ opacity: 0, y: 60, rotateX: -45 }}
                animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -45 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 28,
                  delay: phase >= 2 ? i * 0.018 : 0,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Teal underline rule */}
        <motion.div
          style={{ height: '3px', background: '#4AC4E0', marginTop: '2vh', originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subline */}
        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(16px, 2.2vw, 38px)',
            color: 'rgba(255,255,255,0.65)',
            marginTop: '2.5vh',
            letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {subline}
        </motion.p>

        {/* CTA tag */}
        <motion.div
          style={{ marginTop: '3vh', display: 'flex', alignItems: 'center', gap: '1rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ width: '28px', height: '2px', background: '#4AC4E0' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'clamp(11px, 1.3vw, 20px)',
            color: '#4AC4E0',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            The Platform Built For Growth
          </span>
        </motion.div>
      </div>

      {/* Right-side animated blueprint lines */}
      <div className="absolute" style={{ right: '5vw', top: '35vh', width: '28vw', height: '40vh' }}>
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i * 28}%`,
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(74,196,224,0.15)',
              originY: 0,
            }}
            initial={{ scaleY: 0 }}
            animate={phase >= 3 ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${(i + 1) * 25}%`,
              left: 0,
              right: 0,
              height: '1px',
              background: 'rgba(74,196,224,0.15)',
              originX: 0,
            }}
            initial={{ scaleX: 0 }}
            animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {/* Corner accent */}
        <motion.div
          className="absolute"
          style={{ top: 0, left: 0, width: '24px', height: '24px', borderTop: '2px solid #4AC4E0', borderLeft: '2px solid #4AC4E0' }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
        <motion.div
          className="absolute"
          style={{ bottom: 0, right: 0, width: '24px', height: '24px', borderBottom: '2px solid #4AC4E0', borderRight: '2px solid #4AC4E0' }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </div>

      {/* Continuous drift element for dead-time coverage */}
      <motion.div
        className="absolute"
        style={{ bottom: '12vh', right: '14vw', width: '6vw', height: '6vw', borderRadius: '50%', border: '1px solid rgba(74,196,224,0.2)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{ bottom: '10vh', right: '12vw', width: '3vw', height: '3vw', borderRadius: '50%', border: '1px solid rgba(74,196,224,0.35)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
    </motion.div>
  );
}
