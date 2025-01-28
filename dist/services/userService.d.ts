import { PrismaClient } from '@prisma/client';
import { User, UserInput } from '../types';
declare class UserService {
    private prisma;
    constructor(prismaClient?: PrismaClient);
    getAllUsers(): Promise<User[]>;
    createUser(userData: UserInput): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    updateUser(id: number, userData: Partial<UserInput>): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
declare const _default: UserService;
export default _default;
export { UserService };
