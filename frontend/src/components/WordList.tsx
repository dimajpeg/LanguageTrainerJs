// frontend/src/components/WordList.tsx
'use client';

import { useWordStore } from '../store/wordStore'; // Шлях до стору

export function WordList() {
  const words = useWordStore((state) => state.words);
  const removeWord = useWordStore((state) => state.removeWord);

  if (words.length === 0) {
    return <p className="text-slate-400 text-center">Слів ще немає. Додайте перше!</p>;
  }

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-sky-400">Список слів ({words.length})</h2>
      <ul className="space-y-4">
        {words.map((word) => (
          <li
            key={word.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-slate-700 rounded-md shadow"
          >
            <div>
              <p className="text-lg font-medium text-white">{word.originalText}</p>
              <p className="text-sm text-slate-400">{word.translatedText}</p>
            </div>
            <button
              onClick={async () => await removeWord(word.id)}
              className="mt-3 md:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition duration-150 ease-in-out"
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}