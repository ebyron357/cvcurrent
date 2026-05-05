import { useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import VideoTemplate from './VideoTemplate';
import { useAudioEngine } from '@/hooks/useAudioEngine';

export default function VideoWithControls() {
  const { isMuted, toggleMute, playTransitionSfx } = useAudioEngine();
  const prevSceneRef = useRef<string | null>(null);

  const handleSceneChange = useCallback(
    (sceneKey: string) => {
      if (prevSceneRef.current !== null && prevSceneRef.current !== sceneKey) {
        playTransitionSfx();
      }
      prevSceneRef.current = sceneKey;
    },
    [playTransitionSfx],
  );

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoTemplate onSceneChange={handleSceneChange} />

      {/* Mute toggle — floating control in bottom-right */}
      <div
        className="absolute"
        style={{ bottom: '3vh', right: '2.5vw', zIndex: 50 }}
      >
        <motion.button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 'clamp(36px, 3.2vw, 52px)',
            height: 'clamp(36px, 3.2vw, 52px)',
            background: 'rgba(10,22,40,0.75)',
            border: '1px solid rgba(74,196,224,0.3)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            outline: 'none',
          }}
          whileHover={{ scale: 1.1, borderColor: 'rgba(74,196,224,0.7)' }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMuted ? (
              <motion.span
                key="muted"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <VolumeX
                  style={{
                    color: 'rgba(74,196,224,0.55)',
                    width: 'clamp(16px, 1.5vw, 24px)',
                    height: 'clamp(16px, 1.5vw, 24px)',
                  }}
                  strokeWidth={1.75}
                />
              </motion.span>
            ) : (
              <motion.span
                key="unmuted"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Volume2
                  style={{
                    color: '#4AC4E0',
                    width: 'clamp(16px, 1.5vw, 24px)',
                    height: 'clamp(16px, 1.5vw, 24px)',
                  }}
                  strokeWidth={1.75}
                />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulse ring when unmuted */}
          <AnimatePresence>
            {!isMuted && (
              <motion.span
                key="pulse"
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(74,196,224,0.4)' }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip label */}
        <motion.div
          style={{
            position: 'absolute',
            right: '110%',
            top: '50%',
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(10px, 0.85vw, 13px)',
            color: 'rgba(74,196,224,0.7)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: isMuted ? 0.8 : 0, x: isMuted ? 0 : 4 }}
          transition={{ duration: 0.3 }}
        >
          Click for audio
        </motion.div>
      </div>
    </div>
  );
}
