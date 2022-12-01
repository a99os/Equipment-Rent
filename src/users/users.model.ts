import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'User1', description: 'Foydalanuvchi ismi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'user1@mail.uz',
    description: 'Foydalanuvchi elektron pochtasi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'Foydalanuvchi paroli' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '+998903147571',
    description: 'Foydalanuvchi telefon raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({
    example: 'location',
    description: 'Foydalanuvchi manzili',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: 'true',
    description: 'Admin foydalanuvchi yoki yo`q',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_admin: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Aktiv foydalanuvchi yoki yo`q',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  token: string;

  // @BelongsToMany(() => Role, () => UserRoles)
  // roles: Role[];
}
