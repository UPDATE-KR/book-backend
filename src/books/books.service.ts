import { Injectable } from '@nestjs/common';
import Prisma from 'src/core/database/prisma';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: Prisma) {}

    async findAll() {
        const returnMap = {};

        returnMap['list'] = await this.prisma.book.findMany();

        return returnMap;
    }

}
