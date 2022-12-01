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
export class RentSelfGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly equipmentRepository: typeof Equipment,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      console.log('User');
      const req = context.switchToHttp().getRequest();
      const equipment = this.equipmentRepository.findByPk(req.params.id);
      if (!equipment || String(req.user.id) != equipment['user_id']) {
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
