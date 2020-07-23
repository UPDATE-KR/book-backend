import { Length, IsBoolean, IsOptional } from 'class-validator';

export default class UpdateBookDto {
  @IsOptional()
  @Length(1, 100, {
    message:
      '제목은 최소 $constraint1자 이상, $constraint2자 이하로 입력해주세요.',
  })
  readonly title?: string;

  @IsOptional()
  @IsBoolean({
    message: '비공개 여부를 제대로 설정해주세요.',
  })
  readonly private?: boolean;
}
