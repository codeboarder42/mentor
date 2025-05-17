import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from './role';

export class CreateUSerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
