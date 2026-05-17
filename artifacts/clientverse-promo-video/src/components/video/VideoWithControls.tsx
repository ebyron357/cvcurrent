import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Download, Loader2, X, Pause, Play, MapPin } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useAudioEngine } from '@/hooks/useAudioEngine';

const TOTAL_VIDEO_MS = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
const TOTAL_VIDEO_S = Math.ceil(TOTAL_VIDEO_MS / 1000);

type Resolution = '720p' | '1080p' | '4K';

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
  { label: '4K', width: 3840, height: 2160, desc: 'Ultra HD · Largest file' },
];

const SESSION_KEY = 'cv_export_resolution';

function getSessionResolution(): Resolution {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY) as Resolution | null;
    if (stored === '720p' || stored === '1080p' || stored === '4K') return stored;
  } catch {}
  return '1080p';
}

const BTN_SIZE = 'clamp(36px, 3.2vw, 52px)';
const ICON_SIZE = 'clamp(16px, 1.5vw, 24px)';

const btnStyle = (active: boolean, disabled = false): React.CSSProperties => ({
  width: BTN_SIZE,
  height: BTN_SIZE,
  background: active ? 'rgba(74,196,224,0.18)' : 'rgba(10,22,40,0.75)',
  border: active ? '1px solid rgba(74,196,224,0.7)' : '1px solid rgba(74,196,224,0.3)',
  backdropFilter: 'blur(8px)',
  cursor: disabled ? 'not-allowed' : 'pointer',
  outline: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative' as const,
  flexShrink: 0,
});

