import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from 'src/comment/comment.model';
import { FilesModule } from 'src/files/files.module';
import { Order } from 'src/order/order.model';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Comment, Order, Equipment]),
    FilesModule,
    JwtModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService, EquipmentModule],
})
export class EquipmentModule {}
