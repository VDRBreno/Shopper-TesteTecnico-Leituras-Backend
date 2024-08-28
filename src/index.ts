// Configure aliases
import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
// Setup ENV vars
import dotenv from 'dotenv';
dotenv.config();

import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';

import colorout from '@/utils/colorout';
import ConfigureEnvironment from '@/utils/ConfigureEnvironment';
import { IMAGES_FOLDER_PATH } from '@/utils/paths';
import routes from '@/routes';

export const SERVER_CONFIG = {
  PORT: +(process.env.PORT ?? 3333),
  HOST: '127.0.0.1'
};
export const SERVER_URL = `${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`;

try {

  ConfigureEnvironment();

  const server = fastify();

  server.register(fastifyCors, {
    origin: '*'
  });

  server.register((instance, opts, next) => {
    instance.register(fastifyStatic, {
      root: IMAGES_FOLDER_PATH,
      prefix: '/images'
    });
    next();
  });

  for(const route of routes) {
    server.route(route);
  }

  server.listen({ port: SERVER_CONFIG.PORT, host: SERVER_CONFIG.HOST }, error => {
    if(error) throw error;

    console.log(`[${colorout.fg.green}Server Running at ${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}${colorout.reset}]`);
  });

} catch(error) {
  console.error(error);
  process.exit(1);
}