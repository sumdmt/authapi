import { HttpException } from './http.exception';

export class PostCreateException extends HttpException {
    constructor(public status: number, message: string) {
        super(status, message);
    }
}
