import { Controller } from '@/utils/interfaces/controller.interface';

export abstract class BaseAppController {
    protected abstract initialiseMiddleware(): void;

    protected abstract initialiseControllers(controllers: Controller[]): void;

    protected abstract initialiseErrorHandling(): void;

    protected abstract initialiseDatabaseConnection(): void;

    public abstract listen(): void;
}
