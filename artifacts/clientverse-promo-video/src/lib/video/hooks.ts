import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    startRecording?: () => Promise<void>;
    stopRecording?: () => void;
  }
}

export interface SceneDurations {
  [key: string]: number;
}

export interface UseVideoPlayerOptions {
  durations: SceneDurations;
  onVideoEnd?: () => void;
  loop?: boolean;
  isPaused?: boolean;
}

export interface UseVideoPlayerReturn {
  currentScene: number;
  totalScenes: number;
  currentSceneKey: string;
  hasEnded: boolean;
  jumpToScene: (index: number) => void;
  sceneKeys: string[];
  sceneStartTime: number;
  sceneDuration: number;
}

export function useVideoPlayer(options: UseVideoPlayerOptions): UseVideoPlayerReturn {
  const { durations, onVideoEnd, loop = true, isPaused = false } = options;

  const sceneKeys = useRef(Object.keys(durations)).current;
  const totalScenes = sceneKeys.length;
  const durationsArray = useRef(Object.values(durations)).current;

  const [currentScene, setCurrentScene] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [sceneStartTime, setSceneStartTime] = useState(() => Date.now());

  // Reset start time whenever the active scene changes
  useEffect(() => {
    setSceneStartTime(Date.now());
  }, [currentScene]);

  // Reset start time when playback resumes from pause
  const prevPausedRef = useRef(isPaused);
  useEffect(() => {
    if (prevPausedRef.current && !isPaused) {
      setSceneStartTime(Date.now());
    }
    prevPausedRef.current = isPaused;
  }, [isPaused]);

  // Start recording on mount
  useEffect(() => {
    window.startRecording?.();
  }, []);

  // Scene advancement — stops when isPaused
  useEffect(() => {
    if (hasEnded && !loop) return;
    if (isPaused) return;

    const currentDuration = durationsArray[currentScene];

    const timer = setTimeout(() => {
      if (currentScene >= totalScenes - 1) {
        if (!hasEnded) {
          window.stopRecording?.();
          setHasEnded(true);
          onVideoEnd?.();
        }
        if (loop) {
          setCurrentScene(0);
        }
      } else {
        setCurrentScene(prev => prev + 1);
      }
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentScene, isPaused, totalScenes, durationsArray, hasEnded, loop, onVideoEnd]);

  const jumpToScene = (index: number) => {
    if (index >= 0 && index < totalScenes) {
      setCurrentScene(index);
      setHasEnded(false);
    }
  };

  return {
    currentScene,
    totalScenes,
    currentSceneKey: sceneKeys[currentScene],
    hasEnded,
    jumpToScene,
    sceneKeys,
    sceneStartTime,
    sceneDuration: durationsArray[currentScene] ?? 6000,
  };
}

export function useSceneTimer(events: Array<{ time: number; callback: () => void }>) {
  const firedRef = useRef<Set<number>>(new Set());
  const callbacksRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    callbacksRef.current = events.map(e => e.callback);
  }, [events]);

  const scheduleKey = events.map((event, i) => `${i}:${event.time}`).join('|');

  useEffect(() => {
    firedRef.current = new Set();

    const timers = events.map(({ time }, index) => {
      return setTimeout(() => {
        if (!firedRef.current.has(index)) {
          firedRef.current.add(index);
          callbacksRef.current[index]?.();
        }
      }, time);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [scheduleKey]);
}
