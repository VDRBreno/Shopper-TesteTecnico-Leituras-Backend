export const SERVER_CONFIG = {
  PORT: +(process.env.PORT ?? 3333),
  HOST: '127.0.0.1'
};
export const SERVER_URL = `${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`;