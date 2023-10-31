import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private readonly configService : ConfigService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.api_key;
    if (token !== this.configService.get<string>("private_key")) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      ;
    }
    return true;
  }
}
