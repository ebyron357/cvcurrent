import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { SceneIntro } from './video_scenes/SceneIntro';
import { SceneSystemRescue } from './video_scenes/SceneSystemRescue';
import { SceneAI } from './video_scenes/SceneAI';
import { SceneGrowth } from './video_scenes/SceneGrowth';
import { SceneConsulting } from './video_scenes/SceneConsulting';
import { SceneOutro } from './video_scenes/SceneOutro';

export const SCENE_DURATIONS: Record<string, number> = {
  intro: 6000,
  systemRescue: 7000,
  aiServices: 7000,
  growthSystems: 6000,
  consulting: 6000,
  outro: 8000,
};

const SCENE_LABELS: Record<string, string> = {
  intro: 'Intro',
  systemRescue: 'System Rescue',
  aiServices: 'AI Services',
  growthSystems: 'Growth Systems',
  consulting: 'Consulting',
  outro: 'Outro',
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: SceneIntro,
  systemRescue: SceneSystemRescue,
  aiServices: SceneAI,
  growthSystems: SceneGrowth,
  consulting: SceneConsulting,
  outro: SceneOutro,
};

const PERSISTENT_ORBS = [
  { w: '50vw', h: '50vw', color: 'rgba(74,196,224,0.07)', left: '60%', top: '-20%' },
  { w: '35vw', h: '35vw', color: 'rgba(74,196,224,0.05)', left: '-10%', top: '50%' },
  { w: '20vw', h: '20vw', color: 'rgba(74,196,224,0.09)', left: '40%', top: '60%' },
];

const ACCENT_LINE_POSITIONS: { top: string; left: string; width: string }[] = [
  { top: '12vh', left: '0', width: '55vw' },
  { top: '88vh', left: '20vw', width: '40vw' },
  { top: '50vh', left: '0', width: '30vw' },
  { top: '20vh', left: '55vw', width: '35vw' },
  { top: '70vh', left: '5vw', width: '45vw' },
  { top: '15vh', left: '30vw', width: '50vw' },
];

