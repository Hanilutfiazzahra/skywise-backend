import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { seedLessons } from './lessons.seed';

@Injectable()
export class LessonsService {
  private lessons: Lesson[] = [...seedLessons];

  create(createLessonDto: CreateLessonDto) {
    this.pastikanJudulBelumAda(createLessonDto.title);

    const lesson: Lesson = {
      id: randomUUID(),
      title: createLessonDto.title.trim(),
      theme: createLessonDto.theme,
      icon: createLessonDto.icon ?? '📘',
      description: createLessonDto.description.trim(),
      content: createLessonDto.content ?? '',
      funFact: createLessonDto.funFact ?? '',
      level: createLessonDto.level ?? 1,
      published: createLessonDto.published ?? true,
      publishedAt: createLessonDto.publishedAt ?? new Date().toISOString(),
    };

    this.lessons.push(lesson);
    return lesson;
  }

  findAll() {
    return this.lessons;
  }

  findOne(id: string) {
    const lesson = this.lessons.find((item) => item.id === id);
    if (!lesson) {
      throw new NotFoundException(`Materi dengan id "${id}" tidak ditemukan.`);
    }
    return lesson;
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = this.findOne(id);

    if (updateLessonDto.title) {
      this.pastikanJudulBelumAda(updateLessonDto.title, id);
      updateLessonDto.title = updateLessonDto.title.trim();
    }
    if (updateLessonDto.description) {
      updateLessonDto.description = updateLessonDto.description.trim();
    }

    Object.assign(lesson, updateLessonDto);
    return lesson;
  }

  remove(id: string) {
    const lesson = this.findOne(id);
    this.lessons = this.lessons.filter((item) => item.id !== id);
    return { message: `Materi "${lesson.title}" berhasil dihapus.` };
  }

  private pastikanJudulBelumAda(title: string, kecualiId?: string) {
    const judul = title.trim().toLowerCase();
    const kembar = this.lessons.find(
      (item) => item.id !== kecualiId && item.title.toLowerCase() === judul,
    );
    if (kembar) {
      throw new ConflictException(`Materi dengan judul "${title}" sudah ada.`);
    }
  }
}
