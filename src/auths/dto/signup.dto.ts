import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length,  } from 'class-validator';

export class SignUpDto {

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @Length(8, 16)
    readonly password: string;

    @IsNotEmpty()
    @Length(2, 10)
    readonly username: string;

    @IsString()
    readonly nickname?: string;

}