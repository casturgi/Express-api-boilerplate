import { PrismaClient, User } from '@prisma/client';
import { UserService } from '../../services/userService';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

// Mock Prisma client
const prisma: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
const userService = new UserService(prisma);

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const mockUserInput = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    };

    const mockCreatedUser: User = {
      id: 1,
      email: mockUserInput.email,
      name: mockUserInput.name,
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a new user successfully', async () => {
      prisma.user.create.mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(mockUserInput);

      expect(result).toEqual(mockCreatedUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: mockUserInput.email,
          name: mockUserInput.name,
          // Password should be hashed
          password: expect.any(String),
        }),
      });
    });

    it('should throw error if email already exists', async () => {
      prisma.user.create.mockRejectedValue(new Error('Email already exists'));

      await expect(userService.createUser(mockUserInput)).rejects.toThrow('Email already exists');
    });
  });

  describe('getUserById', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should find user by id', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await userService.getUserById(999);

      expect(result).toBeNull();
    });
  });

  // Add more test cases for other UserService methods
});
