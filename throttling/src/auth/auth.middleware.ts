import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request } from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.api_key !== this.configService.get<string>("private_key")) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
