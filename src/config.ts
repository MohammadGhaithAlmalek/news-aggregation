export default () => {
  const redisConfig = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  };

  console.log('', redisConfig);

  return { redis: redisConfig };
};
