// frontend/src/app/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link'; // Переконайся, що Link імпортовано
import { AddWordForm } from '@/components/AddWordForm'; // Використовуємо alias, якщо він налаштований
// Або відносний шлях: import { AddWordForm } from '../components/AddWordForm';
import { WordList } from '@/components/WordList';
// Або відносний шлях: import { WordList } from '../components/WordList';
import { useWordStore } from '@/store/wordStore';
// Або відносний шлях: import { useWordStore } from '../store/wordStore';

export default function HomePage() {
  const fetchWords = useWordStore((state) => state.fetchWords);
  const isLoading = useWordStore((state) => state.isLoading);
  const error = useWordStore((state) => state.error);
  const words = useWordStore((state) => state.words); // Отримуємо слова для перевірки кількості

  useEffect(() => {
    // Завантажуємо слова, тільки якщо їх ще немає в сторі (наприклад, при першому завантаженні)
    if (words.length === 0) {
      fetchWords();
    }
  }, [fetchWords, words.length]); // Додали words.length до залежностей

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-12 bg-slate-900 text-white">
      <div className="w-full max-w-3xl space-y-10">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-500">
            Language Trainer 🌍
          </h1>
          <p className="mt-2 text-slate-400">
            Додавайте нові слова та тренуйте їх!
          </p>
        </header>
        
        <AddWordForm />

        {isLoading && words.length === 0 && <p className="text-center text-sky-400">Завантаження слів...</p>}
        {error && <p className="text-center text-red-500">Помилка: {error}</p>}
        
        {/* Показуємо список слів, якщо не йде початкове завантаження і немає помилок */}
        {(!isLoading || words.length > 0) && !error && <WordList />} 
        
        {/* Кнопка для переходу на сторінку тренування */}
        {/* Вона з'явиться, тільки якщо є слова і немає помилок завантаження */}
        {words.length > 0 && !error && (
          <div className="mt-10 text-center">
            <Link 
              href="/train" 
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg text-lg transition duration-150 ease-in-out"
            >
              Почати тренування! ({words.length} слів)
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}