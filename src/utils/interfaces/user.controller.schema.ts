import { NextFunction, Request, Response } from 'express';

//signs for user controller functions
export abstract class UserControllerSchema {
    protected abstract initialiseRoutes(): void;
    protected abstract register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>;
    protected abstract login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>;
    protected abstract getAllUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>;
}
