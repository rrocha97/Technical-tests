import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockConfigService: ConfigService;


  beforeEach(() => {
    authGuard = new AuthGuard(mockConfigService);
    mockConfigService = {
      get: jest.fn((key) => {
        if (key === 'private_key') {
          return 'valid_private_key'; 
        }
        return undefined;
      }),
    } as any;
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true when the token is valid', async () => {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            api_key: 'valid_private_key',
          },
        }),
      }),
    };
    const result = await authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw HttpException with status UNAUTHORIZED when the token is invalid', async () => {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            api_key: 'invalid_api_key',
          },
        }),
      }),
    };

    try {
      await authGuard.canActivate(context);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.getResponse()).toEqual('Invalid token');
      expect(e.getStatus()).toEqual(HttpStatus.UNAUTHORIZED);
    }
  });
});
