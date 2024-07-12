import { Router, Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { Controller } from '@/utils/interfaces';
import { HttpException } from '@/utils/exceptions/http.exception';
import { register, login } from '@/resources/user';
import { validationMiddleware, authenticatedMiddleware } from '@/middleware/index';
import { UserControllerSchema } from '@/utils/interfaces/user.controller.schema';

import { UserService } from './user.service';

class UserController extends UserControllerSchema implements Controller {
    public path = '/users';
    public router = Router();

    private userService = new UserService();

    constructor() {
        super();
        this.initialiseRoutes();
    }

    protected initialiseRoutes(): void {
        this.router.post(`${this.path}/register`, validationMiddleware(register), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(login), this.login);
        this.router.get(`${this.path}/`, authenticatedMiddleware, this.getAllUsers);
    }

    protected register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const token = this.userService.register(name, email, password, 'user');
            return res.status(StatusCodes.CREATED).json({ token });
        } catch (error: any) {
            next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
        }
    };

    protected login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.userService.login(email, password);

            res.status(StatusCodes.OK).json({ token });
        } catch (error: any) {
            next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));
        }
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    protected getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) {
            next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
        }
        const getUser = await this.userService.getUser();

        return res.status(StatusCodes.OK).json({ users: getUser });
    };
}

export default UserController;
