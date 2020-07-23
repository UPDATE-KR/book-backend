import {
  Controller,
  Get,
  Post,
  Query,
  DefaultValuePipe,
  Body,
  Req,
  UseGuards,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../core/authentication/jwt-auth.guard';
import UpdateBookDto from './dto/update-book.dto';
import { JwtAuthOptionalGuard } from 'src/core/authentication/jwt-auth-optional.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  @UseGuards(JwtAuthOptionalGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(0), new ParseIntPipe()) page: number,
    @Req() { user }: FastifyRequest,
  ) {
    return await this.bookService.findAll(page, user);
  }

  @Get(':book_id')
  @UseGuards(JwtAuthOptionalGuard)
  async findById(
    @Param('book_id', new ParseIntPipe()) book_id: number,
    @Req() { user }: FastifyRequest,
  ) {
    return await this.bookService.findById(book_id, user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() payload: CreateBookDto,
    @Req() { user }: FastifyRequest,
  ) {
    return await this.bookService.create(payload, user);
  }

  @Patch(':book_id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('book_id', new ParseIntPipe()) book_id: number,
    @Body() payload: UpdateBookDto,
    @Req() { user }: FastifyRequest,
  ) {
    return await this.bookService.update(book_id, payload, user);
  }

  @Delete(':book_id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Req() { user }: FastifyRequest,
    @Param('book_id', new ParseIntPipe()) book_id: number,
  ) {
    return await this.bookService.remove(user, book_id);
  }
}
