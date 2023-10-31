import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';





describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let mockConfigService: ConfigService;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn((key) => {
        if (key === 'private_key') {
          return 'valid_private_key'; 
        }
        return undefined;
      }),
    } as any;

    authMiddleware = new AuthMiddleware(mockConfigService);
  });

  it('should be defined', () => {
    expect(authMiddleware).toBeDefined();
  });

  it('should call next() when the token is valid', () => {
    // Mock the ConfigService to return the expected private key

    const req: any = {
      headers: {
        api_key: 'valid_private_key',
      },
    };
    const res: any = {};
    const next = jest.fn();

    authMiddleware.use(req, res, next);

    expect(next).toBeCalled();
    expect(mockConfigService.get).toHaveBeenCalledWith('private_key');
  });

  it('should throw HttpException with status UNAUTHORIZED when the token is invalid', () => {
    // Mock the ConfigService to return the expected private key

    const req: any = {
      headers: {
        api_key: 'invalid_api_key',
      },
    };
    const res: any = {};
    const next = jest.fn();

    try {
      authMiddleware.use(req, res, next);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.getResponse()).toEqual('Invalid token');
      expect(e.getStatus()).toEqual(HttpStatus.UNAUTHORIZED);
      expect(next).not.toBeCalled();
    }
  });
});