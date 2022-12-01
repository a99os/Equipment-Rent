import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

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
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/gm, {
    message:
      'Password must be between 6 and 64 characters long with 1 special character and capital character each',
  })
  readonly password: string;

  @ApiProperty({
    example: '998993147571',
    description: 'Foydalanuvchi telefon raqami',
  })
  @IsNotEmpty()
  @Matches(/^998([378]{2}|(9[013-57-9]))\d{7}$/gm, {
    message: 'Phone number must be Uzbekistan number',
  })
  readonly phone_number: string;
  @ApiProperty({
    example: 'long:45.3545 lat:12.3244',
    description: 'Foydalanuvchi locatsiyasi',
  })
  @IsString()
  readonly location: string;
}
