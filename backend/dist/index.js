"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 8000;
const start = async () => {
    try {
        await server_1.default.listen({ port: Number(PORT), host: '127.0.0.1' });
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📚 API Documentation: http://localhost:${PORT}/health`);
    }
    catch (err) {
        server_1.default.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map