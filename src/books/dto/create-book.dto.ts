import { IsNotEmpty, Length } from 'class-validator';

export default class CreateBookDto {
  @IsNotEmpty({
    message: '제목을 입력해주세요.',
  })
  @Length(1, 100, {
    message:
      '제목은 최소 $constraint1자 이상, $constraint2자 이하로 입력해주세요.',
  })
  readonly title: string;
}
