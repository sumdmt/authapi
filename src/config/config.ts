import { str, port, cleanEnv } from 'envalid';

export const config = cleanEnv(process.env, {
    PORT: port({ default: 3000 }),
    MONGO_PATH: str(),
    JWT_SECRET: str(),
    GLOBAL_PREFIX: str({ default: '/api' })
});
