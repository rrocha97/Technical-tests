import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RateLimiterPrivateGuard implements CanActivate {
  constructor(
    private readonly rateLimiterService: RateLimiterService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Get the client's Token
    const clientToken = request.headers.api_key;
    // Get the requested URL
    const requestUrl = request.url;

    const key = this.rateLimiterService.buildKeyRateLimiter(
      clientToken,
      requestUrl,
    );

    return await this.rateLimiterService.isAllowed(
      key,
      this.configService.get<number>('rate_limiter_private_url'),
      this.configService.get<number>('rate_interval_private_url_seconds'),
    );
  }
}

@Injectable()
export class RateLimiterPublicGuard implements CanActivate {
  constructor(
    private readonly rateLimiterService: RateLimiterService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Get the client's IP address
    const clientIp = request.ip;

    // Get the requested URL
    const requestUrl = request.url;
    const key = this.rateLimiterService.buildKeyRateLimiter(
      clientIp,
      requestUrl,
    );
    return await this.rateLimiterService.isAllowed(
      key,
      this.configService.get<number>('rate_limiter_public_url'),
      this.configService.get<number>('rate_interval_public_url_seconds'),
    );
  }}

@Injectable()
export class RateLimiterWeightGuard implements CanActivate {
  constructor(
    private readonly rateLimiterService: RateLimiterService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Get the client's IP address
    const clientIp = request.ip;
    // Get the client's Token
    const clientToken = request.headers.api_key;

    // Get the requested URL
    const requestUrl = request.url;
    const key = this.rateLimiterService.buildKeyRateLimiter("all",
    clientToken,
    );
    return await this.rateLimiterService.isWeightAllowed(
      key,
      requestUrl,
      this.configService.get<number>('rate_limiter_weight_url'),
      this.configService.get<number>('rate_interval_weight_url_seconds'),
    );
  }
}
