import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Equipment } from 'src/equipment/equipment.model';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs {
  equipment_id: number;
  user_id: number;
  comment: string;
  rating: number;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  //=====================================================================
  @ApiProperty({ example: 1, description: 'Equipment id' })
  @ForeignKey(() => Equipment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  equipment_id: number;
  //=====================================================================
  @ApiProperty({ example: 1, description: 'User id' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
  //=====================================================================
  @ApiProperty({
    example: 'Bu yaxshi qurilma ekan',
    description: 'qurilma haqida fikrlar',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;
  //=====================================================================
  @ApiProperty({
    example: 5,
    description: 'Qurilmaga qo`yilgan reyting',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating: number;
  //=====================================================================
  @BelongsTo(() => Equipment)
  equipment: Equipment;

  @BelongsTo(() => User)
  consumer: User;
}
