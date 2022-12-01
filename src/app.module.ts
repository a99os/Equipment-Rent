import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { CommentModule } from './comment/comment.module';
import { OrderModule } from './order/order.module';
import { EquipmentModule } from './equipment/equipment.module';
import { User } from './users/users.model';
import { Order } from './order/order.model';
import { Comment } from './comment/comment.model';
import { Equipment } from './equipment/equipment.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'images'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Order, Comment, Equipment],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    CommentModule,
    OrderModule,
    EquipmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
