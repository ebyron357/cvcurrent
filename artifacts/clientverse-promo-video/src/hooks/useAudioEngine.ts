import { useRef, useCallback, useEffect, useState } from 'react';

// Cinematic ambient audio engine using Web Audio API
// No external files required — fully procedural synthesis
// D minor tonality: D2, A2, F3, C4, D4 (cinematic, authoritative)

const DRONE_FREQS = [73.4, 73.4 * 1.003, 110.0, 174.6, 220.0];
const REVERB_DURATION = 3.0; // seconds

const STORAGE_KEY = 'cv_audio_muted';

function getSavedMutePreference(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return true; // first-ever visit: always start muted
    return saved === 'true';
  } catch {
    return true;
  }
}

function saveMutePreference(muted: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(muted));
  } catch { /* ignore quota/security errors */ }
}

function buildImpulseResponse(ctx: AudioContext): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * REVERB_DURATION);
  const buf = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      const decay = Math.pow(1 - i / length, 2.8);
      data[i] = (Math.random() * 2 - 1) * decay;
    }
  }
  return buf;
}

interface AudioEngine {
  isMuted: boolean;
  toggleMute: () => void;
  playTransitionSfx: () => void;
}

export function useAudioEngine(): AudioEngine {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const startedRef = useRef(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => getSavedMutePreference());

  // Build and start the ambient engine
  const startEngine = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Reverb convolver
    const convolver = ctx.createConvolver();
    convolver.buffer = buildImpulseResponse(ctx);
    const reverbGain = ctx.createGain();
    reverbGain.gain.setValueAtTime(0.35, ctx.currentTime);
    convolver.connect(reverbGain);
    reverbGain.connect(masterGain);

    // Dry signal gain
    const dryGain = ctx.createGain();
    dryGain.gain.setValueAtTime(0.65, ctx.currentTime);
    dryGain.connect(masterGain);

    // Lowpass filter for warmth
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = 'lowpass';
    lpFilter.frequency.setValueAtTime(900, ctx.currentTime);
    lpFilter.Q.setValueAtTime(0.8, ctx.currentTime);
    lpFilter.connect(dryGain);
    lpFilter.connect(convolver);

    // LFO modulating filter cutoff (slow, organic movement)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(280, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(lpFilter.frequency);
    lfo.start();
    lfoRef.current = lfo;

    // Second slower LFO for vibrato/tremolo depth
    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(0.05, ctx.currentTime);
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.setValueAtTime(0.06, ctx.currentTime);
    lfo2.connect(lfo2Gain);

    // Drone oscillators — detuned cluster for lush pad
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.22, ctx.currentTime);
    lfo2Gain.connect(oscGain.gain); // tremolo
    lfo2.start();
    oscGain.connect(lpFilter);

    DRONE_FREQS.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i < 2 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Slight detune for chorusing
      osc.detune.setValueAtTime((i - 2) * 7, ctx.currentTime);
      const perOscGain = ctx.createGain();
      perOscGain.gain.setValueAtTime(i < 2 ? 0.55 : 0.4, ctx.currentTime);
      osc.connect(perOscGain);
      perOscGain.connect(oscGain);
      osc.start();
      oscNodesRef.current.push(osc);
    });

    // Sub-bass oscillator (D1) — very subtle foundation
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(36.7, ctx.currentTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.12, ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(masterGain); // bypass reverb for sub
    subOsc.start();
    oscNodesRef.current.push(subOsc);

    // High shimmer — very quiet, adds air
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    shimmerOsc.detune.setValueAtTime(4, ctx.currentTime);
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.025, ctx.currentTime);
    const shimmerLfo = ctx.createOscillator();
    shimmerLfo.type = 'sine';
    shimmerLfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const shimmerLfoGain = ctx.createGain();
    shimmerLfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
    shimmerLfo.connect(shimmerLfoGain);
    shimmerLfoGain.connect(shimmerGain.gain);
    shimmerLfo.start();
    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(convolver);
    shimmerOsc.start();
    oscNodesRef.current.push(shimmerOsc);

    // Fade master in slowly
    masterGain.gain.linearRampToValueAtTime(0.72, ctx.currentTime + 3.5);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const nextMuted = !prev;

      saveMutePreference(nextMuted);

      if (!startedRef.current && !nextMuted) {
        // First unmute — bootstrap the engine
        startEngine();
        // Engine fades in via linearRamp inside startEngine
        return nextMuted;
      }

      if (ctxRef.current && masterGainRef.current) {
        const ctx = ctxRef.current;
        const master = masterGainRef.current;
        if (nextMuted) {
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
        } else {
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setTargetAtTime(0.72, ctx.currentTime, 0.4);
        }
      }

      return nextMuted;
    });
  }, [startEngine]);

  // If the user previously unmuted, pre-start the engine so it's ready.
  // The AudioContext will be suspended until a user gesture, at which point
  // we resume it automatically on the first interaction.
  useEffect(() => {
    const savedMuted = getSavedMutePreference();
    if (savedMuted) return; // user left it muted — do nothing

    // Start the engine (AudioContext begins suspended — browser autoplay policy)
    startEngine();

    // Resume + unmute on the very first interaction gesture
    const resume = () => {
      if (ctxRef.current && ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
      }
      document.removeEventListener('click', resume, true);
      document.removeEventListener('keydown', resume, true);
    };

    document.addEventListener('click', resume, true);
    document.addEventListener('keydown', resume, true);

    return () => {
      document.removeEventListener('click', resume, true);
      document.removeEventListener('keydown', resume, true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Per-scene transition SFX: short digital sweep/whoosh
  const playTransitionSfx = useCallback(() => {
    if (!ctxRef.current || isMuted) return;
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') return;

    try {
      // Filtered noise burst — metallic sweep
      const bufLength = Math.floor(ctx.sampleRate * 0.22);
      const noiseBuf = ctx.createBuffer(1, bufLength, ctx.sampleRate);
      const noiseData = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufLength; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuf;

      // Bandpass — rising sweep
      const bpFilter = ctx.createBiquadFilter();
      bpFilter.type = 'bandpass';
      bpFilter.frequency.setValueAtTime(300, ctx.currentTime);
      bpFilter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.18);
      bpFilter.Q.setValueAtTime(2.5, ctx.currentTime);

      // Gain envelope
      const sfxGain = ctx.createGain();
      sfxGain.gain.setValueAtTime(0.18, ctx.currentTime);
      sfxGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      // Subtle tonal click to punch through
      const clickOsc = ctx.createOscillator();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(1200, ctx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.12, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      noiseSource.connect(bpFilter);
      bpFilter.connect(sfxGain);
      clickOsc.connect(clickGain);
      clickGain.connect(sfxGain);
      sfxGain.connect(ctx.destination);

      noiseSource.start(ctx.currentTime);
      noiseSource.stop(ctx.currentTime + 0.22);
      clickOsc.start(ctx.currentTime);
      clickOsc.stop(ctx.currentTime + 0.07);
    } catch {
      // Silently swallow any Web Audio errors
    }
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscNodesRef.current.forEach(osc => {
        try { osc.stop(); } catch { /* already stopped */ }
      });
      lfoRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  return { isMuted, toggleMute, playTransitionSfx };
}
