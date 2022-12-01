import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from 'src/comment/comment.model';
import { User } from 'src/users/users.model';

interface EquipmentCreationAttrs {
  name: string;
  price: string;
  image: string;
  total_rating: number;
  user_id: number;
}

@Table({ tableName: 'equipment' })
export class Equipment extends Model<Equipment, EquipmentCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Perfarator', description: 'Qurilma nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Perfarator haqida ma`lumot',
    description: 'Qurilma haqida ma`lumot',
  })
  @Column({
    type: DataType.DOUBLE,
  })
  description: string;

  @ApiProperty({ example: '100000', description: 'Qurilma narxi' })
  @Column({
    type: DataType.DECIMAL(13, 2),
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: 'images/default.png', description: 'Qurilma rasmi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({ example: '4.7', description: 'Qurilma reytingi' })
  @Column({
    type: DataType.DOUBLE,
  })
  total_rating: number;

  @ApiProperty({ example: '1', description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @ApiProperty({ example: 'true', description: 'Qurilma faolligi' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: number;

  @BelongsTo(() => User)
  renter: User;

  @HasMany(() => Comment)
  comments: Comment[];
}