const ACCENT_ORB_POS: { x: string; y: string; scale: number; opacity: number }[] = [
  { x: '45vw', y: '35vh', scale: 3, opacity: 0.08 },
  { x: '5vw', y: '10vh', scale: 1.2, opacity: 0.1 },
  { x: '70vw', y: '60vh', scale: 1.6, opacity: 0.07 },
  { x: '15vw', y: '75vh', scale: 1, opacity: 0.09 },
  { x: '60vw', y: '20vh', scale: 2, opacity: 0.06 },
  { x: '35vw', y: '50vh', scale: 2.5, opacity: 0.05 },
];

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
  isPaused = false,
  watermarkPosition = 'top-left',
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
  isPaused?: boolean;
  watermarkPosition?: 'top-left' | 'bottom-right';
} = {}) {
  const { currentScene, currentSceneKey, jumpToScene, sceneKeys, sceneStartTime, sceneDuration } =
    useVideoPlayer({ durations, loop, isPaused });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  // Scene progress bar (0–1) via animation frame
  const [sceneProgress, setSceneProgress] = useState(0);
  useEffect(() => {
    setSceneProgress(0);
    if (isPaused) return;
    let rafId: number;
    const tick = () => {
      const elapsed = Date.now() - sceneStartTime;
      setSceneProgress(Math.min(1, elapsed / sceneDuration));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [sceneStartTime, sceneDuration, isPaused]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];
  const accentPos = ACCENT_LINE_POSITIONS[sceneIndex] ?? ACCENT_LINE_POSITIONS[0];
  const orbPos = ACCENT_ORB_POS[sceneIndex] ?? ACCENT_ORB_POS[0];

  const isMiddleScene = baseSceneKey !== 'intro' && baseSceneKey !== 'outro';

  // Watermark position styles
  const wmStyle: React.CSSProperties =
    watermarkPosition === 'bottom-right'
      ? { right: '4vw', bottom: '8vh', left: 'auto', top: 'auto' }
      : { left: '8vw', top: '5.5vh' };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Scene progress bar — top edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(74,196,224,0.12)',
          zIndex: 60,
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, rgba(74,196,224,0.6), rgba(74,196,224,1))',
            transformOrigin: 'left center',
          }}
          animate={{ width: `${sceneProgress * 100}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      {/* Persistent background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {PERSISTENT_ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.w,
              height: orb.h,
              background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
              left: orb.left,
              top: orb.top,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Grid dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(74,196,224,0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Persistent accent orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '20vw',
          height: '20vw',
          background: 'radial-gradient(circle, rgba(74,196,224,0.15), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        animate={{
          x: orbPos.x,
          y: orbPos.y,
          scale: orbPos.scale,
          opacity: orbPos.opacity,
        }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Persistent teal accent line */}
      <motion.div
        className="absolute"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(74,196,224,0.6), rgba(74,196,224,0))',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        animate={{
          top: accentPos.top,
          left: accentPos.left,
          width: accentPos.width,
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          top: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          left: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          width: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Scene foreground content */}
      <AnimatePresence initial={false} mode="popLayout">
        {SceneComponent && (
          <SceneComponent key={currentSceneKey} />
        )}
      </AnimatePresence>

      {/* Pause overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            key="pause-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(4,11,24,0.45)',
              zIndex: 55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              width: 'clamp(52px, 5vw, 80px)',
              height: 'clamp(52px, 5vw, 80px)',
              borderRadius: '50%',
              background: 'rgba(10,22,40,0.8)',
              border: '1.5px solid rgba(74,196,224,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(4px, 0.4vw, 8px)',
            }}>
              {/* Pause icon bars */}
              {[0, 1].map((i) => (
                <div key={i} style={{
                  width: 'clamp(4px, 0.4vw, 7px)',
                  height: 'clamp(18px, 1.8vw, 28px)',
                  borderRadius: '2px',
                  background: '#4AC4E0',
                }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene selector */}
      <div
        className="absolute bottom-6 left-1/2 flex items-center gap-3 px-4 py-2 rounded-full"
        style={{
          transform: 'translateX(-50%)',
          background: 'rgba(10,22,40,0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(74,196,224,0.15)',
          zIndex: 50,
        }}
      >
        {sceneKeys.map((key, index) => {
          const isActive = baseSceneKey === key;
          return (
            <button
              key={key}
              onClick={() => jumpToScene(index)}
              title={SCENE_LABELS[key] ?? key}
              className="flex flex-col items-center gap-1 group"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
            >
              <motion.div
                animate={{
                  width: isActive ? 24 : 8,
                  background: isActive
                    ? 'rgba(74,196,224,1)'
                    : 'rgba(74,196,224,0.35)',
                  boxShadow: isActive ? '0 0 8px rgba(74,196,224,0.7)' : 'none',
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: 8, borderRadius: 4, flexShrink: 0 }}
              />
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0,
                  height: isActive ? 'auto' : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: 9,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  color: 'rgba(74,196,224,0.9)',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  display: 'block',
                  lineHeight: 1.2,
                }}
              >
                {SCENE_LABELS[key] ?? key}
              </motion.span>
            </button>
          );
        })}
      </div>

      {/* Persistent watermark — fades in on middle scenes, hidden on intro/outro */}
      <motion.div
        className="absolute"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 50,
          pointerEvents: 'none',
          ...wmStyle,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMiddleScene ? 0.35 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* CV diamond mark */}
        <div
          style={{
            width: 'clamp(22px, 2.2vw, 36px)',
            height: 'clamp(22px, 2.2vw, 36px)',
            background: 'linear-gradient(135deg, #4AC4E0 0%, #2a8fa8 100%)',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(10px, 1vw, 17px)',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>
            CV
          </span>
        </div>

        {/* Wordmark text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(12px, 1.2vw, 20px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            Client<span style={{ color: '#4AC4E0' }}>Verse</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 'clamp(7px, 0.6vw, 9px)',
            color: 'rgba(74,196,224,0.7)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            Business OS
          </span>
        </div>
      </motion.div>
    </div>
  );
}
