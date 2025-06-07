# Language Trainer 🌍 - Мовна платформа SPA

Простий односторінковий застосунок (SPA) для вивчення нових слів за допомогою карток та таймера Pomodoro.

## 🚀 Основний функціонал

*   **Керування словами:** Додавання, перегляд та видалення слів (наприклад, англо-українських пар).
*   **Тренування:** Інтерактивні картки для повторення слів (оригінал/переклад).
*   **Таймер Pomodoro:** Вбудований таймер для організації навчальних сесій на сторінці тренування.
*   **Збереження даних:** Слова зберігаються в базі даних PostgreSQL.

## 🛠️ Стек технологій

*   **Фронтенд:** Next.js (React), Zustand, Tailwind CSS, TypeScript
*   **Бекенд:** NestJS, TypeORM, PostgreSQL, TypeScript
*   **Інструменти:** pnpm

### Передумови
1.  Node.js (LTS)
2.  `pnpm` (`npm install -g pnpm`)
3.  Запущений сервер PostgreSQL.
4.  Створений користувач PostgreSQL та база даних `language_trainer_db`.

### Бекенд
1.  `cd backend`
2.  `pnpm install`
3.  Налаштуйте підключення до БД у `src/app.module.ts` (хост, порт, ім'я користувача, пароль, назва БД).
4.  `pnpm run start:dev` (зазвичай на `http://localhost:3000`)

### Фронтенд
1.  `cd frontend`
2.  `pnpm install`
3.  Переконайтеся, що `API_URL` у `src/store/wordStore.ts` вказує на ваш бекенд.
4.  `pnpm run dev` (зазвичай на `http://localhost:3001`)

## 📸 Скріншоти
![localhost_3001_ (1)](https://github.com/user-attachments/assets/6d7d01d1-9109-4313-b777-4ff3c0460728)
![localhost_3001_ (2)](https://github.com/user-attachments/assets/fa6040e4-94ec-44ed-9ced-7bf9be0e07b6)

