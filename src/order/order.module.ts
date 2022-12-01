import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Order } from './order.model';
import { Equipment } from 'src/equipment/equipment.model';
import { Comment } from 'src/comment/comment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Comment, Order, Equipment]),

  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
