// Configure aliases
import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
// Setup ENV vars
import dotenv from 'dotenv';
dotenv.config();

import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import colorout from '@/utils/colorout';
import routes from '@/routes';

try {

  const SERVER_CONFIG = {
    PORT: +(process.env.PORT ?? 3333),
    HOST: '127.0.0.1'
  };

  const server = fastify();

  server.register(fastifyCors, {
    origin: '*'
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