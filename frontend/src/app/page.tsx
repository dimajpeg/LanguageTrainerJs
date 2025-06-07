// frontend/src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { AddWordForm } from '@/components/AddWordForm';
import { WordList } from '@/components/WordList';
import { useWordStore } from '@/store/wordStore';

export default function HomePage() {
  const fetchWords = useWordStore((state) => state.fetchWords);
  const isLoading = useWordStore((state) => state.isLoading);
  const error = useWordStore((state) => state.error);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

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

        {isLoading && <p className="text-center text-sky-400">Завантаження слів...</p>}
        {error && <p className="text-center text-red-500">Помилка: {error}</p>}
        {!isLoading && !error && <WordList />}
        
      </div>
    </main>
  );
}