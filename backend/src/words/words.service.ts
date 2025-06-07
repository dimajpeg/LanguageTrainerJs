// backend/src/words/words.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './word.entity'; // Наша сутність
// import { v4 as uuidv4 } from 'uuid'; // uuidv4 більше не потрібен тут, ID генерує БД

// Інтерфейс Word нам все ще може бути корисний для типізації, хоча TypeORM працює з WordEntity
export interface Word {
  id: string;
  originalText: string;
  translatedText: string;
  createdAt: Date;
}

export class CreateWordDto {
  originalText: string;
  translatedText: string;
}

@Injectable()
export class WordsService {
  // Ін'єктуємо репозиторій для WordEntity
  constructor(
    @InjectRepository(WordEntity)
    private wordsRepository: Repository<WordEntity>,
  ) {}

  async findAll(): Promise<WordEntity[]> {
    return this.wordsRepository.find(); // Метод find() з TypeORM для отримання всіх записів
  }

  async create(createWordDto: CreateWordDto): Promise<WordEntity> {
    // Створюємо новий екземпляр сутності
    const newWord = this.wordsRepository.create(createWordDto);
    // createdAt буде встановлено автоматично завдяки @CreateDateColumn
    // id буде згенеровано автоматично базою даних
    return this.wordsRepository.save(newWord); // Метод save() для збереження в БД
  }

  async remove(id: string): Promise<{ message: string }> {
    // Метод delete() повертає результат видалення (кількість видалених рядків)
    const result = await this.wordsRepository.delete(id);

    if (result.affected === 0) {
      // Якщо нічого не було видалено, значить, запис з таким ID не знайдено
      throw new NotFoundException(`Word with ID "${id}" not found`);
    }
    return { message: `Word with ID "${id}" successfully deleted` };
  }
}
