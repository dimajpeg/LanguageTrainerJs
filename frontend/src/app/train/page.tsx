// frontend/src/app/train/page.tsx
'use client';

// Використовуємо відносний шлях, як ти виправив раніше
import { TrainingCard } from '../../components/TrainingCard'; 
import { PomodoroTimer } from '../../components/PomodoroTimer'; // Додаємо імпорт PomodoroTimer
import Link from 'next/link';

export default function TrainPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 md:pt-20 px-4 bg-slate-900 text-white space-y-10 md:space-y-12">
      {/* Заголовок сторінки */}
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-500">
          Тренування слів 🧠
        </h1>
      </div>

      {/* Компонент для тренувальних карток */}
      <TrainingCard />

      {/* Компонент таймера Pomodoro */}
      <PomodoroTimer />

      {/* Кнопка для повернення на головну сторінку */}
      <div className="pb-12"> {/* Додав відступ знизу */}
        <Link
          href="/"
          className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          ← На Головну
        </Link>
      </div>
    </main>
  );
}