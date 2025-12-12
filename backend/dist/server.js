"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const propertyRoutes_1 = require("./routes/propertyRoutes");
const server = (0, fastify_1.default)({
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
server.register(propertyRoutes_1.propertyRoutes);
// Health check endpoint
server.get('/health', async (request, reply) => {
    return reply.code(200).send({ status: 'ok' });
});
exports.default = server;
//# sourceMappingURL=server.js.map