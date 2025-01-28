import app from './app';
import cronService from './services/cronService';

const PORT: number = parseInt(process.env.PORT || '3000', 10);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  cronService.start();
});

const gracefulShutdown = (signal: string): void => {
  console.log(`${signal} signal received: closing HTTP server`);
  cronService.stop();
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server; 