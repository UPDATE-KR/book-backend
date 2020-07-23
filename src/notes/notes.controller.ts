import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthOptionalGuard } from 'src/core/authentication/jwt-auth-optional.guard';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from 'src/core/authentication/jwt-auth.guard';
import CreateNoteDto from './dto/create-note.dto';
import UpdateNoteDto from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get(':note_id')
  @UseGuards(JwtAuthOptionalGuard)
  async findById(
    @Req() { user }: FastifyRequest,
    @Param('note_id', new ParseIntPipe()) note_id: number,
  ) {
    return await this.noteService.findById(note_id, user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() payload: CreateNoteDto,
    @Req() { user }: FastifyRequest,
  ) {
    return await this.noteService.create(payload, user);
  }

  @Patch(':note_id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('note_id', new ParseIntPipe()) noteId: number,
    @Body() payload: UpdateNoteDto,
    @Req() { user }: FastifyRequest,
  ) {
    return await this.noteService.update(noteId, payload, user);
  }

  @Post(':note_id/unlink')
  @UseGuards(JwtAuthGuard)
  async unlink(
    @Param('note_id', new ParseIntPipe()) noteId: number,
    @Req() { user }: FastifyRequest,
  ) {
    return await this.noteService.unlink(noteId, user);
  }
}
