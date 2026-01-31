"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type MusicCategory = "piano" | "lofi" | "ambient";

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
};

export function useAudio(): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<MusicCategory>("piano");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(false);

  // Initialize audio element on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
      audioRef.current.preload = "auto";
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeIn = useCallback(() => {
    if (!audioRef.current) return;
    
    const targetVolume = 0.5;
    const fadeSteps = 30;
    const fadeDuration = 1500; // 1.5 seconds
    const stepDuration = fadeDuration / fadeSteps;
    const volumeStep = targetVolume / fadeSteps;

    audioRef.current.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      
      const newVolume = Math.min(targetVolume, audioRef.current.volume + volumeStep);
      audioRef.current.volume = newVolume;

      if (newVolume >= targetVolume) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, stepDuration);
  }, []);

  const fadeOut = useCallback((callback?: () => void) => {
    if (!audioRef.current) {
      callback?.();
      return;
    }

    const fadeSteps = 30;
    const fadeDuration = 1500;
    const stepDuration = fadeDuration / fadeSteps;
    const volumeStep = audioRef.current.volume / fadeSteps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;

      const newVolume = Math.max(0, audioRef.current.volume - volumeStep);
      audioRef.current.volume = newVolume;

      if (newVolume <= 0) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audioRef.current.pause();
        callback?.();
      }
    }, stepDuration);
  }, []);

  const play = useCallback((category: MusicCategory) => {
    if (!audioRef.current || isTransitioningRef.current) return;

    // Clear any existing fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    setCurrentCategory(category);
    const audio = audioRef.current;
    audio.src = AUDIO_FILES[category];
    audio.volume = 0;
    audio.currentTime = 0;
    
    const attemptPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
        fadeIn();
      }).catch((err) => {
        // Ignore AbortError - it's expected when switching quickly
        if (err.name !== 'AbortError') {
          console.error("Audio playback failed:", err);
        }
      });
    };
    
    // If audio is already ready (cached), play immediately
    // readyState >= 3 means HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
    if (audio.readyState >= 3) {
      attemptPlay();
    } else {
      // Wait for audio to be ready
      const handleCanPlay = () => {
        audio.removeEventListener('canplay', handleCanPlay);
        attemptPlay();
      };
      audio.addEventListener('canplay', handleCanPlay);
      audio.load();
    }
  }, [fadeIn]);

  const stop = useCallback(() => {
    fadeOut(() => {
      setIsPlaying(false);
    });
  }, [fadeOut]);

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
    if (isPlaying && audioRef.current) {
      isTransitioningRef.current = true;
      
      // Fade out, switch, fade in
      fadeOut(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.src = AUDIO_FILES[category];
          audio.volume = 0;
          audio.currentTime = 0;
          
          const attemptPlay = () => {
            audio.play().then(() => {
              fadeIn();
              isTransitioningRef.current = false;
            }).catch((err) => {
              isTransitioningRef.current = false;
              if (err.name !== 'AbortError') {
                console.error("Audio playback failed:", err);
              }
            });
          };
          
          // If audio is already ready (cached), play immediately
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
        } else {
          isTransitioningRef.current = false;
        }
      });
    }
  }, [isPlaying, fadeOut, fadeIn]);

  return {
    isPlaying,
    currentCategory,
    play,
    stop,
    toggle,
    setCategory,
  };
}
