import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { ActivateUsersDto } from './dto/activate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Foydalanuvchi olish' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Foydalanuvchini  faollashtirish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUsersDto) {
    return this.userService.activateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  faolsizlashtirish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post('deactivate')
  deactivateUser(@Body() activateUserDto: ActivateUsersDto) {
    return this.userService.deactivateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  admin qilish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post('adminate')
  adminatedUser(@Body() activateUserDto: ActivateUsersDto) {
    return this.userService.adminatedUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  adminlikdan olish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post('deadminate')
  deadminatedUser(@Body() activateUserDto: ActivateUsersDto) {
    return this.userService.deadminatedUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  o`chirish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  o`chirish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  deleteAdminUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Foydalanuvchi ma`lumotlarini yangilash' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log('contr');
    return this.userService.updateUser(updateUserDto, id);
  }
  @ApiOperation({
    summary: 'Foydalanuvchi admin tomonidan ma`lumotlarini yangilash',
  })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Put('admin/:id')
  updateAdminUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('contr');
    return this.userService.updateUser(updateUserDto, id);
  }
}
