import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({ example: 'Perfarator', description: 'Qurilma nomi' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    example: 'Perfarator haqida ma`lumot',
    description: 'Qurilma haqida ma`lumot',
  })
  @IsString()
  readonly description: string;
  @ApiProperty({ example: '100000', description: 'Qurilma narxi' })
  @Matches(/^[0-9]/i, { message: 'Narx son bo`lishi kerak' })
  @IsNotEmpty()
  readonly price: number;
  @ApiProperty({ example: 1, description: 'User ID' })
  @Matches(/^[0-9]/i, { message: 'Narx son bo`lishi kerak' })
  @IsNotEmpty()
  readonly user_id: number;
}
