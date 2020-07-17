import { Injectable } from '@nestjs/common';
import Prisma from 'src/core/database/prisma';
import Pagination from 'src/lib/pagination';
import { User } from '@prisma/client';
import CreateBookDto from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: Prisma) {}

  async findAll(page: number) {
    const returnMap = {};

    const pagination = new Pagination(page);
    returnMap['list'] = await this.prisma.book.findMany({
      take: pagination.limit,
      skip: pagination.offset,
    });
    pagination.count = await this.prisma.book.count();

    returnMap['pagination'] = pagination;
    return returnMap;
  }

  async create(user: User, body: CreateBookDto) {
    await this.prisma.book.create({
      data: {
        title: body.title,
        notes: {
          create: {
            contents: '내용을 적어보세요!',
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
}
