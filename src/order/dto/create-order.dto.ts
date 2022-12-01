import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderrDto {
  @ApiProperty({ example: 1, description: 'Qurilma id si' })
  @IsNumber()
  @IsNotEmpty()
  readonly equipment_id: number;
  @ApiProperty({ example: 1, description: 'User id si' })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
  @ApiProperty({ example: '2022-01-19', description: 'Berilgan vaqti' })
  @IsDate()
  readonly start_date: Date;
  @ApiProperty({ example: '2022-01-22', description: 'Olish vaqti' })
  @IsDate()
  readonly end_date: Date;
  @ApiProperty({ example: '123000', description: 'Umumiy summasi' })
  @IsNumber()
  @IsNotEmpty()
  readonly total_price: number;
}
