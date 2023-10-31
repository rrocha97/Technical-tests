import { HttpException, HttpStatus } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';
import { Redis } from '@lucario/nestjs-ioredis';

describe('RateLimiterService', () => {
  let rateLimiterService: RateLimiterService;
  let mockRedis: Redis;

  beforeEach(() => {
    mockRedis = {
      incr: jest.fn(),
      incrby: jest.fn(()=>{}),
      expire: jest.fn(),
      ttl: jest.fn(),
    } as any;

    rateLimiterService = new RateLimiterService(mockRedis);
  });

  it('should be defined', () => {
    expect(rateLimiterService).toBeDefined();
  });

  it('should allow a request when it is below the rate limit', async () => {
    let mock = jest.spyOn(mockRedis,"incr").mockResolvedValue(5); 

    const isAllowed = await rateLimiterService.isAllowed('key', 10, 60);
    expect(isAllowed).toBe(true);
  });

  it('should throw HttpException with status TOO_MANY_REQUESTS when rate limit is exceeded', async () => {
    jest.spyOn(mockRedis,"incr").mockResolvedValue(15); 
    jest.spyOn(mockRedis,"ttl").mockResolvedValue(1); 

    try {
      await rateLimiterService.isAllowed('key', 10, 60);
      
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.getStatus()).toEqual(HttpStatus.TOO_MANY_REQUESTS);
    }
  });
  describe('isWeightAllowed',()=>{
    it('should allow a request when weight is below the rate limit', async () => {
      const url = '/api/endpoint'; 
      const weight = 5; 
      const rateLimit = 10; 
      jest.spyOn(mockRedis, 'incrby').mockResolvedValue(weight);
    
      const isAllowed = await rateLimiterService.isWeightAllowed('key', url, rateLimit, 60);
      expect(isAllowed).toBe(true);
    });
    
    it('should throw HttpException with status TOO_MANY_REQUESTS when weight limit is exceeded', async () => {
      const url = '/api/endpoint'; 
      const weight = 15;
      const rateLimit = 10;
      jest.spyOn(mockRedis, 'incrby').mockResolvedValue(weight);
      jest.spyOn(mockRedis,"ttl").mockResolvedValue(1); 
    
      await expect(rateLimiterService.isWeightAllowed('key', url, rateLimit, 60)).rejects.toThrow(HttpException);
    });
    
  })
  describe('validateRateLimit',()=>{
   
    it('should allow a request when the current rate is below the limit', async () => {
      jest.spyOn(mockRedis, 'ttl').mockResolvedValue(3600);
      const currentRate = 8; 
      const rateLimit = 10;
    
      const isAllowed = await rateLimiterService.validateRateLimit('key', currentRate, rateLimit);
      expect(isAllowed).toBe(true);
    });
    
    it('should throw HttpException with status TOO_MANY_REQUESTS when the rate limit is exceeded', async () => {
      jest.spyOn(mockRedis, 'ttl').mockResolvedValue(3600);
      const currentRate = 15;
      const rateLimit = 10;
    
      await expect(rateLimiterService.validateRateLimit('key', currentRate, rateLimit)).rejects.toThrow(HttpException);
    });
    
  })
  describe('retrieveRemainingTime',()=>{
    it('should retrieve and format the remaining time correctly', async () => {
      jest.spyOn(mockRedis, 'ttl').mockResolvedValue(3600);
      const expectedFormattedTime = '01:00:00';
      const remainingTime = await rateLimiterService.retrieveRemainingTime('key');
      expect(remainingTime).toBe(expectedFormattedTime);
    });
  })
});

