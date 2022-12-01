import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateUsersDto } from './dto/activate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
  async getUserByPhone(phone_number: string) {
    const user = await this.userRepository.findOne({
      where: { phone_number },
      include: { all: true },
    });
    return user;
  }
  async activateUser(activateUserDto: ActivateUsersDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = true;
    await user.save();
    return user;
  }
  async deactivateUser(activateUserDto: ActivateUsersDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = false;
    await user.save();
    return user;
  }
  async adminatedUser(activateUserDto: ActivateUsersDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_admin = true;
    await user.save();
    return user;
  }
  async deadminatedUser(activateUserDto: ActivateUsersDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_admin = false;
    await user.save();
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      console.log(user);
      throw new HttpException('Foydalunvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.destroy({ where: { id } });
    return user;
  }
}
