import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from 'sequelize-typescript';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
@ApiTags('Izoh yozish')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Izoh yozish' })
  @ApiResponse({ status: 200, type: Comment })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Izohlarni olish' })
  @ApiResponse({ status: 200, type: [Comment] })
  // @UseGuards(AdminGuard)
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.commentService.getAllComments();
  }
}
