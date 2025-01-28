import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/userService';
import { UserInput } from '../types';
import { Prisma } from '@prisma/client';

interface TypedRequest<T> extends Request {
  body: T;
}

interface TypedRequestParams extends Request {
  params: {
    id: string;
  };
}

const userController = {
  getAllUsers: async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message || 'Failed to fetch users' });
    }
  },

  createUser: async (req: TypedRequest<UserInput>, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message || 'Failed to create user' });
    }
  },

  getUserById: async (req: TypedRequestParams, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      const user = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message || 'Failed to fetch user' });
    }
  },

  updateUser: async (
    req: TypedRequest<Partial<UserInput>> & TypedRequestParams,
    res: Response
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      const user = await userService.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  deleteUser: async (req: TypedRequestParams, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      await userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
};

export default userController;
