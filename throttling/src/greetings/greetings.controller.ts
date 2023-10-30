import { Controller, Get, UseGuards } from '@nestjs/common';
import { GreetingsService } from './greetings.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RateLimiterPrivateGuard, RateLimiterPublicGuard} from 'src/rate-limiter/rate-limiter.guard';
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
    name: 'authentication',
    description: 'authentication access token',
    required: true,
  })
  @ApiOperation({ summary: 'private method hello ' })
  secretHello(): string {
    return this.greetingsService.secretHello();
  }
}
