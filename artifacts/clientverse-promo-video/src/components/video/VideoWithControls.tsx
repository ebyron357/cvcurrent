import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Download, Loader2, X } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useAudioEngine } from '@/hooks/useAudioEngine';

const TOTAL_VIDEO_MS = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
const TOTAL_VIDEO_S = Math.ceil(TOTAL_VIDEO_MS / 1000);

type Resolution = '720p' | '1080p';

declare global {
  interface Window {
    recordingResolution?: Resolution;
    recordingWidth?: number;
    recordingHeight?: number;
  }
}

const RESOLUTIONS: { label: Resolution; width: number; height: number; desc: string }[] = [
  { label: '720p', width: 1280, height: 720, desc: 'HD · Fast export' },
  { label: '1080p', width: 1920, height: 1080, desc: 'Full HD · Best quality' },
];

const SESSION_KEY = 'cv_export_resolution';

function getSessionResolution(): Resolution {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === '720p' || stored === '1080p') return stored;
  } catch {}
  return '1080p';
}

export default function VideoWithControls() {
  const { isMuted, toggleMute, playTransitionSfx, setScene } = useAudioEngine();
  const prevSceneRef = useRef<string | null>(null);

  // Increment to force-remount VideoTemplate (restarts recording lifecycle)
  const [videoKey, setVideoKey] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_VIDEO_S);
  const exportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exportStartRef = useRef<number>(0);

  // Quality picker state
  const [showPicker, setShowPicker] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(getSessionResolution);

  const handleSceneChange = useCallback(
    (sceneKey: string) => {
      if (prevSceneRef.current !== null && prevSceneRef.current !== sceneKey) {
        playTransitionSfx();
      }
      setScene(sceneKey);
      prevSceneRef.current = sceneKey;
    },
    [playTransitionSfx, setScene],
  );

  const handleExportClick = useCallback(() => {
    if (isExporting) return;
    setShowPicker(true);
  }, [isExporting]);

  const handleResolutionSelect = useCallback((res: Resolution) => {
    setSelectedResolution(res);
    try { sessionStorage.setItem(SESSION_KEY, res); } catch {}
  }, []);

  const handleStartExport = useCallback(() => {
    setShowPicker(false);

    // Clear any previous timers
    if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Expose the chosen resolution globally so the recording infrastructure
    // (or any consumer of window.startRecording) can read it before capture begins.
    const res = RESOLUTIONS.find(r => r.label === selectedResolution) ?? RESOLUTIONS[1];
    window.recordingResolution = selectedResolution;
    window.recordingWidth = res.width;
    window.recordingHeight = res.height;

    // Force-remount VideoTemplate so useVideoPlayer re-runs its mount effect,
    // which calls window.startRecording?.() and then window.stopRecording?.()
    // automatically at the end of the full playthrough.
    prevSceneRef.current = null;
    exportStartRef.current = Date.now();
    setSecondsRemaining(TOTAL_VIDEO_S);
    setIsExporting(true);
    setVideoKey(k => k + 1);

    // Tick countdown every 250ms for smooth updates
    countdownRef.current = setInterval(() => {
      const elapsed = Date.now() - exportStartRef.current;
      const remaining = Math.max(0, Math.ceil((TOTAL_VIDEO_MS - elapsed) / 1000));
      setSecondsRemaining(remaining);
    }, 250);

    // Mark export complete slightly after the full runtime so the UI is accurate
    exportTimerRef.current = setTimeout(() => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      setSecondsRemaining(TOTAL_VIDEO_S);
      setIsExporting(false);
    }, TOTAL_VIDEO_MS + 500);
  }, [selectedResolution]);

  const handleCancelPicker = useCallback(() => {
    setShowPicker(false);
  }, []);

  // Clean up timers on unmount to avoid stale state updates
  useEffect(() => {
    return () => {
      if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const progressPct = isExporting
    ? Math.min(100, ((TOTAL_VIDEO_S - secondsRemaining) / TOTAL_VIDEO_S) * 100)
    : 0;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoTemplate key={videoKey} onSceneChange={handleSceneChange} />

      {/* Quality / Resolution Picker Modal */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            key="quality-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(4,11,24,0.72)',
              backdropFilter: 'blur(6px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleCancelPicker}
          >
            <motion.div
              key="quality-modal"
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'rgba(10,22,40,0.96)',
                border: '1px solid rgba(74,196,224,0.25)',
                borderRadius: '16px',
                padding: '28px 32px 24px',
                minWidth: '300px',
                maxWidth: '360px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ color: '#4AC4E0', fontSize: 'clamp(12px, 1vw, 15px)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Export Quality
                </span>
                <button
                  onClick={handleCancelPicker}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,196,224,0.5)', padding: '2px', display: 'flex' }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Resolution options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {RESOLUTIONS.map(res => {
                  const isSelected = selectedResolution === res.label;
                  return (
                    <motion.button
                      key={res.label}
                      onClick={() => handleResolutionSelect(res.label)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: isSelected ? '1px solid rgba(74,196,224,0.7)' : '1px solid rgba(74,196,224,0.18)',
                        background: isSelected ? 'rgba(74,196,224,0.1)' : 'rgba(74,196,224,0.04)',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                        <span style={{ color: isSelected ? '#4AC4E0' : 'rgba(200,220,240,0.85)', fontWeight: 600, fontSize: 'clamp(13px, 1.1vw, 16px)', letterSpacing: '0.04em' }}>
                          {res.label}
                        </span>
                        <span style={{ color: 'rgba(74,196,224,0.5)', fontSize: 'clamp(10px, 0.8vw, 12px)', letterSpacing: '0.06em' }}>
                          {res.desc}
                        </span>
                      </div>
                      <span style={{ color: 'rgba(74,196,224,0.4)', fontSize: 'clamp(10px, 0.75vw, 11px)', letterSpacing: '0.05em' }}>
                        {res.width} × {res.height}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Confirm button */}
              <motion.button
                onClick={handleStartExport}
                whileHover={{ scale: 1.03, borderColor: 'rgba(74,196,224,0.9)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(74,196,224,0.5)',
                  background: 'rgba(74,196,224,0.15)',
                  color: '#4AC4E0',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(11px, 0.9vw, 14px)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  outline: 'none',
                }}
              >
                <Download size={14} strokeWidth={1.75} />
                Start Export
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-right control cluster */}
      <div
        className="absolute flex flex-col items-end gap-3"
        style={{ bottom: '3vh', right: '2.5vw', zIndex: 50 }}
      >
        {/* Export / MP4 button */}
        <div className="relative flex items-center">
          {/* Progress bar + countdown tooltip */}
          <motion.div
            style={{
              position: 'absolute',
              right: '110%',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '5px',
              marginRight: '8px',
            }}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: isExporting ? 1 : 0, x: isExporting ? 0 : 4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Countdown label */}
            <div
              style={{
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(10px, 0.85vw, 13px)',
                color: 'rgba(74,196,224,0.85)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {secondsRemaining > 0 ? `Recording… ${secondsRemaining}s remaining` : 'Finishing…'}
            </div>
            {/* Progress bar */}
            <div
              style={{
                width: 'clamp(90px, 8vw, 140px)',
                height: '3px',
                background: 'rgba(74,196,224,0.15)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(74,196,224,0.5), rgba(74,196,224,1))',
                  borderRadius: '2px',
                  transformOrigin: 'left center',
                }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.25, ease: 'linear' }}
              />
            </div>
          </motion.div>

          <motion.button
            onClick={handleExportClick}
            aria-label="Export video as MP4"
            disabled={isExporting}
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 'clamp(36px, 3.2vw, 52px)',
              height: 'clamp(36px, 3.2vw, 52px)',
              background: isExporting
                ? 'rgba(74,196,224,0.18)'
                : 'rgba(10,22,40,0.75)',
              border: isExporting
                ? '1px solid rgba(74,196,224,0.7)'
                : '1px solid rgba(74,196,224,0.3)',
              backdropFilter: 'blur(8px)',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              outline: 'none',
            }}
            whileHover={isExporting ? {} : { scale: 1.1, borderColor: 'rgba(74,196,224,0.7)' }}
            whileTap={isExporting ? {} : { scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isExporting ? (
                <motion.span
                  key="exporting"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Loader2
                    style={{
                      color: '#4AC4E0',
                      width: 'clamp(16px, 1.5vw, 24px)',
                      height: 'clamp(16px, 1.5vw, 24px)',
                      animation: 'spin 1s linear infinite',
                    }}
                    strokeWidth={1.75}
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="export-idle"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Download
                    style={{
                      color: 'rgba(74,196,224,0.7)',
                      width: 'clamp(16px, 1.5vw, 24px)',
                      height: 'clamp(16px, 1.5vw, 24px)',
                    }}
                    strokeWidth={1.75}
                  />
                </motion.span>
              )}
            </AnimatePresence>

            {/* Pulse ring while recording */}
            <AnimatePresence>
              {isExporting && (
                <motion.span
                  key="export-pulse"
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(74,196,224,0.5)' }}
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 1.7, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mute toggle */}
        <div className="relative flex items-center">
          {/* Tooltip */}
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
        </div>
      </div>
    </div>
  );
}
