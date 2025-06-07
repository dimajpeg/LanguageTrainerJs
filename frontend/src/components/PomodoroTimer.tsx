// frontend/src/components/PomodoroTimer.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';

const WORK_DURATION = 25 * 60; // 25 хвилин в секундах
const SHORT_BREAK_DURATION = 5 * 60; // 5 хвилин
const LONG_BREAK_DURATION = 15 * 60; // 15 хвилин

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    if (mode === 'work') {
      setTimeLeft(WORK_DURATION);
    } else if (mode === 'shortBreak') {
      setTimeLeft(SHORT_BREAK_DURATION);
    } else {
      setTimeLeft(LONG_BREAK_DURATION);
    }
  }, [mode]);

  useEffect(() => {
    resetTimer(); // Встановлюємо час відповідно до початкового режиму
  }, [mode, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Автоматичний перехід до наступного режиму
      if (mode === 'work') {
        const newPomodorosCompleted = pomodorosCompleted + 1;
        setPomodorosCompleted(newPomodorosCompleted);
        if (newPomodorosCompleted % 4 === 0) {
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else { // shortBreak or longBreak
        setMode('work');
      }
      // Можна додати звукове сповіщення тут
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, pomodorosCompleted]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false); // Зупиняємо таймер при зміні режиму вручну
  };
  
  return (
    <div className="mt-10 p-6 bg-slate-700 rounded-lg shadow-xl text-center w-full max-w-sm">
      <h3 className="text-2xl font-semibold mb-4 text-amber-400">Pomodoro Таймер</h3>
      <div className="flex justify-center space-x-2 mb-4">
        <button 
          onClick={() => handleModeChange('work')} 
          className={`px-3 py-1 text-sm rounded-md ${mode === 'work' ? 'bg-red-600 text-white' : 'bg-slate-600 hover:bg-slate-500'}`}
        >
          Робота
        </button>
        <button 
          onClick={() => handleModeChange('shortBreak')} 
          className={`px-3 py-1 text-sm rounded-md ${mode === 'shortBreak' ? 'bg-green-600 text-white' : 'bg-slate-600 hover:bg-slate-500'}`}
        >
          Перерва
        </button>
        <button 
          onClick={() => handleModeChange('longBreak')} 
          className={`px-3 py-1 text-sm rounded-md ${mode === 'longBreak' ? 'bg-blue-600 text-white' : 'bg-slate-600 hover:bg-slate-500'}`}
        >
          Довга перерва
        </button>
      </div>

      <div className="text-6xl font-mono font-bold my-6 text-white">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md"
        >
          {isActive ? 'Пауза' : 'Старт'}
        </button>
        <button
          onClick={() => {
            resetTimer();
            // Опціонально: скинути pomodorosCompleted, якщо потрібно починати цикл заново
            // setPomodorosCompleted(0); 
          }}
          className="px-8 py-3 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md"
        >
          Скинути
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-400">Виконано Pomodoro: {pomodorosCompleted}</p>
    </div>
  );
}