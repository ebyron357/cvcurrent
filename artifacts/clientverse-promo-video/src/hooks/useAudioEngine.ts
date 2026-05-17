import { useRef, useCallback, useEffect, useState } from 'react';

// Cinematic ambient audio engine using Web Audio API
// No external files required — fully procedural synthesis
// D minor tonality with per-scene chord/filter variations

const REVERB_DURATION = 3.0;

interface SceneAudioProfile {
  droneFreqs: [number, number, number, number, number];
  subFreq: number;
  shimmerFreq: number;
  filterFreq: number;
  filterQ: number;
  lfoFreq: number;
  lfoDepth: number;
  masterTarget: number;
  percBpm: number; // 0 = no percussion
}

const SCENE_PROFILES: Record<string, SceneAudioProfile> = {
  intro: {
    droneFreqs: [73.4, 73.62, 110.0, 174.6, 261.6],
    subFreq: 36.7,
    shimmerFreq: 880,
    filterFreq: 900,
    filterQ: 0.8,
    lfoFreq: 0.08,
    lfoDepth: 280,
    masterTarget: 0.72,
    percBpm: 0,
  },
  systemRescue: {
    droneFreqs: [65.4, 65.6, 98.0, 155.6, 233.1],
    subFreq: 32.7,
    shimmerFreq: 698,
    filterFreq: 660,
    filterQ: 1.2,
    lfoFreq: 0.055,
    lfoDepth: 200,
    masterTarget: 0.68,
    percBpm: 72,
  },
  aiServices: {
    droneFreqs: [87.3, 87.57, 130.8, 196.0, 329.6],
    subFreq: 43.65,
    shimmerFreq: 1047,
    filterFreq: 1100,
    filterQ: 0.7,
    lfoFreq: 0.11,
    lfoDepth: 320,
    masterTarget: 0.74,
    percBpm: 108,
  },
  growthSystems: {
    droneFreqs: [110.0, 110.33, 164.8, 261.6, 392.0],
    subFreq: 55.0,
    shimmerFreq: 1175,
    filterFreq: 1260,
    filterQ: 0.6,
    lfoFreq: 0.13,
    lfoDepth: 360,
    masterTarget: 0.76,
    percBpm: 120,
  },
  consulting: {
    droneFreqs: [98.0, 98.29, 146.8, 220.0, 329.6],
    subFreq: 49.0,
    shimmerFreq: 987,
    filterFreq: 980,
    filterQ: 0.85,
    lfoFreq: 0.09,
    lfoDepth: 260,
    masterTarget: 0.72,
    percBpm: 84,
  },
  outro: {
    droneFreqs: [73.4, 73.62, 110.0, 185.0, 246.9],
    subFreq: 36.7,
    shimmerFreq: 1109,
    filterFreq: 1060,
    filterQ: 0.65,
    lfoFreq: 0.05,
    lfoDepth: 240,
    masterTarget: 0.75,
    percBpm: 0,
  },
};

const TRANSITION_TIME = 1.6;
const STORAGE_KEY = 'cv_audio_muted';
const VOLUME_KEY = 'cv_audio_volume';

function getSavedMutePreference(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return true;
    return saved === 'true';
  } catch {
    return true;
  }
}

function getSavedVolume(): number {
  try {
    const v = parseFloat(localStorage.getItem(VOLUME_KEY) ?? '');
    if (!isNaN(v) && v >= 0 && v <= 1) return v;
  } catch {}
  return 0.8;
}

function saveMutePreference(muted: boolean): void {
  try { localStorage.setItem(STORAGE_KEY, String(muted)); } catch {}
}

