import { Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }
}
