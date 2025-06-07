// backend/src/words/word.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('words') // Вказує, що цей клас є сутністю і буде зіставлений з таблицею 'words'
export class WordEntity {
  @PrimaryGeneratedColumn('uuid') // Первинний ключ, що генерується автоматично як UUID
  id: string;

  @Column({ type: 'varchar', length: 255 }) // Стовпець для оригінального тексту
  originalText: string;

  @Column({ type: 'varchar', length: 255 }) // Стовпець для перекладеного тексту
  translatedText: string;

  @CreateDateColumn() // Автоматично встановлює дату створення при додаванні запису
  createdAt: Date;
}
