import { useRef, useCallback, useEffect, useState } from 'react';

// Cinematic ambient audio engine using Web Audio API
// No external files required — fully procedural synthesis
// D minor tonality with per-scene chord/filter variations

const REVERB_DURATION = 3.0;

// --- Per-scene audio textures ---
// Each scene has a distinct chord cluster, filter brightness, and LFO character
// All stay in the same D-minor family — no jarring jumps, just emotional shifts

interface SceneAudioProfile {
  // Drone oscillator frequencies (5 voices)
  droneFreqs: [number, number, number, number, number];
  // Sub-bass frequency
  subFreq: number;
  // High shimmer frequency
  shimmerFreq: number;
  // Lowpass filter cutoff
  filterFreq: number;
  // Filter resonance
  filterQ: number;
  // LFO rate (filter sweep speed)
  lfoFreq: number;
  // LFO depth (filter sweep depth)
  lfoDepth: number;
  // Master volume target
  masterTarget: number;
}

const SCENE_PROFILES: Record<string, SceneAudioProfile> = {
  // Intro — D minor baseline, warm and mysterious entry
  intro: {
    droneFreqs: [73.4, 73.62, 110.0, 174.6, 261.6],
    subFreq: 36.7,
    shimmerFreq: 880,
    filterFreq: 900,
    filterQ: 0.8,
    lfoFreq: 0.08,
    lfoDepth: 280,
    masterTarget: 0.72,
  },
  // System Rescue — C minor, darker and heavier; the "problem" scene
  systemRescue: {
    droneFreqs: [65.4, 65.6, 98.0, 155.6, 233.1],
    subFreq: 32.7,
    shimmerFreq: 698,
    filterFreq: 660,
    filterQ: 1.2,
    lfoFreq: 0.055,
    lfoDepth: 200,
    masterTarget: 0.68,
  },
  // AI Services — F major feel, filter opens up, lifting and expansive
  aiServices: {
    droneFreqs: [87.3, 87.57, 130.8, 196.0, 329.6],
    subFreq: 43.65,
    shimmerFreq: 1047,
    filterFreq: 1100,
    filterQ: 0.7,
    lfoFreq: 0.11,
    lfoDepth: 320,
    masterTarget: 0.74,
  },
  // Growth Systems — A minor feel, ascending energy and momentum
  growthSystems: {
    droneFreqs: [110.0, 110.33, 164.8, 261.6, 392.0],
    subFreq: 55.0,
    shimmerFreq: 1175,
    filterFreq: 1260,
    filterQ: 0.6,
    lfoFreq: 0.13,
    lfoDepth: 360,
    masterTarget: 0.76,
  },
  // Consulting — G major feel, warm and confident resolution
  consulting: {
    droneFreqs: [98.0, 98.29, 146.8, 220.0, 329.6],
    subFreq: 49.0,
    shimmerFreq: 987,
    filterFreq: 980,
    filterQ: 0.85,
    lfoFreq: 0.09,
    lfoDepth: 260,
    masterTarget: 0.72,
  },
  // Outro — D major, resolved and triumphant; filter fully open, slowest LFO
  outro: {
    droneFreqs: [73.4, 73.62, 110.0, 185.0, 246.9],
    subFreq: 36.7,
    shimmerFreq: 1109,
    filterFreq: 1060,
    filterQ: 0.65,
    lfoFreq: 0.05,
    lfoDepth: 240,
    masterTarget: 0.75,
  },
};

const TRANSITION_TIME = 1.6; // seconds for smooth crossfade between scenes

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
  setScene: (sceneKey: string) => void;
}

