// frontend/src/store/wordStore.ts
import { create } from 'zustand';

interface Word {
  id: string;
  originalText: string;
  translatedText: string;
  createdAt: Date;
}

interface WordState {
  words: Word[];
  addWord: (original: string, translated: string) => void;
  removeWord: (id: string) => void;
}

export const useWordStore = create<WordState>((set) => ({
  words: [], // Початковий стан - порожній масив слів
  addWord: (original, translated) =>
    set((state) => ({
      words: [
        ...state.words,
        {
          id: crypto.randomUUID(), // Простий генератор ID для фронтенду
          originalText: original,
          translatedText: translated,
          createdAt: new Date(),
        },
      ],
    })),
  removeWord: (id) =>
    set((state) => ({
      words: state.words.filter((word) => word.id !== id),
    })),
}));