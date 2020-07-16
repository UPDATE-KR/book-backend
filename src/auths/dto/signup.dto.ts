import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length, IsOptional,  } from 'class-validator';

export class SignUpDto {

    @IsEmail({}, {
        message: "아이디는 이메일 형식으로 입력해주세요."
    })
    readonly email: string;

    @IsNotEmpty({
        message: "비밀번호를 입력해주세요."
    })
    @Length(8, 16, {
        message: "비밀번호는 $constraint1자이상 $constraint2이하로 입력해주세요."
    })
    readonly password: string;

    @IsNotEmpty({
        message: "이름을 입력해주세요."
    })
    @Length(2, 10, {
        message: "이름은 $constraint1자 이상 $constraint2자 이하로 입력해주세요."
    })
    readonly username: string;

    @IsOptional()
    @Length(2, 10, {
        message: "닉네임은 $constraint1자 이상 $constraint2이하로 입력해주세요."
    })
    readonly nickname?: string;

}