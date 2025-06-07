// backend/src/words/words.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Імпортуємо TypeOrmModule
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { WordEntity } from './word.entity'; // Імпортуємо нашу сутність

@Module({
  imports: [
    TypeOrmModule.forFeature([WordEntity]), // Реєструємо WordEntity для використання в цьому модулі
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
