import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@lucario/nestjs-ioredis';
import * as crypto from 'crypto';

@Injectable()
export class RateLimiterService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async isAllowed(
    key: string,
    limit: number,
    intervalSeconds: number,
  ): Promise<boolean> {
    const attempts: number = await this.redis.incr(key);
    if (attempts === 1) {
      // If it's a new key, set an expiration time
      await this.redis.expire(key, intervalSeconds);
    }
    if (attempts > limit) {
      const nextTimeAvailable = await this.retrieveRemainingTime(key);
      throw new HttpException(
        `Too many request, the service will be available in ${nextTimeAvailable} hh:mm:ss`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    return true; // Request allowed
  }

  async retrieveRemainingTime(key: string): Promise<string> {
    // Calculate the remaining time to expiration
    const timeToLiveSeconds = await this.redis.ttl(key);
    const dateFormattedHhMmSs: string = new Date(timeToLiveSeconds * 1000)
      .toISOString()
      .substring(11, 19);
    return dateFormattedHhMmSs;
  }
  buildKeyRateLimiter(urlSource : string, identifierUser: string){
    const key = crypto.createHash('sha256')
    .update( `${urlSource}_${identifierUser}`)
    .digest('hex');
    return key
  }
}
