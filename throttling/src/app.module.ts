import { Module } from '@nestjs/common';
import { GreetingsModule } from './greetings/greetings.module';
import { RateLimiterModule } from './rate-limiter/rate-limiter.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true ,
      load: [configuration]}),
    GreetingsModule,
    RateLimiterModule,
  ],
})
export class AppModule {}
