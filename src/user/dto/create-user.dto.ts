import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsOptional()
  tokens: { token: string }[];
}
