// backend/src/words/words.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
// Інтерфейс Word тут вже не потрібен, будемо використовувати WordEntity
import { WordsService, CreateWordDto } from './words.service';
import { WordEntity } from './word.entity'; // Імпортуємо WordEntity

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  // Вказуємо, що метод повертає Promise, який розв'яжеться в масив WordEntity
  async findAll(): Promise<WordEntity[]> {
    return this.wordsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // Вказуємо, що метод повертає Promise, який розв'яжеться в WordEntity
  async create(@Body() createWordDto: CreateWordDto): Promise<WordEntity> {
    return this.wordsService.create(createWordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  // Вказуємо, що метод повертає Promise, який розв'яжеться в об'єкт з повідомленням
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.wordsService.remove(id);
  }
}
