import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @ApiProperty({ example: 'images/default.png', description: 'Qurilma rasmi' })
  @IsString()
  @IsNotEmpty()
  readonly photo: string;
  @ApiProperty({ example: '100000', description: 'Qurilma narxi' })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
}
