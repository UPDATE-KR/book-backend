import { Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAll(): Promise<ApiResponse> {
    const returnMap: ApiResponse = {};

    try {
      returnMap['result'] = 1;
      returnMap['data'] = await this.bookService.findAll();
    } catch (e) {
      returnMap['result'] = 0;
      returnMap['resultCode'] = e.code || ApiErrorCode.UNKNOWN.code;
      returnMap['resultMsg'] = e.msg || ApiErrorCode.UNKNOWN.msg;
    }

    return returnMap;
  }

  @Post()
  async create(): Promise<ApiResponse> {
    const returnMap: ApiResponse = {};

    try {
    } catch (e) {}

    return returnMap;
  }
}
