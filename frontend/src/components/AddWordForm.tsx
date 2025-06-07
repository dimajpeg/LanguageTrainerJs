// frontend/src/components/AddWordForm.tsx
'use client';

import { useState } from 'react';
import { useWordStore } from '../store/wordStore'; // Шлях до стору

export function AddWordForm() {
  const [original, setOriginal] = useState('');
  const [translated, setTranslated] = useState('');
  const addWord = useWordStore((state) => state.addWord);
  const isLoading = useWordStore((state) => state.isLoading);
  const currentError = useWordStore((state) => state.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!original.trim() || !translated.trim()) {
      alert('Будь ласка, заповніть обидва поля.');
      return;
    }
    const success = await addWord(original, translated);
    if (success) {
      setOriginal('');
      setTranslated('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-sky-400">Додати нове слово</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="originalWord" className="block text-sm font-medium text-slate-300 mb-1">
            Оригінал (напр. Англійська)
          </label>
          <input
            type="text"
            id="originalWord"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Enter original word"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-white"
          />
        </div>
        <div>
          <label htmlFor="translatedWord" className="block text-sm font-medium text-slate-300 mb-1">
            Переклад (напр. Українська)
          </label>
          <input
            type="text"
            id="translatedWord"
            value={translated}
            onChange={(e) => setTranslated(e.target.value)}
            placeholder="Введіть переклад"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-white"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full md:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Додавання...' : 'Додати слово'}
      </button>
      {currentError && <p className="mt-2 text-sm text-red-500">{currentError}</p>}
    </form>
  );
}