import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    const token = await this.generateToken(user);
    user.token = token.token;
    await user.save();

    return token;
  }

  async registration(userDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    const phone = await this.userService.getUserByPhone(userDto.phone_number);
    if (condidate || phone) {
      throw new HttpException(
        'Bunday foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);
    user.token = token.token;
    await user.save();

    return token;
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      is_admin: user.is_admin,
      is_active: user.is_active,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (user && validPassword) {
      return user;
    }
    throw new UnauthorizedException("Email yoki parol noto'g'ri");
  }
}
