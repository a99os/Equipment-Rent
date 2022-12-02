import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipment } from 'src/equipment/equipment.model';
import { Order } from 'src/order/order.model';
import { User } from 'src/users/users.model';
import { CommentController } from './comment.controller';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Comment, Order, Equipment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
