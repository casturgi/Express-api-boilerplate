"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const cronService_1 = __importDefault(require("./services/cronService"));
const PORT = parseInt(process.env.PORT || '3000', 10);
const server = app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    cronService_1.default.start();
});
const gracefulShutdown = (signal) => {
    console.log(`${signal} signal received: closing HTTP server`);
    cronService_1.default.stop();
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
exports.default = server;
//# sourceMappingURL=server.js.map