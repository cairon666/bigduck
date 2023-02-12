import {AuthService} from '../domain/services/auth/auth.service';
import {LoginDTO, RegisterDTO} from '../domain/services/auth/dto';
import {Beda} from '../../pkg/beda/Beda';
import {

    sendJson,
} from './utils';
import {CodeError, Exceptions} from '../domain/exceptions/exceptions';
import {HttpStatus} from '../../pkg/http-status';
import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from 'fastify';
import {AuthContext, AuthStorageUnit, NameCookieRefresh} from "./auth.context";

export class AuthRouter {
    private authService: AuthService;

    public constructor(
        authService: AuthService,
    ) {
        this.authService = authService;
    }

    public router(
        instance: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void,
    ) {
        instance.post('/api/v1/auth/login', this.loginHandler.bind(this));
        instance.post('/api/v1/auth/register', this.registerHandler.bind(this));
        instance.post('/api/v1/auth/refresh', this.refreshHandler.bind(this));
        instance.post('/api/v1/auth/logout', this.logoutHandler.bind(this));
        // userRoute.post("/api/v1/auth/check", this.refreshHandler.bind(this)) TODO

        done();
    }

    private async logoutHandler(
        req: FastifyRequest,
        reply: FastifyReply
    ) {
        reply.status(HttpStatus.NO_CONTENT).send()
    }

    private async loginHandler(
        req: FastifyRequest<{
            Body?: {
                login?: string;
                password?: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const dto = new LoginDTO(req.body?.login || '', req.body?.password || '');

        const authRes = await this.authService.Login(dto);

        const authUnit: AuthStorageUnit = {
            id: authRes.id_user,
            is_admin: authRes.is_admin,
            is_staff: authRes.is_staff,
        };

        const access_token = AuthContext.generateAccessToken(authUnit)
        const refresh_token = AuthContext.generateRefreshToken(authUnit)

        AuthContext.setRefreshCookie(reply, refresh_token)

        sendJson(reply, {
            id_user: authRes.id_user,
            access_token: access_token,
        }, HttpStatus.OK);
    }

    private async refreshHandler(req: FastifyRequest, reply: FastifyReply) {
        const refresh_token = AuthContext.getRefreshCookie(req)

        const authUnit = AuthContext.checkIsAuthStorageUnit(refresh_token)

        const access_token = AuthContext.generateAccessToken(authUnit)
        console.log({access_token})

        reply.status(HttpStatus.OK).send({
            access_token: access_token,
        });
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
