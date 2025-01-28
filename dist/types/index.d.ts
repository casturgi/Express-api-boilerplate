import { ScheduledTask } from 'node-cron';

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
