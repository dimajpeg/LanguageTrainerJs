// frontend/src/app/page.tsx
import { AddWordForm } from '@/components/AddWordForm'; // Next.js автоматично знає шлях @/components
import { WordList } from '@/components/WordList';

export default function HomePage() {
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
        <WordList />
        
        {/* Тут пізніше буде кнопка для тренування */}
      </div>
    </main>
  );
}