import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: 'Qurilma id si' })
  @IsNumber()
  @IsNotEmpty()
  readonly equipment_id: number;
  @ApiProperty({ example: 1, description: 'User id si' })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
  @ApiProperty({
    example: 'Bu yaxshi qurilma ekan',
    description: 'qurilma haqida fikrlar',
  })
  @IsString()
  @IsNotEmpty()
  readonly comment: string;
  @ApiProperty({
    example: 5,
    description: 'Qurilmaga qo`yilgan reyting',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  readonly rating: number;
}
