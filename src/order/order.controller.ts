import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { OrderService } from './order.service';

@ApiTags('Buyurtmalar')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Buyurtma yozish' })
  @ApiResponse({ status: 200, type: Order })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Buyurtmalarni olish' })
  @ApiResponse({ status: 200, type: [Order] })
  // @UseGuards(AdminGuard)
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.orderService.getAllOrders();
  }
}
