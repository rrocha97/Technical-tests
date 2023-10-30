export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    redis: {
      host: process.env.REDIS_HOST||'redis://localhost:6379',
    },
    limiter_private_url:parseInt(process.env.LIMITER_PRIVATE_URL, 10) || 200,
    limiter_public_url:parseInt(process.env.LIMITER_PUBLIC_URL, 10) || 100,
    interval_private_url_seconds:parseInt(process.env.INTERVAL_PRIVATE_URL_SECONDS, 10) || 3600,
    interval_public_url_seconds:parseInt(process.env.INTERVAL_PUBLIC_URL_SECONDS, 10) || 3600
  });