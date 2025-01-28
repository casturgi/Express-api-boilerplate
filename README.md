# Express TypeScript API

A robust REST API built with Express.js and TypeScript, featuring user management, cron jobs, and Swagger documentation.

## Features

- 🚀 Express.js with TypeScript
- 📦 Prisma ORM for database management
- ⏰ Cron job scheduling system
- 📝 OpenAPI/Swagger documentation
- ✅ Jest testing setup
- 🔒 Input validation
- 🎯 Type safety

## Quick Start
```bash
# Install dependencies
npm install

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run start:dev

# Build and start production server
npm run start:prod
```

## API Documentation

Access the Swagger UI at `/api-docs` when running the server.

## Available Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run cron:restart` - Restart cron jobs
- `npm run routes` - List all API routes

## Project Structure

```
src/
├── controllers/    # Request handlers
├── services/      # Business logic
├── routes/        # API routes
├── types/         # TypeScript types
├── middleware/    # Express middleware
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT