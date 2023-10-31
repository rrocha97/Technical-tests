import { Controller, Get, UseGuards } from '@nestjs/common';
import { GreetingsService } from './greetings.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  RateLimiterPrivateGuard,
  RateLimiterPublicGuard,
  RateLimiterWeightGuard,
} from 'src/rate-limiter/rate-limiter.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('greetings')
@Controller('greetings')
export class GreetingsController {
  constructor(private greetingsService: GreetingsService) {}

  @Get()
  @UseGuards(RateLimiterPublicGuard)
  @ApiOperation({ summary: 'public method hello ' })
  getHello(): string {
    return this.greetingsService.getHello();
  }
  @Get('secret')
  @UseGuards(AuthGuard)
  @UseGuards(RateLimiterPrivateGuard)
  @ApiHeader({
    name: 'api_key',
    description: 'api key access token',
    required: true,
  })
  @ApiOperation({ summary: 'private method hello ' })
  secretHello(): string {
    return this.greetingsService.secretHello();
  }
  @Get('secret/weight/low')
  @UseGuards(AuthGuard)
  @UseGuards(RateLimiterWeightGuard)
  @ApiHeader({
    name: 'api_key',
    description: 'api key access token',
    required: true,
  })
  @ApiOperation({ summary: 'private method hello ' })
  secretHelloLevelLow(): string {
    return this.greetingsService.secretHelloLevel('Low');
  }

  @Get('secret/weight/medium')
  @UseGuards(AuthGuard)
  @UseGuards(RateLimiterWeightGuard)
  @ApiHeader({
    name: 'api_key',
    description: 'api key access token',
    required: true,
  })
  @ApiOperation({ summary: 'private method hello ' })
  secretHelloLevelMed(): string {
    return this.greetingsService.secretHelloLevel('Medium');
  }
  @Get('secret/weight/high')
  @UseGuards(AuthGuard)
  @UseGuards(RateLimiterWeightGuard)
  @ApiHeader({
    name: 'api_key',
    description: 'api key access token',
    required: true,
  })
  @ApiOperation({ summary: 'private method hello ' })
  secretHelloLevelHigh(): string {
    return this.greetingsService.secretHelloLevel('High');
  }
}
