import Fastify from 'fastify';
import CORSConfig from '@fastify/cors'
import { app } from './app/app';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
server.register(app);

server.register(CORSConfig, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
