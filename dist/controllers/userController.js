"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userService_1 = __importDefault(require("../services/userService"));
const client_1 = require("@prisma/client");
const userController = {
    getAllUsers: async (_req, res) => {
        try {
            const users = await userService_1.default.getAllUsers();
            res.json(users);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message || 'Failed to fetch users' });
        }
    },
    createUser: async (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            const user = await userService_1.default.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message || 'Failed to create user' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid ID format' });
                return;
            }
            const user = await userService_1.default.getUserById(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message || 'Failed to fetch user' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid ID format' });
                return;
            }
            const user = await userService_1.default.updateUser(id, req.body);
            res.json(user);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(500).json({ error: 'Failed to update user' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            await userService_1.default.deleteUser(id);
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(500).json({ error: 'Failed to delete user' });
        }
    },
};
exports.default = userController;
//# sourceMappingURL=userController.js.map