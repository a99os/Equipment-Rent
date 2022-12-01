import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Comment } from 'src/comment/comment.model';
import { Order } from 'src/order/order.model';
import { Equipment } from 'src/equipment/equipment.model';
import { AuthModule } from 'src/auth/auth.module';
import { EquipmentModule } from 'src/equipment/equipment.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Comment, Order, Equipment]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