export default function VideoWithControls() {
  const { isMuted, volume, toggleMute, setVolume, playTransitionSfx, setScene } = useAudioEngine();
  const prevSceneRef = useRef<string | null>(null);

  const [videoKey, setVideoKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_VIDEO_S);
  const exportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exportDoneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exportStartRef = useRef<number>(0);

  const [showPicker, setShowPicker] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(getSessionResolution);

  // Volume control: show slider on hover
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Watermark position toggle
  const [watermarkPosition, setWatermarkPosition] = useState<'top-left' | 'bottom-right'>('top-left');

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
    setExportDone(false);
    if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (exportDoneTimerRef.current) clearTimeout(exportDoneTimerRef.current);

    const res = RESOLUTIONS.find(r => r.label === selectedResolution) ?? RESOLUTIONS[1];
    window.recordingResolution = selectedResolution;
    window.recordingWidth = res.width;
    window.recordingHeight = res.height;

    prevSceneRef.current = null;
    exportStartRef.current = Date.now();
    setSecondsRemaining(TOTAL_VIDEO_S);
    setIsExporting(true);
    setIsPaused(false);
    setVideoKey(k => k + 1);

    countdownRef.current = setInterval(() => {
      const elapsed = Date.now() - exportStartRef.current;
      const remaining = Math.max(0, Math.ceil((TOTAL_VIDEO_MS - elapsed) / 1000));
      setSecondsRemaining(remaining);
    }, 250);

    exportTimerRef.current = setTimeout(() => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      setSecondsRemaining(TOTAL_VIDEO_S);
      setIsExporting(false);
      setExportDone(true);
      exportDoneTimerRef.current = setTimeout(() => setExportDone(false), 4000);
    }, TOTAL_VIDEO_MS + 500);
  }, [selectedResolution]);

  const handleCancelPicker = useCallback(() => {
    setShowPicker(false);
  }, []);

  const handleCancelExport = useCallback(() => {
    if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setIsExporting(false);
    setSecondsRemaining(TOTAL_VIDEO_S);
    setIsPaused(false);
    setVideoKey(k => k + 1);
    prevSceneRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (exportDoneTimerRef.current) clearTimeout(exportDoneTimerRef.current);
    };
  }, []);

  const progressPct = isExporting
    ? Math.min(100, ((TOTAL_VIDEO_S - secondsRemaining) / TOTAL_VIDEO_S) * 100)
    : 0;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoTemplate
        key={videoKey}
        onSceneChange={handleSceneChange}
        isPaused={isPaused}
        watermarkPosition={watermarkPosition}
      />

      {/* Export completion toast */}
      <AnimatePresence>
        {exportDone && (
          <motion.div
            key="export-toast"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{
              position: 'absolute',
              top: '5vh',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 110,
              background: 'rgba(10,22,40,0.96)',
              border: '1px solid rgba(74,196,224,0.5)',
              borderRadius: '12px',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4AC4E0', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 1vw, 15px)',
              color: 'rgba(200,225,245,0.95)',
              letterSpacing: '0.04em',
            }}>
              Export complete — your download should begin shortly.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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
                maxWidth: '380px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ color: '#4AC4E0', fontSize: 'clamp(12px, 1vw, 15px)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Export Quality
                </span>
                <button onClick={handleCancelPicker} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(74,196,224,0.5)', padding: '2px', display: 'flex' }}>
                  <X size={16} />
                </button>
              </div>

              {/* Resolution options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
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

              {/* Watermark position toggle in modal */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '10px 0', borderTop: '1px solid rgba(74,196,224,0.1)', borderBottom: '1px solid rgba(74,196,224,0.1)' }}>
                <span style={{ color: 'rgba(200,220,240,0.7)', fontSize: 'clamp(10px, 0.85vw, 13px)', letterSpacing: '0.06em' }}>
                  Watermark position
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['top-left', 'bottom-right'] as const).map(pos => (
                    <motion.button
                      key={pos}
                      onClick={() => setWatermarkPosition(pos)}
                      whileTap={{ scale: 0.93 }}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '7px',
                        border: watermarkPosition === pos ? '1px solid rgba(74,196,224,0.7)' : '1px solid rgba(74,196,224,0.2)',
                        background: watermarkPosition === pos ? 'rgba(74,196,224,0.12)' : 'transparent',
                        color: watermarkPosition === pos ? '#4AC4E0' : 'rgba(74,196,224,0.45)',
                        fontSize: 'clamp(9px, 0.75vw, 11px)',
                        cursor: 'pointer',
                        outline: 'none',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {pos === 'top-left' ? 'Top left' : 'Bottom right'}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Confirm */}
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

        {/* Pause / Play button */}
        <div className="relative flex items-center">
          <motion.div
            style={{ position: 'absolute', right: '110%', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', fontFamily: 'var(--font-body)', fontSize: 'clamp(10px, 0.85vw, 13px)', color: 'rgba(74,196,224,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: '8px' }}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 0, x: 0 }}
          />
          <motion.button
            onClick={() => setIsPaused(p => !p)}
            aria-label={isPaused ? 'Resume video' : 'Pause video'}
            style={btnStyle(isPaused)}
            whileHover={{ scale: 1.1, borderColor: 'rgba(74,196,224,0.7)' }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPaused ? (
                <motion.span key="play" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play style={{ color: '#4AC4E0', width: ICON_SIZE, height: ICON_SIZE }} strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span key="pause" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Pause style={{ color: 'rgba(74,196,224,0.7)', width: ICON_SIZE, height: ICON_SIZE }} strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Export / MP4 button */}
        <div className="relative flex items-center">
          {/* Progress bar + countdown + cancel */}
          <motion.div
            style={{ position: 'absolute', right: '110%', top: '50%', transform: 'translateY(-50%)', pointerEvents: isExporting ? 'auto' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', marginRight: '8px' }}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: isExporting ? 1 : 0, x: isExporting ? 0 : 4 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-body)', fontSize: 'clamp(10px, 0.85vw, 13px)', color: 'rgba(74,196,224,0.85)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {secondsRemaining > 0 ? `Recording… ${secondsRemaining}s` : 'Finishing…'}
              </span>
              {/* Cancel export */}
              <button
                onClick={handleCancelExport}
                title="Cancel export"
                style={{ background: 'none', border: '1px solid rgba(74,196,224,0.25)', borderRadius: '6px', cursor: 'pointer', color: 'rgba(74,196,224,0.55)', padding: '2px 6px', fontSize: 'clamp(9px, 0.75vw, 11px)', letterSpacing: '0.06em', fontFamily: 'var(--font-body)' }}
              >
                Cancel
              </button>
            </div>
            <div style={{ width: 'clamp(90px, 8vw, 140px)', height: '3px', background: 'rgba(74,196,224,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, rgba(74,196,224,0.5), rgba(74,196,224,1))', borderRadius: '2px', transformOrigin: 'left center' }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.25, ease: 'linear' }}
              />
            </div>
          </motion.div>

          <motion.button
            onClick={handleExportClick}
            aria-label="Export video as MP4"
            disabled={isExporting}
            style={btnStyle(isExporting, isExporting)}
            whileHover={isExporting ? {} : { scale: 1.1, borderColor: 'rgba(74,196,224,0.7)' }}
            whileTap={isExporting ? {} : { scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isExporting ? (
                <motion.span key="exporting" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader2 style={{ color: '#4AC4E0', width: ICON_SIZE, height: ICON_SIZE, animation: 'spin 1s linear infinite' }} strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span key="export-idle" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Download style={{ color: 'rgba(74,196,224,0.7)', width: ICON_SIZE, height: ICON_SIZE }} strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isExporting && (
                <motion.span key="export-pulse" className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(74,196,224,0.5)' }} initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: 1.7, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }} />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Volume control */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          {/* Volume slider tooltip */}
          <AnimatePresence>
            {showVolumeSlider && (
              <motion.div
                key="vol-slider"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  right: '110%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginRight: '8px',
                  background: 'rgba(10,22,40,0.85)',
                  border: '1px solid rgba(74,196,224,0.2)',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(10px, 0.8vw, 12px)', color: 'rgba(74,196,224,0.6)', letterSpacing: '0.06em', whiteSpace: 'nowrap', minWidth: 28 }}>
                  {isMuted ? 'OFF' : `${Math.round(volume * 100)}%`}
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={e => {
                    const v = parseFloat(e.target.value);
                    if (isMuted && v > 0) toggleMute();
                    setVolume(v);
                  }}
                  style={{
                    width: 'clamp(60px, 5vw, 90px)',
                    accentColor: '#4AC4E0',
                    cursor: 'pointer',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Muted tooltip (only when slider is hidden) */}
          {!showVolumeSlider && (
            <motion.div
              style={{ position: 'absolute', right: '110%', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', fontFamily: 'var(--font-body)', fontSize: 'clamp(10px, 0.85vw, 13px)', color: 'rgba(74,196,224,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: '8px' }}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: isMuted ? 0.8 : 0, x: isMuted ? 0 : 4 }}
              transition={{ duration: 0.3 }}
            >
              Click for audio
            </motion.div>
          )}

          <motion.button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            style={btnStyle(false)}
            whileHover={{ scale: 1.1, borderColor: 'rgba(74,196,224,0.7)' }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMuted ? (
                <motion.span key="muted" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <VolumeX style={{ color: 'rgba(74,196,224,0.55)', width: ICON_SIZE, height: ICON_SIZE }} strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span key="unmuted" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Volume2 style={{ color: '#4AC4E0', width: ICON_SIZE, height: ICON_SIZE }} strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!isMuted && (
                <motion.span key="pulse" className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(74,196,224,0.4)' }} initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }} />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Watermark position quick-toggle */}
        <div className="relative flex items-center">
          <motion.div
            style={{ position: 'absolute', right: '110%', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', fontFamily: 'var(--font-body)', fontSize: 'clamp(9px, 0.8vw, 12px)', color: 'rgba(74,196,224,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '8px' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            Watermark: {watermarkPosition === 'top-left' ? 'top-left' : 'btm-right'}
          </motion.div>
          <motion.button
            onClick={() => setWatermarkPosition(p => p === 'top-left' ? 'bottom-right' : 'top-left')}
            aria-label="Toggle watermark position"
            title={`Watermark: ${watermarkPosition}`}
            style={{ ...btnStyle(false), width: 'clamp(28px, 2.4vw, 38px)', height: 'clamp(28px, 2.4vw, 38px)' }}
            whileHover={{ scale: 1.1, borderColor: 'rgba(74,196,224,0.6)' }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <MapPin style={{ color: 'rgba(74,196,224,0.55)', width: 'clamp(12px, 1.1vw, 16px)', height: 'clamp(12px, 1.1vw, 16px)' }} strokeWidth={1.75} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
