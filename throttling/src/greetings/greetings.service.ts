import { Injectable } from '@nestjs/common';

@Injectable()
export class GreetingsService {
  getHello(): string {
    return 'Hello World!';
  }
  secretHello(): string {
    return 'Secret Hello World!';
  }
  secretHelloLevel(level:string): string {
    return `Secret Hello World from level ${level}!`;
  }
}
