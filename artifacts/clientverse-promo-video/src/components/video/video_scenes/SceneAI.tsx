import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const NODES = [
  { cx: 50, cy: 50, r: 22 },
  { cx: 20, cy: 15, r: 10 },
  { cx: 80, cy: 15, r: 10 },
  { cx: 5, cy: 55, r: 7 },
  { cx: 95, cy: 55, r: 7 },
  { cx: 30, cy: 85, r: 9 },
  { cx: 70, cy: 85, r: 9 },
];

const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
];

export function SceneAI() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 60),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 800),
      setTimeout(() => setPhase(4), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex"
      style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0A1628 40%, #091625 100%)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.16, ease: 'circOut' }}
    >
      {/* Right side — network SVG visualization */}
      <div className="absolute" style={{ right: '4vw', top: '10vh', width: '38vw', height: '80vh' }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
          {/* Connection lines */}
          {CONNECTIONS.map(([from, to], i) => (
            <motion.line
              key={i}
              x1={NODES[from].cx}
              y1={NODES[from].cy}
              x2={NODES[to].cx}
              y2={NODES[to].cy}
              stroke="#4AC4E0"
              strokeWidth="0.4"
              strokeOpacity="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Nodes */}
          {NODES.map((node, i) => (
            <g key={i}>
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="none"
                stroke="#4AC4E0"
                strokeWidth={i === 0 ? '0.8' : '0.5'}
                strokeOpacity={i === 0 ? 0.9 : 0.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.1 + i * 0.06 }}
                style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
              />
              {i === 0 && (
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r * 0.5}
                  fill="#4AC4E0"
                  fillOpacity="0.25"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={phase >= 2 ? { scale: [1, 1.4, 1], opacity: [0.25, 0.4, 0.25] } : { scale: 0, opacity: 0 }}
                  transition={{
                    scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                />
              )}
            </g>
          ))}

          {/* Traveling pulse on one connection */}
          <motion.circle
            r="1.5"
            fill="#4AC4E0"
            fillOpacity="0.9"
            animate={phase >= 3 ? {
              cx: [NODES[0].cx, NODES[1].cx, NODES[0].cx, NODES[2].cx, NODES[0].cx],
              cy: [NODES[0].cy, NODES[1].cy, NODES[0].cy, NODES[2].cy, NODES[0].cy],
            } : { cx: NODES[0].cx, cy: NODES[0].cy }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Left side — text content */}
      <div className="absolute flex flex-col justify-center" style={{ left: '8vw', top: 0, bottom: 0, width: '50vw' }}>
        {/* Eyebrow */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2vh' }}
          initial={{ opacity: 0, x: -20 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ width: '20px', height: '20px', background: '#4AC4E0', borderRadius: '2px', transform: 'rotate(45deg)' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'clamp(10px, 1.1vw, 16px)',
            color: '#4AC4E0',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Service 02
          </span>
        </motion.div>

        <div style={{ perspective: '1000px' }}>
          {['AI', 'SERVICES'].map((word, wi) => (
            <motion.div
              key={wi}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(52px, 8vw, 140px)',
                color: wi === 0 ? '#4AC4E0' : '#ffffff',
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
                display: 'block',
              }}
              initial={{ opacity: 0, y: 55, rotateX: -35 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 55, rotateX: -35 }}
              transition={{ duration: 0.65, delay: wi * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        {/* Rule */}
        <motion.div
          style={{ height: '2px', background: 'rgba(74,196,224,0.4)', marginTop: '3vh', marginBottom: '3vh', originX: 0, maxWidth: '42vw' }}
          initial={{ scaleX: 0 }}
          animate={phase >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Three pillars */}
        {['Automation.', 'Intelligence.', 'Scale.'].map((txt, i) => (
          <motion.div
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: i === 2 ? 700 : 400,
              fontSize: 'clamp(14px, 2vw, 34px)',
              color: i === 2 ? '#4AC4E0' : 'rgba(255,255,255,0.75)',
              letterSpacing: '-0.01em',
              marginBottom: '0.6vh',
            }}
            initial={{ opacity: 0, x: -24 }}
            animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.5, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {txt}
          </motion.div>
        ))}
      </div>

      {/* Ambient drift element for continuous motion */}
      <motion.div
        className="absolute"
        style={{ bottom: '8vh', left: '8vw', width: '4vw', height: '4vw', borderRadius: '50%', border: '1px solid rgba(74,196,224,0.25)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
