import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Equipment } from 'src/equipment/equipment.model';
import { User } from 'src/users/users.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Equipment) private equipmentRepository: typeof Equipment,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findByPk(createOrderDto.user_id);

    if (!user) {
      throw new HttpException('User topilmadi', HttpStatus.NOT_FOUND);
    }
    const equipment = await this.equipmentRepository.findByPk(
      createOrderDto.equipment_id,
    );
    if (!equipment) {
      throw new HttpException('Equipment topilmadi', HttpStatus.NOT_FOUND);
    }
    const startDate = new Date(createOrderDto.start_date).getTime();
    const endDate = new Date(createOrderDto.end_date).getTime();

    if (startDate - new Date().getTime() / 60 / 60 / 24 / 1000 < 0) {
      throw new HttpException(
        'boshlanish vaqti  kamida bugun bo`lishi kerak',
        HttpStatus.NOT_FOUND,
      );
    }
    const days: number = (endDate - startDate) / 60 / 60 / 24 / 1000;
    if (days < 1) {
      throw new HttpException(
        'tugash vaqti boshlanish vaqtidan kamida 1 kun keyin bo`lishi kerak',
        HttpStatus.NOT_FOUND,
      );
    }
    createOrderDto.total_price = equipment.price * days;
    console.log(createOrderDto);
    const order = await this.orderRepository.create(createOrderDto);
    await order.save();
    return order;
  }
  async getAllOrders() {
    const orders = await this.orderRepository.findAll({
      include: { all: true },
    });
    return orders;
  }
}
