import { getConfig, IConfig } from '../config';
import HTTPServer from '../http';
import { createDataSource } from '../databases/postgres';
import { AuthStorage } from '../adapters/authStorage';
import { AuthService } from '../domain/services/auth.service';
import { AuthUsecase } from '../domain/usecases';
import { AuthenticationProvider } from '../adapters/authenticationProvider';

export class App {
    private readonly config: IConfig;
    private server?: HTTPServer;

    public constructor() {
        this.config = getConfig();
    }

    public async setup() {
        const manager = (await createDataSource(this.config)).manager;

        console.log('creante authentication service');
        const authenticationService = new AuthenticationProvider();

        console.log('create auth usecase');
        const authStorage = new AuthStorage(manager);
        const authService = new AuthService(authStorage);
        const authUsecase = new AuthUsecase(authService, authenticationService);

        this.server = new HTTPServer(this.config, authUsecase);

        this.server.setup();
    }

    public async run() {
        if (!this.server) {
            throw new Error('App: need setup before run!');
        }

        this.server.run();
    }
}
