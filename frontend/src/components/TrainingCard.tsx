// frontend/src/components/TrainingCard.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useWordStore, Word } from '../store/wordStore';

export function TrainingCard() {
  const wordsFromStore = useWordStore((state) => state.words);
  const fetchWords = useWordStore((state) => state.fetchWords);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (wordsFromStore.length === 0) {
      setIsLoading(true);
      fetchWords().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchWords, wordsFromStore.length]);
  
  useEffect(() => {
    if (wordsFromStore.length > 0) {
      // Перемішуємо масив слів один раз при завантаженні або оновленні
      setShuffledWords([...wordsFromStore].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [wordsFromStore]);


  const currentWord = useMemo(() => {
    if (shuffledWords.length > 0 && currentIndex < shuffledWords.length) {
      return shuffledWords[currentIndex];
    }
    return null;
  }, [shuffledWords, currentIndex]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false); 
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledWords.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledWords.length) % shuffledWords.length);
  };
  
  if (isLoading) {
    return <p className="text-sky-400 text-center text-xl">Завантаження слів для тренування...</p>;
  }

  if (shuffledWords.length === 0 || !currentWord) {
    return (
      <div className="p-6 bg-slate-800 rounded-lg shadow-xl text-center">
        <p className="text-slate-400 text-xl">Слів для тренування немає.</p>
        <p className="text-slate-500 mt-2">Будь ласка, додайте слова на головній сторінці.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-slate-800 rounded-lg shadow-xl flex flex-col items-center w-full max-w-lg">
      <div
        className="w-full h-60 md:h-72 bg-sky-700 rounded-lg shadow-lg cursor-pointer flex justify-center items-center perspective mb-6"
        onClick={handleFlip}
      >
        <div 
          className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Лицьова сторона картки */}
          <div className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">{currentWord.originalText}</p>
          </div>
          {/* Зворотня сторона картки */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex justify-center items-center p-4 bg-sky-600 rounded-lg text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">{currentWord.translatedText}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-around w-full mt-4">
        <button
          onClick={handlePrev}
          disabled={shuffledWords.length <= 1}
          className="px-5 py-2 md:px-6 md:py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Попереднє
        </button>
        <button
          onClick={handleNext}
          disabled={shuffledWords.length <= 1}
          className="px-5 py-2 md:px-6 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Наступне
        </button>
      </div>
      <p className="mt-6 text-sm text-slate-400">
        Слово {shuffledWords.length > 0 ? currentIndex + 1 : 0} з {shuffledWords.length}
      </p>
    </div>
  );
}