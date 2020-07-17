import {
  Controller,
  Get,
  Post,
  Query,
  DefaultValuePipe,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from 'src/core/authentication/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAll(@Query('page', new DefaultValuePipe(0)) page: number) {
    return await this.bookService.findAll(page);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() { user }: FastifyRequest, @Body() body: CreateBookDto) {
    return await this.bookService.create(user, body);
  }
}
