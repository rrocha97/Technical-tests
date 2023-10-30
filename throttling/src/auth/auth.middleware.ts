import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers?.authentication !== 'secret') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
