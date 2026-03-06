"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type MusicCategory = "piano" | "lofi" | "ambient" | "jazz";

interface UseAudioReturn {
  isPlaying: boolean;
  currentCategory: MusicCategory;
  play: (category: MusicCategory) => void;
  stop: () => void;
  toggle: (category: MusicCategory) => void;
  setCategory: (category: MusicCategory) => void;
}

const AUDIO_FILES: Record<MusicCategory, string> = {
  piano: "/audio/piano.mp3",
  lofi: "/audio/lofi.mp3",
  ambient: "/audio/ambient.mp3",
  jazz: "/audio/jazz.mp3",
};

const preloadedAudio: Map<MusicCategory, HTMLAudioElement> = new Map();

export function useAudio(): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<MusicCategory>("piano");
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(false);
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (Object.keys(AUDIO_FILES) as MusicCategory[]).forEach((category) => {
      if (!preloadedAudio.has(category)) {
        const audio = new Audio();
        audio.src = AUDIO_FILES[category];
        audio.preload = "auto";
        audio.loop = true;
        audio.volume = 0;
        audio.load();
        preloadedAudio.set(category, audio);
      }
    });

    return () => {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current.volume = 0;
        activeAudioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    const targetVolume = 0.5;
    const fadeSteps = 30;
    const fadeDuration = 1500;
    const stepDuration = fadeDuration / fadeSteps;
    const volumeStep = targetVolume / fadeSteps;

    audio.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      const newVolume = Math.min(targetVolume, audio.volume + volumeStep);
      audio.volume = newVolume;

      if (newVolume >= targetVolume) {
        clearFade();
      }
    }, stepDuration);
  }, [clearFade]);

  const fadeOutAudio = useCallback((audio: HTMLAudioElement, callback?: () => void) => {
    const fadeSteps = 30;
    const fadeDuration = 1500;
    const stepDuration = fadeDuration / fadeSteps;
    const volumeStep = audio.volume / fadeSteps;

    fadeIntervalRef.current = setInterval(() => {
      const newVolume = Math.max(0, audio.volume - volumeStep);
      audio.volume = newVolume;

      if (newVolume <= 0) {
        clearFade();
        audio.pause();
        callback?.();
      }
    }, stepDuration);
  }, [clearFade]);

  const getOrCreateAudio = useCallback((category: MusicCategory): HTMLAudioElement => {
    let audio = preloadedAudio.get(category);
    if (!audio) {
      audio = new Audio();
      audio.src = AUDIO_FILES[category];
      audio.preload = "auto";
      audio.loop = true;
      audio.volume = 0;
      audio.load();
      preloadedAudio.set(category, audio);
    }
    return audio;
  }, []);

  const play = useCallback((category: MusicCategory) => {
    shouldPlayRef.current = true;
    clearFade();
    isTransitioningRef.current = false;

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.volume = 0;
    }

    const audio = getOrCreateAudio(category);

    setCurrentCategory(category);
    activeAudioRef.current = audio;
    audio.volume = 0;
    audio.currentTime = 0;

    const attemptPlay = () => {
      if (!shouldPlayRef.current) return;

      audio.play().then(() => {
        if (!shouldPlayRef.current) {
          audio.pause();
          return;
        }
        setIsPlaying(true);
        fadeIn(audio);
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Audio playback failed:", err);
        }
      });
    };

    if (audio.readyState >= 3) {
      attemptPlay();
    } else {
      const handleCanPlay = () => {
        audio.removeEventListener('canplay', handleCanPlay);
        attemptPlay();
      };
      audio.addEventListener('canplay', handleCanPlay);
      audio.load();
    }
  }, [fadeIn, clearFade, getOrCreateAudio]);

  const stop = useCallback(() => {
    shouldPlayRef.current = false;
    clearFade();

    const audio = activeAudioRef.current;
    if (!audio) {
      setIsPlaying(false);
      return;
    }

    const fadeSteps = 30;
    const fadeDuration = 1500;
    const stepDuration = fadeDuration / fadeSteps;
    const volumeStep = audio.volume / fadeSteps;

    fadeIntervalRef.current = setInterval(() => {
      const newVolume = Math.max(0, audio.volume - volumeStep);
      audio.volume = newVolume;

      if (newVolume <= 0) {
        clearFade();
        audio.pause();
        setIsPlaying(false);
      }
    }, stepDuration);
  }, [clearFade]);

  const toggle = useCallback((category: MusicCategory) => {
    if (isPlaying) {
      stop();
    } else {
      play(category);
    }
  }, [isPlaying, play, stop]);

  const setCategory = useCallback((category: MusicCategory) => {
    if (isTransitioningRef.current) return;

    setCurrentCategory(category);

    const currentAudio = activeAudioRef.current;
    if (isPlaying && currentAudio) {
      isTransitioningRef.current = true;

      fadeOutAudio(currentAudio, () => {
        const newAudio = getOrCreateAudio(category);
        activeAudioRef.current = newAudio;
        newAudio.volume = 0;
        newAudio.currentTime = 0;

        const attemptPlay = () => {
          newAudio.play().then(() => {
            fadeIn(newAudio);
            isTransitioningRef.current = false;
          }).catch((err) => {
            isTransitioningRef.current = false;
            if (err.name !== 'AbortError') {
              console.error("Audio playback failed:", err);
            }
          });
        };

        if (newAudio.readyState >= 3) {
          attemptPlay();
        } else {
          const handleCanPlay = () => {
            newAudio.removeEventListener('canplay', handleCanPlay);
            attemptPlay();
          };
          newAudio.addEventListener('canplay', handleCanPlay);
          newAudio.load();
        }
      });
    }
  }, [isPlaying, fadeOutAudio, fadeIn, getOrCreateAudio]);

  return {
    isPlaying,
    currentCategory,
    play,
    stop,
    toggle,
    setCategory,
  };
}
