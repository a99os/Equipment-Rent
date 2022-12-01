import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Equipment } from 'src/equipment/equipment.model';
import { User } from 'src/users/users.model';

interface OrderCreationAttrs {
  equipment_id: number;
  user_id: number;
  start_date: Date;
  end_date: Date;
  total_price: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  //=====================================================================
  @ApiProperty({ example: '1', description: 'Equipment id' })
  @ForeignKey(() => Equipment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  equipment_id: number;
  //=====================================================================
  @ApiProperty({ example: '1', description: 'User id' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
  //=====================================================================
  @ApiProperty({
    example: '2022-03-31',
    description: 'Buyurtma boshlanish sanasi',
  })
  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  start_date: Date;
  //=====================================================================
  @ApiProperty({
    example: '2022-04-01',
    description: 'Buyurtma tugash sanasi',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;
  //=====================================================================
  @ApiProperty({ example: '100000', description: 'Buyurtma umumiy narxi' })
  @Column({
    type: DataType.DECIMAL(13, 2),
    allowNull: false,
  })
  total_price: number;
  //=====================================================================
  @BelongsTo(() => Equipment)
  equipment: Equipment;

  @BelongsTo(() => User)
  consumer: User;
}
