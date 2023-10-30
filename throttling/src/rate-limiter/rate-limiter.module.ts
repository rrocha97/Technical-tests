import { Global, Module } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';
import { RedisModule } from '@lucario/nestjs-ioredis';
import config from '../../config/configuration';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config:{
        url: config().redis.host,
        }
      }),
    }),
  ],
  providers: [RateLimiterService],
  exports:[RateLimiterService]
})
export class RateLimiterModule {
}
