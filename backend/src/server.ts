import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { propertyRoutes } from './routes/propertyRoutes';

const server = Fastify({
  logger: true,
});

// CORS headers (can be replaced with @fastify/cors when installed)
server.addHook('preHandler', (request, reply, done) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    reply.code(200).send();
    return;
  }

  done();
});

// Register route modules
server.register(propertyRoutes);

// Health check endpoint
server.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ status: 'ok' });
});

export default server;
