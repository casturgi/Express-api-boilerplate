import { Request, Response } from 'express';
import { UserInput } from '../types';
interface TypedRequest<T> extends Request {
    body: T;
}
interface TypedRequestParams extends Request {
    params: {
        id: string;
    };
}
declare const userController: {
    getAllUsers: (_req: Request, res: Response) => Promise<void>;
    createUser: (req: TypedRequest<UserInput>, res: Response) => Promise<void>;
    getUserById: (req: TypedRequestParams, res: Response) => Promise<void>;
    updateUser: (req: TypedRequest<Partial<UserInput>> & TypedRequestParams, res: Response) => Promise<void>;
    deleteUser: (req: TypedRequestParams, res: Response) => Promise<void>;
};
export default userController;
