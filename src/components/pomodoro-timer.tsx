"use client";

import { useState, useEffect } from "react";

interface PomodoroTimerProps {
  themeColor: string;
  duration?: number; // in minutes
}

export function PomodoroTimer({ themeColor, duration = 25 }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const reset = () => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
    setIsComplete(false);
  };

  return (
    <div 
      style={{ backgroundColor: themeColor }} 
      className="backdrop-blur-sm rounded-xl p-8 mt-4 mb-4 max-w-md w-full border border-white/20 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">⏱️ Pomodoro Timer</h3>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-6">
        {/* Progress ring */}
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="white"
            strokeWidth="12"
            fill="none"
            strokeDasharray={2 * Math.PI * 110}
            strokeDashoffset={2 * Math.PI * 110 * (1 - progress / 100)}
            strokeLinecap="round"
            className="transition-all duration-300 ease-linear"
          />
        </svg>
        
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {isComplete ? (
              <div className="animate-bounce">
                <div className="text-6xl mb-2">🎉</div>
                <div className="text-xl text-white font-semibold">Time's Up!</div>
              </div>
            ) : (
              <div className="text-6xl font-bold text-white tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        {!isComplete ? (
          <>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isRunning ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Start
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </>
        ) : (
          <button
            onClick={reset}
            className="px-8 py-3 bg-white/30 hover:bg-white/40 text-white rounded-lg font-medium transition-all shadow-lg"
          >
            Start New Session
          </button>
        )}
      </div>
    </div>
  );
}

