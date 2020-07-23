import { Injectable } from '@nestjs/common';
import Prisma from 'src/core/database/prisma';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { User } from '@prisma/client';
import CreateNoteDto from './dto/create-note.dto';
import UpdateNoteDto from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: Prisma) {}

  async findById(note_id: number, user?: User) {
    const returnMap = {};

    const note = await this.prisma.note.findOne({
      select: {
        id: true,
        bookId: true,
        contents: true,
        private: true,
        createdAt: true,
        updatedAt: true,
        user: true,
      },
      where: {
        id: note_id,
      },
    });
    if (!note) throw new ApiException(ApiErrorCode.NOTE_NOT_FOUND);
    if (note['private']) {
      if (!user) throw new ApiException(ApiErrorCode.NOTE_IS_PRIVATE);
      else if (note['user']['id'] !== user['id'])
        throw new ApiException(ApiErrorCode.NOTE_IS_PRIVATE);
    }
    const book = await this.prisma.book.findOne({
      select: {
        id: true,
        title: true,
        private: true,
        createdAt: true,
        updatedAt: true,
        user: true,
      },
      where: {
        id: note['bookId'],
      },
    });

    returnMap['note'] = note;
    returnMap['book'] = book;
  }

  async create(payload: CreateNoteDto, user: User) {
    if (payload.bookId) {
      const book = await this.prisma.book.findOne({
        where: {
          id: payload.bookId,
        },
      });
      if (!book) throw new ApiException(ApiErrorCode.BOOK_NOT_FOUND);
      if (book.userId !== user.id)
        throw new ApiException(ApiErrorCode.PERMISSION_DENIED);
    }

    await this.prisma.note.create({
      data: {
        contents: payload.contents,
        private: payload.private,
        user: {
          connect: {
            id: user.id,
          },
        },
        book: payload.bookId
          ? {
              connect: {
                id: payload.bookId,
              },
            }
          : null,
      },
    });

    return {
      msg: 'ok',
    };
  }

  async update(noteId: number, payload: UpdateNoteDto, user: User) {
    const note = await this.prisma.note.findOne({
      where: {
        id: noteId,
      },
    });
    if (!note) throw new ApiException(ApiErrorCode.NOTE_NOT_FOUND);
    if (note['userId'] !== user['id'])
      throw new ApiException(ApiErrorCode.PERMISSION_DENIED);

    await this.prisma.note.update({
      data: {
        contents: payload.contents,
        private: payload.private,
      },
      where: {
        id: note['id'],
      },
    });

    return {
      msg: 'ok',
    };
  }

  async unlink(noteId: number, user: User) {
    const note = await this.prisma.note.findOne({
      where: {
        id: noteId,
      },
    });
    if (!note) throw new ApiException(ApiErrorCode.NOTE_NOT_FOUND);
    if (note['userId'] !== user['id'])
      throw new ApiException(ApiErrorCode.PERMISSION_DENIED);

    if (note['bookId'])
      await this.prisma.note.update({
        data: {
          book: {
            disconnect: true,
          },
        },
        where: {
          id: note['id'],
        },
      });

    return {
      msg: 'ok',
    };
  }
}
