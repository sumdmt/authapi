import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { verifyToken } from '@/utils/token';
import { UserModel } from '@/resources/user/user.model';
import { IToken } from '@/utils/interfaces';
import { HttpException, PostCreateException, ValidationException } from '@/utils/exceptions/';

export async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer')) {
        return next(new ValidationException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED));
    }
    const accessToken = bearer.split('Bearer: ')[1].trim();

    try {
        const payload: IToken | jwt.JsonWebTokenError = await verifyToken(accessToken);

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(
                new ValidationException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
            );
        }

        const user = await UserModel.findById(payload.id).select('-password').exec();

        if (!user) {
            return next(
                new ValidationException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
            );
        }

        req.user = user;

        return next();
    } catch (error: any) {
        return next(new ValidationException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED));
    }
}
