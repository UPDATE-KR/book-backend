import { Injectable, LoggerService, Logger } from '@nestjs/common';
import Prisma from '../core/database/prisma';
import Pagination from '../lib/pagination';
import { User } from '@prisma/client';
import CreateBookDto from './dto/create-book.dto';
import { ApiException } from '../common/exception/ApiException';
import ApiErrorCode from '../common/exception/ApiErrorCode';
import UpdateBookDto from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly logger: Logger;

  constructor(private readonly prisma: Prisma) {
    this.logger = new Logger('BookService', false);
  }

  async findAll(page: number, user?: User) {
    const returnMap = {};

    const pagination = new Pagination(page);
    returnMap['list'] = await this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        private: true,
        user: true,
      },
      where: {
        OR: [
          user
            ? {
                OR: [
                  {
                    userId: user.id,
                  },
                  {
                    userId: {
                      not: user.id,
                    },
                    private: false,
                  },
                ],
              }
            : {
                private: false,
              },
        ],
      },
      take: pagination.limit,
      skip: pagination.offset,
    });

    pagination.count = await this.prisma.book.count({
      where: {
        OR: [
          user
            ? {
                OR: [
                  {
                    userId: user.id,
                  },
                  {
                    userId: {
                      not: user.id,
                    },
                    private: false,
                  },
                ],
              }
            : {
                private: false,
              },
        ],
      },
    });

    returnMap['pagination'] = pagination;
    return returnMap;
  }

  async findById(book_id: number, user?: User) {
    const returnMap = {};

    const book = await this.prisma.book.findOne({
      where: {
        id: book_id,
      },
    });

    if (!book) throw new ApiException(ApiErrorCode.BOOK_NOT_FOUND);
    if (book['private']) {
      if (!user) throw new ApiException(ApiErrorCode.BOOK_IS_PRIVATE);
      else if (book['userId'] !== user['id'])
        throw new ApiException(ApiErrorCode.BOOK_IS_PRIVATE);
    }

    let notes = await this.prisma.note.findMany({
      where: {
        AND: [
          {
            bookId: book['id'],
          },
          {
            OR: [
              user
                ? {
                    OR: [
                      {
                        userId: user.id,
                      },
                      {
                        userId: {
                          not: user.id,
                        },
                        private: false,
                      },
                    ],
                  }
                : {
                    private: false,
                  },
            ],
          },
        ],
      },
    });
    notes = notes.map(item => {
      item['contents'] = item['contents']
        ? item['contents'].substr(0, 10)
        : item.contents;

      return item;
    });

    returnMap['book'] = book;
    returnMap['notes'] = notes;
    return returnMap;
  }

  async create(payload: CreateBookDto, user: User) {
    await this.prisma.book.create({
      data: {
        title: payload.title,
        private: payload.private,
        notes: {
          create: {
            contents: '내용을 적어보세요!',
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      msg: 'ok',
    };
  }

  async update(book_id: number, payload: UpdateBookDto, user: User) {
    const book = await this.prisma.book.findOne({
      where: {
        id: book_id,
      },
    });
    if (!book) throw new ApiException(ApiErrorCode.BOOK_NOT_FOUND);
    if (book.userId !== user.id)
      throw new ApiException(ApiErrorCode.PERMISSION_DENIED);

    await this.prisma.book.update({
      data: {
        ...payload,
      },
      where: {
        id: book.id,
      },
    });

    return {
      msg: 'ok',
    };
  }

  async remove(user: User, book_id: number) {
    const book = await this.prisma.book.findOne({
      where: {
        id: book_id,
      },
    });
    if (!book) throw new ApiException(ApiErrorCode.BOOK_NOT_FOUND);
    if (book.userId !== user.id)
      throw new ApiException(ApiErrorCode.PERMISSION_DENIED);

    try {
      await this.prisma.book.delete({
        where: {
          id: book_id,
        },
        include: {
          notes: true,
        },
      });
    } catch (e) {
      this.logger.error(e);
    }

    return {
      msg: 'ok',
    };
  }
}
