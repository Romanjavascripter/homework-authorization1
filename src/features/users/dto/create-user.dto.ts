import { IsEmail, IsInt, IsOptional, IsString, Length, Matches, MaxLength} from 'class-validator'; 

export class CreateUserDto {
    @IsString()
    @Length(3,50)
    @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Логин может содержать только латиницу, цифры и подчёркивание',
  })
    login: string;

    @IsEmail({}, {message: "Некорректный email"})
    @IsString()
    @MaxLength(255)
    email: string;

    @IsString()
    @Length(8,72)
    password: string;

    @IsInt()
    age:number;
    
    @IsOptional()
    @IsString()
    description?: string
}