import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, Matches } from 'class-validator';

export class UpdateEquipmentDto {
  @ApiProperty({ example: 'Perfarator', description: 'Qurilma nomi' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty({
    example: 'Perfarator haqida ma`lumot',
    description: 'Qurilma haqida ma`lumot',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
  @IsOptional()
  @ApiProperty({ example: '100000', description: 'Qurilma narxi' })
  @Matches(/^[0-9]/i, { message: 'Narx son bo`lishi kerak' })
  readonly price: number;
}
