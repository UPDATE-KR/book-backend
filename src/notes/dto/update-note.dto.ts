import { IsOptional, IsBoolean } from 'class-validator';

export default class UpdateNoteDto {
  @IsOptional()
  readonly contents?: string;

  @IsOptional()
  @IsBoolean()
  readonly private?: boolean;
}
