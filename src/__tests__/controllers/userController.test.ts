import { Request, Response } from 'express';
import userController from '../../controllers/userController';
import userService from '../../services/userService';

jest.mock('../../services/userService');

describe('UserController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      (userService.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

      await userController.getAllUsers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith([mockUser]);
    });

    it('should handle errors', async () => {
      (userService.getAllUsers as jest.Mock).mockRejectedValue(new Error('Failed to fetch users'));

      await userController.getAllUsers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to fetch users' });
    });
  });
});
