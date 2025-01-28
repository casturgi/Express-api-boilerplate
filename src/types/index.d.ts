import { ScheduledTask } from 'node-cron';

declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
      name: string;
    };
  }
}

declare module 'node-cron' {
  interface ScheduledTask {
    stop(): unknown;
    start(): unknown;
    getStatus(): 'scheduled' | 'stopped';
  }

  function schedule(
    expression: string,
    func: () => void,
    options?: {
      scheduled?: boolean;
      timezone?: string;
    }
  ): ScheduledTask;

  function validate(expression: string): boolean;
}

// Extend Error for custom error types
interface CustomError extends Error {
  code?: string;
  status?: number;
}

// Declare modules without type definitions
declare module '*.yaml' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

// Global type declarations
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type AsyncFunction<T = void> = (...args: any[]) => Promise<T>;

// Environment variables type declaration
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET?: string;
  }
}

declare module 'swagger-ui-express';

// Utility types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ExcludeKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>; 

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface CronJobConfig {
  name: string;
  schedule: string;
  enabled: boolean;
  task: () => void;
}

export interface ActiveJob {
  config: CronJobConfig;
  instance: ScheduledTask;
}

export interface Route {
  path: string;
  methods: string[];
}

export interface DatabaseError extends Error {
  code?: string;
} 