import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from 'fastify';
import {
    AuthLoginDTO,
    AuthRefreshDTO,
    AuthRegisterDTO,
    AuthUsecase,
} from '../../domain/usecases';
import { UserModelGender } from '../../domain/models';
import { StatusCodes } from 'http-status-codes';
import { HttpStatus } from '../../../build/pkg/http-status';

export class AuthRoute {
    public constructor(private authUsecase: AuthUsecase) {}

    public router(
        instance: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void,
    ): void {
        instance.post('/api/v1/auth/login', this.login.bind(this));
        instance.post('/api/v1/auth/register', this.register.bind(this));
        instance.post('/api/v1/auth/refresh', this.refresh.bind(this));

        done();
    }

    private async login(
        request: FastifyRequest<{
            Body: {
                login: string;
                password: string;
            };
        }>,
        reply: FastifyReply,
    ): Promise<void> {
        const resp = await this.authUsecase.Login(
            new AuthLoginDTO(request.body.login, request.body.password),
        );

        this.setRefreshCookie(reply, resp.refresh_token);

        reply.status(HttpStatus.OK).send({
            id: resp.id,
            access_token: resp.access_token,
        });
    }

    private async register(
        request: FastifyRequest<{
            Body: {
                login: string;
                password: string;
                email: string;
                username: string;
                first_name: string;
                second_name: string;
                day_of_birth: Date | null;
                gender: UserModelGender | null;
            };
        }>,
        reply: FastifyReply,
    ): Promise<void> {
        await this.authUsecase.Register(
            new AuthRegisterDTO({
                login: request.body.login,
                password: request.body.password,
                email: request.body.email,
                username: request.body.username,
                first_name: request.body.first_name,
                second_name: request.body.second_name,
                day_of_birth: request.body.day_of_birth || null,
                gender: request.body.gender || null,
            }),
        );

        reply.status(StatusCodes.NO_CONTENT).send();
        return;
    }

    private async refresh(
        request: FastifyRequest,
        reply: FastifyReply,
    ): Promise<void> {
        let refresh_cookie = '';
        console.log(request.cookies);
        if (request.cookies && request.cookies['refresh']) {
            refresh_cookie = request.cookies['refresh'];
        }

        const resp = await this.authUsecase.Refresh(
            new AuthRefreshDTO(refresh_cookie),
        );

        this.setRefreshCookie(reply, resp.refresh_token);

        reply.status(StatusCodes.OK).send({
            access: resp.access_token,
        });

        return;
    }

    private setRefreshCookie(reply: FastifyReply, refresh: string) {
        reply.setCookie('refresh', refresh, {
            path: '/',
            // domain: "localhost",
            maxAge: 60 * 60 * 24 * 30,
            // domain: "localhost",
            // httpOnly: true,
            // secure: true,
            // httpOnly: true,
            // sameSite: "none"
        });
    }
}
