// backend/src/words/words.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // Для генерації ID

// Визначимо інтерфейс для слова, схожий на той, що на фронтенді
export interface Word {
  id: string;
  originalText: string;
  translatedText: string;
  createdAt: Date;
}

// Створимо DTO (Data Transfer Object) для створення нового слова
// Це гарна практика для валідації вхідних даних (ми додамо валідацію пізніше)
export class CreateWordDto {
  originalText: string;
  translatedText: string;
}

@Injectable()
export class WordsService {
  // Поки що зберігаємо слова просто в масиві в пам'яті
  private words: Word[] = [
    // Декілька слів для прикладу, щоб одразу щось було
    {
      id: uuidv4(),
      originalText: 'apple',
      translatedText: 'яблуко',
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      originalText: 'book',
      translatedText: 'книга',
      createdAt: new Date(),
    },
  ];

  findAll(): Word[] {
    return this.words;
  }

  create(createWordDto: CreateWordDto): Word {
    const newWord: Word = {
      id: uuidv4(), // Генеруємо новий ID
      ...createWordDto,
      createdAt: new Date(),
    };
    this.words.push(newWord);
    return newWord;
  }

  remove(id: string): { message: string } {
    const wordIndex = this.words.findIndex((word) => word.id === id);
    if (wordIndex === -1) {
      throw new NotFoundException(`Word with ID "${id}" not found`);
    }
    this.words.splice(wordIndex, 1);
    return { message: `Word with ID "${id}" successfully deleted` };
  }
}
