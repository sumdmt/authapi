import jwt from 'jsonwebtoken';

import { IUser, IToken } from '@/utils/interfaces';

import { config } from '../config';

export const createToken = (user: IUser): string => {
    const jwtSecret = config.JWT_SECRET;

    return jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: '1d'
    });
};

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, payload) => {
            if (err) return reject(err);

            return resolve(payload as IToken);
        });
    });
};
