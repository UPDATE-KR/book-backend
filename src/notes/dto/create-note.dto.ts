import { IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export default class CreateNoteDto {
  @IsOptional()
  @IsNumber(
    {},
    {
      message: '책을 정확하게 선택해주세요.',
    },
  )
  readonly bookId?: number;

  @IsNotEmpty({
    message: '글 내용을 적어주세요.',
  })
  readonly contents: string;

  @IsOptional()
  @IsBoolean({
    message: '비공개 여부를 제대로 설정해주세요',
  })
  readonly private?: boolean = false;
}
