import { StatusCodes } from 'http-status-codes';

import { PostModel } from '@/resources/post/post.model';
import { PostCreateException } from '@/utils/exceptions/post-create-exception';
import { IPost, PostServiceSchema } from '@/utils/interfaces';

export class PostService extends PostServiceSchema {
    private post = PostModel;

    constructor() {
        super();
    }

    public async create(title: string, body: string): Promise<IPost> {
        try {
            const post = await this.post.create({ title, body });
            if (!post) {
                throw new PostCreateException(
                    StatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
                    'Post validation error!'
                );
            }
            return post;
        } catch (error) {
            throw new PostCreateException(
                StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                'Please provide something valid here'
            );
        }
    }
}
