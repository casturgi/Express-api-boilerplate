"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
class UserService {
    constructor(prismaClient = new client_1.PrismaClient()) {
        this.prisma = prismaClient;
    }
    async getAllUsers() {
        try {
            return await this.prisma.user.findMany();
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new Error(`Database error: ${error.message}`);
            }
            throw error;
        }
    }
    async createUser(userData) {
        try {
            return await this.prisma.user.create({
                data: userData
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error('Email already exists');
                }
            }
            throw error;
        }
    }
    async getUserById(id) {
        try {
            return await this.prisma.user.findUnique({
                where: { id }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new Error(`Database error: ${error.message}`);
            }
            throw error;
        }
    }
    async updateUser(id, userData) {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: userData
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new Error('User not found');
                }
            }
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            await this.prisma.user.delete({
                where: { id }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new Error('User not found');
                }
            }
            throw error;
        }
    }
}
exports.UserService = UserService;
exports.default = new UserService();
//# sourceMappingURL=userService.js.map