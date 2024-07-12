import 'dotenv/config';
import 'module-alias/register';

import { config } from './config';
import { App } from './app';
import { PostController } from './resources/post/post.controller';
import UserController from './resources/user/user.controller';

const app = new App([new PostController(), new UserController()], config.PORT);

app.listen();
