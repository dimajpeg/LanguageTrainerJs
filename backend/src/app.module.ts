// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Імпортуємо TypeOrmModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './words/words.module'; // Твій модуль для слів

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Тип бази даних
      host: 'localhost', // Адреса сервера БД (зазвичай localhost для локальної розробки)
      port: 5432, // Стандартний порт PostgreSQL
      username: 'dimamatusenko', // Твоє ім'я користувача PostgreSQL, яке ми створили
      password: '200405', // Твій пароль для користувача PostgreSQL
      database: 'language_trainer_db', // Назва бази даних, яку ми створили
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Шлях до файлів сутностей (ми створимо їх пізніше)
      synchronize: true, // ВАЖЛИВО: Тільки для розробки! Автоматично створює/оновлює схему БД.
      // На production це має бути false.
    }),
    WordsModule, // Залишаємо наш WordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
