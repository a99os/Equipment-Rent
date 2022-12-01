import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateUsersDto } from './dto/activate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

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
  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new HttpException('Foydalunvchi topilmadi', HttpStatus.NOT_FOUND);
      }
      if (updateUserDto.email) {
        const userEmail = await this.userRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (userEmail && userEmail.id != id) {
          throw new HttpException(
            'Bunday email mavjud',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (updateUserDto.phone_number) {
        const userPhone = await this.userRepository.findOne({
          where: { phone_number: updateUserDto.phone_number },
        });
        if (userPhone && userPhone.id != id) {
          throw new HttpException(
            'Bunday phone number mavjud',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      user.name = updateUserDto.name || user.name;
      user.email = updateUserDto.email || user.email;
      user.phone_number = updateUserDto.phone_number || user.phone_number;
      user.location = updateUserDto.location || user.location;
      user.password = updateUserDto.password
        ? bcrypt.hashSync(updateUserDto.password, 7)
        : user.password;

      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: error.message,
      });
    }
  }
}
