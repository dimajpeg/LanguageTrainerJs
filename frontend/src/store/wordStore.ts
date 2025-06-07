// frontend/src/store/wordStore.ts
import { create } from 'zustand';
import axios from 'axios'; // Тепер цей імпорт коректний

const API_URL = 'http://localhost:3000/words'; 

export interface Word { 
  id: string;
  originalText: string;
  translatedText: string;
  createdAt: Date;
}

interface ApiWord {
  id: string;
  originalText: string;
  translatedText: string;
  createdAt: string; 
}

interface WordState {
  words: Word[];
  isLoading: boolean;
  error: string | null;
  fetchWords: () => Promise<void>;
  addWord: (original: string, translated: string) => Promise<boolean>;
  removeWord: (id: string) => Promise<void>;
}

export const useWordStore = create<WordState>((set, get) => ({
  words: [],
  isLoading: false,
  error: null,

  fetchWords: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<ApiWord[]>(API_URL);
      const wordsWithDateObjects = response.data.map((word: ApiWord) => ({
        ...word,
        createdAt: new Date(word.createdAt),
      }));
      set({ words: wordsWithDateObjects, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch words';
      set({ error: errorMessage, isLoading: false });
      console.error('Failed to fetch words:', err);
    }
  },

  addWord: async (original, translated) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<ApiWord>(API_URL, {
        originalText: original,
        translatedText: translated,
      });
      const newWordWithDateObject = {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
      };
      set((state) => ({
        words: [...state.words, newWordWithDateObject],
        isLoading: false,
      }));
      return true; 
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add word';
      set({ error: errorMessage, isLoading: false });
      console.error('Failed to add word:', err);
      return false; 
    }
  },

  removeWord: async (id: string) => {
    const originalWords = get().words; 
    set((state) => ({
      words: state.words.filter((word) => word.id !== id),
      isLoading: true, 
      error: null,
    }));
    try {
      await axios.delete(`${API_URL}/${id}`);
      set({ isLoading: false }); 
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove word';
      set({ words: originalWords, error: errorMessage, isLoading: false });
      console.error('Failed to remove word:', err);
    }
  },
}));