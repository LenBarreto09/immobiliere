import server from './server';

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await server.listen({ port: Number(PORT), host: '127.0.0.1' });
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/health`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();