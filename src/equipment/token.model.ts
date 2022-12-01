import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model } from 'sequelize-typescript';

export class Token extends Model<Token> {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlzX2FkbWluIjp0cnVlLCJpc19hY3RpdmUiOnRydWUsImlhdCI6MTY2OTkxMjIxNSwiZXhwIjoxNjY5OTk4NjE1fQ.re5e0LvhhsFwRnnsLlASkZPs1f8hNAvnJGKOJLZq08Q',
    description: 'Token',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  token: number;
}
