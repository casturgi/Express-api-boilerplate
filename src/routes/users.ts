import express, { Router } from 'express';
import userController from '../controllers/userController';
import { validateUser } from '../middleware/userValidation';

const router: Router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', validateUser, userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
