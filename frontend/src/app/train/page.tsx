// frontend/src/app/train/page.tsx
'use client';

import { TrainingCard } from '../../components/TrainingCard';  // Переконайся, що шлях правильний
import Link from 'next/link';

export default function TrainPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 bg-slate-900 text-white">
      <div className="w-full max-w-xl text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-500">
          Тренування слів 🧠
        </h1>
      </div>

      <TrainingCard />

      <div className="mt-12">
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