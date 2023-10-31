import { ExecutionContext } from '@nestjs/common';
import { RateLimiterPrivateGuard, RateLimiterPublicGuard, RateLimiterWeightGuard } from './rate-limiter.guard';
import { RateLimiterService } from './rate-limiter.service';
import { ConfigService } from '@nestjs/config';

describe('RateLimiterPrivateGuard', () => {
  let guard: RateLimiterPrivateGuard;
  let mockRateLimiterService: RateLimiterService;
  let mockConfigService: ConfigService;
  let mockContext: ExecutionContext;

  beforeEach(() => {
    mockRateLimiterService = {
      buildKeyRateLimiter: jest.fn(),
      isAllowed: jest.fn(),
    } as any;

    mockConfigService = {
      get: jest.fn(),
    } as any;

    mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            api_key: 'clientToken',
          },
          url: '/private/url',
        }),
      }),
    } as any;

    guard = new RateLimiterPrivateGuard(mockRateLimiterService, mockConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should call RateLimiterService and ConfigService methods', async () => {
    jest.spyOn(mockRateLimiterService,"buildKeyRateLimiter").mockReturnValue('key'); 
    jest.spyOn(mockRateLimiterService,"isAllowed").mockResolvedValue(true); 
    jest.spyOn(mockConfigService,"get").mockReturnValue(10); 

    const result = await guard.canActivate(mockContext);

    expect(mockRateLimiterService.buildKeyRateLimiter).toHaveBeenCalledWith('clientToken', '/private/url');
    expect(mockRateLimiterService.isAllowed).toHaveBeenCalledWith('key', 10, expect.any(Number));
    expect(result).toBe(true);
  });
});

describe('RateLimiterPublicGuard', () => {
  let guard: RateLimiterPublicGuard;
  let mockRateLimiterService: RateLimiterService;
  let mockConfigService: ConfigService;
  let mockContext: ExecutionContext;

  beforeEach(() => {
    mockRateLimiterService = {
      buildKeyRateLimiter: jest.fn(),
      isAllowed: jest.fn(),
    } as any;

    mockConfigService = {
      get: jest.fn(),
    } as any;

    mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          ip: 'clientIp',
          url: '/public/url',
        }),
      }),
    } as any;

    guard = new RateLimiterPublicGuard(mockRateLimiterService, mockConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should call RateLimiterService and ConfigService methods', async () => {
    jest.spyOn(mockRateLimiterService, 'buildKeyRateLimiter').mockReturnValue('key');
    jest.spyOn(mockRateLimiterService, 'isAllowed').mockResolvedValue(true);
    jest.spyOn(mockConfigService, 'get').mockReturnValue(10);

    const result = await guard.canActivate(mockContext);

    expect(mockRateLimiterService.buildKeyRateLimiter).toHaveBeenCalledWith('clientIp', '/public/url');
    expect(mockRateLimiterService.isAllowed).toHaveBeenCalledWith('key', 10, expect.any(Number));
    expect(result).toBe(true);
  });
});

describe('RateLimiterWeightGuard', () => {
  let guard: RateLimiterWeightGuard;
  let mockRateLimiterService: RateLimiterService;
  let mockConfigService: ConfigService;
  let mockContext: ExecutionContext;

  beforeEach(() => {
    mockRateLimiterService = {
      buildKeyRateLimiter: jest.fn(),
      isWeightAllowed: jest.fn(),
    } as any;

    mockConfigService = {
      get: jest.fn(),
    } as any;

    mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          ip: 'clientIp',
          headers: {
            api_key: 'clientToken',
          },
          url: '/weighted/url',
        }),
      }),
    } as any;

    guard = new RateLimiterWeightGuard(mockRateLimiterService, mockConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should call RateLimiterService and ConfigService methods', async () => {
    jest.spyOn(mockRateLimiterService, 'buildKeyRateLimiter').mockReturnValue('key');
    jest.spyOn(mockRateLimiterService, 'isWeightAllowed').mockResolvedValue(true);
    jest.spyOn(mockConfigService, 'get').mockReturnValue(10);

    const result = await guard.canActivate(mockContext);

    expect(mockRateLimiterService.buildKeyRateLimiter).toHaveBeenCalledWith('all', 'clientToken');
    expect(mockRateLimiterService.isWeightAllowed).toHaveBeenCalledWith('key', '/weighted/url', 10, expect.any(Number));
    expect(result).toBe(true);
  });
});