function saveVolume(vol: number): void {
  try { localStorage.setItem(VOLUME_KEY, String(vol)); } catch {}
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

// Schedule a single soft metallic tick (tempo-synced percussion)
function schedulePercTick(ctx: AudioContext, destination: AudioNode, t: number, vol: number) {
  try {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(6000, t);
    osc.frequency.exponentialRampToValueAtTime(1800, t + 0.045);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.09 * vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(destination);
    osc.start(t);
    osc.stop(t + 0.08);
  } catch { /* ignore */ }
}

interface AudioEngine {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  playTransitionSfx: () => void;
  setScene: (sceneKey: string) => void;
}

export function useAudioEngine(): AudioEngine {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const percDestRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const lpFilterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);
  const currentSceneKeyRef = useRef<string>('intro');
  const percIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => getSavedMutePreference());
  const [volume, setVolumeState] = useState<number>(() => getSavedVolume());
  const volumeRef = useRef(getSavedVolume());

  // Restart percussion scheduler for the current scene BPM
  const restartPerc = useCallback((bpm: number) => {
    if (percIntervalRef.current) {
      clearInterval(percIntervalRef.current);
      percIntervalRef.current = null;
    }
    if (bpm <= 0 || !ctxRef.current || !percDestRef.current) return;
    const beatMs = (60 / bpm) * 1000;
    const ctx = ctxRef.current;
    const dest = percDestRef.current;
    percIntervalRef.current = setInterval(() => {
      if (!ctx || ctx.state !== 'running' || isMuted) return;
      schedulePercTick(ctx, dest, ctx.currentTime + 0.01, volumeRef.current);
    }, beatMs);
  }, [isMuted]);

  const startEngine = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Separate low-gain bus for percussion (bypasses reverb for clarity)
    const percGain = ctx.createGain();
    percGain.gain.setValueAtTime(1, ctx.currentTime);
    percGain.connect(ctx.destination);
    percDestRef.current = percGain;

    const convolver = ctx.createConvolver();
    convolver.buffer = buildImpulseResponse(ctx);
    const reverbGain = ctx.createGain();
    reverbGain.gain.setValueAtTime(0.35, ctx.currentTime);
    convolver.connect(reverbGain);
    reverbGain.connect(masterGain);

    const dryGain = ctx.createGain();
    dryGain.gain.setValueAtTime(0.65, ctx.currentTime);
    dryGain.connect(masterGain);

    const profile = SCENE_PROFILES[currentSceneKeyRef.current] ?? SCENE_PROFILES['intro'];
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = 'lowpass';
    lpFilter.frequency.setValueAtTime(profile.filterFreq, ctx.currentTime);
    lpFilter.Q.setValueAtTime(profile.filterQ, ctx.currentTime);
    lpFilter.connect(dryGain);
    lpFilter.connect(convolver);
    lpFilterRef.current = lpFilter;

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

    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(0.05, ctx.currentTime);
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.setValueAtTime(0.06, ctx.currentTime);
    lfo2.connect(lfo2Gain);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.22, ctx.currentTime);
    lfo2Gain.connect(oscGain.gain);
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

    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(profile.subFreq, ctx.currentTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.12, ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start();
    oscNodesRef.current.push(subOsc);

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
    oscNodesRef.current.push(shimmerOsc);

    const targetVol = profile.masterTarget * volumeRef.current;
    masterGain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 3.5);

    // Start percussion for the current scene
    restartPerc(profile.percBpm);
  }, [restartPerc]);

  const setScene = useCallback((sceneKey: string) => {
    const baseKey = sceneKey.replace(/_r[12]$/, '');
    const profile = SCENE_PROFILES[baseKey];
    if (!profile) return;

    currentSceneKeyRef.current = baseKey;

    if (!ctxRef.current || !startedRef.current) return;
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') return;

    const t = ctx.currentTime;
    const ramp = TRANSITION_TIME;

    // #38 — Brief master volume dip at scene boundary for a clean "breath"
    if (masterGainRef.current && !isMuted) {
      const master = masterGainRef.current;
      const dipTarget = master.gain.value * 0.65;
      const fullTarget = profile.masterTarget * volumeRef.current;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(dipTarget, t + 0.22);
      master.gain.linearRampToValueAtTime(fullTarget, t + 0.22 + ramp);
    }

    if (lpFilterRef.current) {
      lpFilterRef.current.frequency.cancelScheduledValues(t);
      lpFilterRef.current.frequency.setValueAtTime(lpFilterRef.current.frequency.value, t);
      lpFilterRef.current.frequency.linearRampToValueAtTime(profile.filterFreq, t + ramp);
      lpFilterRef.current.Q.cancelScheduledValues(t);
      lpFilterRef.current.Q.setValueAtTime(lpFilterRef.current.Q.value, t);
      lpFilterRef.current.Q.linearRampToValueAtTime(profile.filterQ, t + ramp);
    }

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

    profile.droneFreqs.forEach((freq, i) => {
      const osc = oscNodesRef.current[i];
      if (osc) {
        osc.frequency.cancelScheduledValues(t);
        osc.frequency.setValueAtTime(osc.frequency.value, t);
        osc.frequency.linearRampToValueAtTime(freq, t + ramp);
      }
    });

    const subOsc = oscNodesRef.current[5];
    if (subOsc) {
      subOsc.frequency.cancelScheduledValues(t);
      subOsc.frequency.setValueAtTime(subOsc.frequency.value, t);
      subOsc.frequency.linearRampToValueAtTime(profile.subFreq, t + ramp);
    }

    const shimmerOsc = oscNodesRef.current[6];
    if (shimmerOsc) {
      shimmerOsc.frequency.cancelScheduledValues(t);
      shimmerOsc.frequency.setValueAtTime(shimmerOsc.frequency.value, t);
      shimmerOsc.frequency.linearRampToValueAtTime(profile.shimmerFreq, t + ramp);
    }

    // #37 — Update percussion BPM for the new scene
    restartPerc(profile.percBpm);
  }, [isMuted, restartPerc]);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    volumeRef.current = clamped;
    setVolumeState(clamped);
    saveVolume(clamped);
    if (masterGainRef.current && ctxRef.current && !isMuted && startedRef.current) {
      const ctx = ctxRef.current;
      if (ctx.state !== 'suspended') {
        const profile = SCENE_PROFILES[currentSceneKeyRef.current] ?? SCENE_PROFILES['intro'];
        const target = profile.masterTarget * clamped;
        masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.15);
      }
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
          if (percIntervalRef.current) {
            clearInterval(percIntervalRef.current);
            percIntervalRef.current = null;
          }
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
        } else {
          if (ctx.state === 'suspended') ctx.resume();
          const sceneProfile = SCENE_PROFILES[currentSceneKeyRef.current] ?? SCENE_PROFILES['intro'];
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setTargetAtTime(sceneProfile.masterTarget * volumeRef.current, ctx.currentTime, 0.4);
          restartPerc(sceneProfile.percBpm);
        }
      }

      return nextMuted;
    });
  }, [startEngine, restartPerc]);

  useEffect(() => {
    const savedMuted = getSavedMutePreference();
    if (savedMuted) return;

    startEngine();

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
    } catch { /* ignore */ }
  }, [isMuted]);

  useEffect(() => {
    return () => {
      if (percIntervalRef.current) clearInterval(percIntervalRef.current);
      oscNodesRef.current.forEach(osc => {
        try { osc.stop(); } catch { /* already stopped */ }
      });
      lfoRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  return { isMuted, volume, toggleMute, setVolume, playTransitionSfx, setScene };
}
