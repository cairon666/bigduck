import { AuthService } from '../domain/services/auth/auth.service';
import { AuthTokenProvider } from '../adapters/authTokenProvider/authTokenProvider';
import { LoginDTO, RegisterDTO } from '../domain/services/auth/dto';
import { Beda } from '../../pkg/beda/Beda';
import {
    AuthStorageUnit,
    NameCookieAccess,
    NameCookieRefresh,
    sendJson,
} from './utils';
import { CodeError, Exceptions } from '../domain/exceptions/exceptions';
import { HttpStatus } from '../../pkg/http-status';
import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from 'fastify';

export class AuthRouter {
    private authService: AuthService;
    private authTokenProvider: AuthTokenProvider;

    public constructor(
        authTokenProvider: AuthTokenProvider,
        authService: AuthService,
    ) {
        this.authService = authService;
        this.authTokenProvider = authTokenProvider;
    }

    public router(
        instance: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void,
    ) {
        instance.post('/api/v1/auth/login', this.loginHandler.bind(this));
        instance.post('/api/v1/auth/register', this.registerHandler.bind(this));
        instance.post('/api/v1/auth/refresh', this.refreshHandler.bind(this));
        // userRoute.post("/api/v1/auth/check", this.refreshHandler.bind(this)) TODO

        done();
    }

    private async loginHandler(
        req: FastifyRequest<{
            Body: {
                login?: string;
                password?: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const dto = new LoginDTO(req.body.login || '', req.body.password || '');

        const authRes = await this.authService.Login(dto);

        const authUnit: AuthStorageUnit = {
            id: authRes.id,
            is_admin: authRes.is_admin,
            is_staff: authRes.is_staff,
        };
        const tokens = await this.authTokenProvider.setNew(
            JSON.stringify(authUnit),
        );

        reply
            .setCookie(NameCookieAccess, tokens.access, {
                path: '/api/v1',
                maxAge: 1000 * 60 * 24 * 30,
                secure: true,
                httpOnly: true,
            })
            .setCookie(NameCookieRefresh, tokens.refresh, {
                path: '/api/v1',
                secure: true,
                httpOnly: true,
            });

        sendJson(reply, { id: authRes.id }, HttpStatus.OK);
    }

    private async refreshHandler(req: FastifyRequest, reply: FastifyReply) {
        const cookie = req.cookies;
        if (!cookie) {
            throw new Beda(
                Exceptions.DontHaveRefreshCookie,
                CodeError.DontHaveRefreshCookie,
            );
        }

        const refreshToken = cookie[NameCookieRefresh];
        if (!refreshToken) {
            throw new Beda(
                Exceptions.DontHaveRefreshCookie,
                CodeError.DontHaveRefreshCookie,
            );
        }

        const res = await this.authTokenProvider.refresh(refreshToken);
        if (!res) {
            throw new Beda(Exceptions.CookieTimeout, CodeError.CookieTimeout);
        }

        reply
            .setCookie(NameCookieAccess, res.accessToken, {
                path: '/api/v1',
                maxAge: 1000 * 60 * 24 * 30,
                secure: true,
                httpOnly: true,
            })
            .setCookie(NameCookieRefresh, refreshToken, {
                path: '/api/v1',
                secure: true,
                httpOnly: true,
            });

        reply.status(HttpStatus.NO_CONTENT).send();
    }

    private async registerHandler(
        req: FastifyRequest<{
            Body: {
                login?: string;
                password?: string;
                phone?: string;
                email?: string;
                username?: string;
                first_name?: string;
                second_name?: string;
                avatar_url?: string;
                day_of_birth?: Date;
                gender?: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const dto = new RegisterDTO(
            req.body.login || '',
            req.body.password || '',
            false,
            false,
            req.body.phone || null,
            req.body.email || '',
            req.body.username || '',
            req.body.first_name || '',
            req.body.second_name || '',
            req.body.avatar_url || null,
            req.body.day_of_birth || null,
            req.body.gender || null,
        );

        await this.authService.Register(dto);

        reply.status(HttpStatus.NO_CONTENT).send();
    }
}
