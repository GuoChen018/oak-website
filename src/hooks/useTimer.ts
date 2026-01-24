"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setDuration: (minutes: number) => void;
  formatTime: (seconds: number) => string;
}

export function useTimer(initialMinutes: number = 25): UseTimerReturn {
  const [duration, setDurationState] = useState(initialMinutes * 60);
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (timeRemaining > 0) {
      setIsRunning(true);
      setIsComplete(false);
    }
  }, [timeRemaining]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimerInterval();
  }, [clearTimerInterval]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeRemaining(duration);
    clearTimerInterval();
  }, [duration, clearTimerInterval]);

  const setDuration = useCallback((minutes: number) => {
    const seconds = minutes * 60;
    setDurationState(seconds);
    setTimeRemaining(seconds);
    setIsRunning(false);
    setIsComplete(false);
    clearTimerInterval();
  }, [clearTimerInterval]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            clearTimerInterval();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearTimerInterval();
  }, [isRunning, clearTimerInterval]);

  return {
    timeRemaining,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    setDuration,
    formatTime,
  };
}
