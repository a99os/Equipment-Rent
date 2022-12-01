import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Equipment } from 'src/equipment/equipment.model';

@Injectable()
export class UserSelfGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly equipmentRepository: Equipment,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      console.log('User');
      const req = context.switchToHttp().getRequest();

      if (String(req.user.id) != req.params.id) {
        throw new UnauthorizedException({
          message: 'Ruhsat etilmagan',
        });
      }
      return true;
    } catch (error) {
      throw new HttpException(
        'Ruhsat etilmagan foydalanuvchi',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
