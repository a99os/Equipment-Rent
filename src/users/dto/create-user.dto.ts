import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User1', description: 'Foydalanuvchi ismi' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'User1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'dHB223@#Bsh',
    description: 'Foydalanuvchi paroli',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,64}$/i, {
    message:
      'Password must be between 6 and 64 characters long with 1 special character and capital character each',
  })
  readonly password: string;

  @ApiProperty({
    example: '998993147571',
    description: 'Foydalanuvchi telefon raqami',
  })
  @IsNotEmpty()
  @Matches(/^998([378]{2}|(9[013-57-9]))\d{7}$/i, {
    each: true,
    message: 'Phone number must be Uzbekistan number',
  })
  readonly phone_number: string;
  @ApiProperty({
    example: 'long:45.3545 lat:12.3244',
    description: 'Foydalanuvchi locatsiyasi',
  })
  @IsOptional()
  @IsString()
  readonly location: string;
}
