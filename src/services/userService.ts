import { Prisma, PrismaClient } from '@prisma/client';
import { User, UserInput } from '../types';

class UserService {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient = new PrismaClient()) {
    this.prisma = prismaClient;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async createUser(userData: UserInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: userData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Email already exists');
        }
      }
      throw error;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async updateUser(id: number, userData: Partial<UserInput>): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: userData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('User not found');
        }
      }
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('User not found');
        }
      }
      throw error;
    }
  }
}

export default new UserService();
export { UserService };
