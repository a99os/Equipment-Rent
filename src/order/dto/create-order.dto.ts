import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  isDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Qurilma id si' })
  @IsNumber()
  @IsNotEmpty()
  readonly equipment_id: number;
  @ApiProperty({ example: 1, description: 'User id si' })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
  @ApiProperty({ example: '2022-01-19', description: 'Berilgan vaqti' })
  @IsDateString()
  readonly start_date: Date;
  @ApiProperty({ example: '2022-01-22', description: 'Olish vaqti' })
  @IsDateString()
  readonly end_date: Date;
  total_price: number;
}