export function useAudioEngine(): AudioEngine {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  // Drone oscillators in order: [voice0, voice1, voice2, voice3, voice4, sub, shimmer]
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const lpFilterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);
  // Track the last scene key so engine boots into the correct profile on mid-video unmute
  const currentSceneKeyRef = useRef<string>('intro');
  const [isMuted, setIsMuted] = useState<boolean>(() => getSavedMutePreference());

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

    // Lowpass filter for warmth — start at the current scene's profile
    // (handles mid-video unmute: user may have already scrolled past intro)
    const profile = SCENE_PROFILES[currentSceneKeyRef.current] ?? SCENE_PROFILES['intro'];
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = 'lowpass';
    lpFilter.frequency.setValueAtTime(profile.filterFreq, ctx.currentTime);
    lpFilter.Q.setValueAtTime(profile.filterQ, ctx.currentTime);
    lpFilter.connect(dryGain);
    lpFilter.connect(convolver);
    lpFilterRef.current = lpFilter;

    // LFO modulating filter cutoff
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(profile.lfoFreq, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(profile.lfoDepth, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(lpFilter.frequency);
    lfo.start();
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;

    // Second slower LFO for tremolo depth
    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(0.05, ctx.currentTime);
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.setValueAtTime(0.06, ctx.currentTime);
    lfo2.connect(lfo2Gain);

    // Drone oscillators — detuned cluster (5 voices)
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.22, ctx.currentTime);
    lfo2Gain.connect(oscGain.gain); // tremolo
    lfo2.start();
    oscGain.connect(lpFilter);

    profile.droneFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i < 2 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime((i - 2) * 7, ctx.currentTime);
      const perOscGain = ctx.createGain();
      perOscGain.gain.setValueAtTime(i < 2 ? 0.55 : 0.4, ctx.currentTime);
      osc.connect(perOscGain);
      perOscGain.connect(oscGain);
      osc.start();
      oscNodesRef.current.push(osc);
    });

    // Sub-bass oscillator — bypass reverb for tightness
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(profile.subFreq, ctx.currentTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.12, ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start();
    oscNodesRef.current.push(subOsc); // index 5

    // High shimmer — adds air, feeds into reverb only
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(profile.shimmerFreq, ctx.currentTime);
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
    oscNodesRef.current.push(shimmerOsc); // index 6

    // Fade master in slowly
    masterGain.gain.linearRampToValueAtTime(profile.masterTarget, ctx.currentTime + 3.5);
  }, []);

  // Smoothly transition all audio parameters to a new scene profile
  const setScene = useCallback((sceneKey: string) => {
    const baseKey = sceneKey.replace(/_r[12]$/, '');
    const profile = SCENE_PROFILES[baseKey];
    if (!profile) return;

    // Always track the current scene key so startEngine boots correctly on mid-video unmute
    currentSceneKeyRef.current = baseKey;

    if (!ctxRef.current || !startedRef.current) return;
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') return;

    const t = ctx.currentTime;
    const ramp = TRANSITION_TIME;

    // Modulate filter — the most audible shift
    if (lpFilterRef.current) {
      lpFilterRef.current.frequency.cancelScheduledValues(t);
      lpFilterRef.current.frequency.setValueAtTime(lpFilterRef.current.frequency.value, t);
      lpFilterRef.current.frequency.linearRampToValueAtTime(profile.filterFreq, t + ramp);
      lpFilterRef.current.Q.cancelScheduledValues(t);
      lpFilterRef.current.Q.setValueAtTime(lpFilterRef.current.Q.value, t);
      lpFilterRef.current.Q.linearRampToValueAtTime(profile.filterQ, t + ramp);
    }

    // Modulate LFO rate and depth
    if (lfoRef.current) {
      lfoRef.current.frequency.cancelScheduledValues(t);
      lfoRef.current.frequency.setValueAtTime(lfoRef.current.frequency.value, t);
      lfoRef.current.frequency.linearRampToValueAtTime(profile.lfoFreq, t + ramp);
    }
    if (lfoGainRef.current) {
      lfoGainRef.current.gain.cancelScheduledValues(t);
      lfoGainRef.current.gain.setValueAtTime(lfoGainRef.current.gain.value, t);
      lfoGainRef.current.gain.linearRampToValueAtTime(profile.lfoDepth, t + ramp);
    }

    // Modulate drone oscillator frequencies (indices 0-4)
    profile.droneFreqs.forEach((freq, i) => {
      const osc = oscNodesRef.current[i];
      if (osc) {
        osc.frequency.cancelScheduledValues(t);
        osc.frequency.setValueAtTime(osc.frequency.value, t);
        osc.frequency.linearRampToValueAtTime(freq, t + ramp);
      }
    });

    // Modulate sub-bass (index 5)
    const subOsc = oscNodesRef.current[5];
    if (subOsc) {
      subOsc.frequency.cancelScheduledValues(t);
      subOsc.frequency.setValueAtTime(subOsc.frequency.value, t);
      subOsc.frequency.linearRampToValueAtTime(profile.subFreq, t + ramp);
    }

    // Modulate shimmer (index 6)
    const shimmerOsc = oscNodesRef.current[6];
    if (shimmerOsc) {
      shimmerOsc.frequency.cancelScheduledValues(t);
      shimmerOsc.frequency.setValueAtTime(shimmerOsc.frequency.value, t);
      shimmerOsc.frequency.linearRampToValueAtTime(profile.shimmerFreq, t + ramp);
    }

    // Modulate master volume target
    if (masterGainRef.current && !isMuted) {
      const master = masterGainRef.current;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(profile.masterTarget, t + ramp);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const nextMuted = !prev;

      saveMutePreference(nextMuted);

      if (!startedRef.current && !nextMuted) {
        startEngine();
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
          const sceneProfile = SCENE_PROFILES[currentSceneKeyRef.current] ?? SCENE_PROFILES['intro'];
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setTargetAtTime(sceneProfile.masterTarget, ctx.currentTime, 0.4);
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
      const bufLength = Math.floor(ctx.sampleRate * 0.22);
      const noiseBuf = ctx.createBuffer(1, bufLength, ctx.sampleRate);
      const noiseData = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufLength; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuf;

      const bpFilter = ctx.createBiquadFilter();
      bpFilter.type = 'bandpass';
      bpFilter.frequency.setValueAtTime(300, ctx.currentTime);
      bpFilter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.18);
      bpFilter.Q.setValueAtTime(2.5, ctx.currentTime);

      const sfxGain = ctx.createGain();
      sfxGain.gain.setValueAtTime(0.18, ctx.currentTime);
      sfxGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

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

  return { isMuted, toggleMute, playTransitionSfx, setScene };
}
