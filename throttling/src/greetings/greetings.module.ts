import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GreetingsService } from './greetings.service';
import { GreetingsController } from './greetings.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { RateLimiterModule } from 'src/rate-limiter/rate-limiter.module';

@Module({
  providers: [GreetingsService],
  controllers: [GreetingsController],
})
export class GreetingsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'greetings/secret', method: RequestMethod.GET });
  // }
}
