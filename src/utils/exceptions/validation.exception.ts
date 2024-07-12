import { HttpException } from './http.exception';

export class ValidationException extends HttpException {
    constructor(public status: number, message: string) {
        super(status, message);
    }
}
