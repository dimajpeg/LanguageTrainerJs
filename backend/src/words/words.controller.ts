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
import { WordsService, CreateWordDto, Word } from './words.service'; // Імпортуємо також DTO та інтерфейс

@Controller('words') // Усі запити до цього контролера будуть починатися з /words
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get() // Обробляє GET-запити на /words
  findAll(): Word[] {
    return this.wordsService.findAll();
  }

  @Post() // Обробляє POST-запити на /words
  @HttpCode(HttpStatus.CREATED) // Встановлюємо статус відповіді 201 Created
  create(@Body() createWordDto: CreateWordDto): Word {
    // @Body() автоматично візьме дані з тіла запиту
    // і NestJS спробує перетворити їх на CreateWordDto
    // (пізніше ми додамо валідацію)
    return this.wordsService.create(createWordDto);
  }

  @Delete(':id') // Обробляє DELETE-запити на /words/some-id
  @HttpCode(HttpStatus.OK) // Можна також HttpStatus.NO_CONTENT (204), якщо нічого не повертати
  remove(@Param('id') id: string): { message: string } {
    // @Param('id') бере параметр 'id' з URL
    return this.wordsService.remove(id);
  }
}
