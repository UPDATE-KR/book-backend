import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsEmail({}, {
        message: "이메일 형식으로 작성해주세요."
    })
    readonly email: string;

    @IsNotEmpty({
        message: "비밀번호를 적어주세요."
    })
    readonly password: string;

}