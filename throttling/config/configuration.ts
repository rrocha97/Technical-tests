export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    redis: {
      host: process.env.REDIS_HOST||'redis://localhost:6379',
    },
    rate_limiter_private_url:parseInt(process.env.RATE_LIMITER_PRIVATE_URL, 10) || 200,
    rate_limiter_public_url:parseInt(process.env.RATE_LIMITER_PUBLIC_URL, 10) || 100,
    rate_limiter_weight_url:parseInt(process.env.RATE_LIMITER_WEIGHT_URL, 10) || 100,
    rate_interval_private_url_seconds:parseInt(process.env.RATE_INTERVAL_PRIVATE_URL_SECONDS, 10) || 3600,
    rate_interval_public_url_seconds:parseInt(process.env.RATE_INTERVAL_PUBLIC_URL_SECONDS, 10) || 3600,
    rate_interval_weight_url_seconds:parseInt(process.env.RATE_INTERVAL_WEIGHT_URL_SECONDS, 10) || 3600,
    private_key:process.env.PRIVATE_KEY || "secret"
  });