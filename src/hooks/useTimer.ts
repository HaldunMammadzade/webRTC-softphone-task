import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseTimerReturn } from '@/types';

export const useTimer = (): UseTimerReturn => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const stopTimer = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
     
    }
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return {
    time,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer
  };
};