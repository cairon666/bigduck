import { UserService } from '../domain/services/user/user.service';
import { sendJson } from './utils';
import { AuthContext } from './auth.context';
import { HttpStatus } from '../../pkg/http-status';
import { getUserDTO, updateUserDTO } from '../domain/services/user/dto';
import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from 'fastify';

export class UserRouter {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public router(
        instance: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void,
    ) {
        instance.put('/api/v1/user/:id', this.putUserHandler);
        instance.get('/api/v1/user/:id', this.getUserHandler.bind(this));

        // r.delete("/api/v1/user/:id") TODO
        // r.get("/api/v1/users?page=1&....") TODO

        done();
    }

    private async putUserHandler(
        req: FastifyRequest<{
            Params: {
                id: string;
            };
            Body: {
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
        const id = req.params.id;

        AuthContext.checkAccessIdOrAdmin(req, id);

        const dto: updateUserDTO = new updateUserDTO(
            id,
            req.body.username || '',
            req.body.first_name || '',
            req.body.second_name || '',
            req.body.avatar_url || null,
            req.body.day_of_birth || null,
            req.body.gender || null,
        );

        await this.userService.updateUser(dto);
        reply.status(HttpStatus.NO_CONTENT).send();
    }

    private async getUserHandler(
        req: FastifyRequest<{
            Params: {
                id: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const id = req.params.id;

        const res = await this.userService.getUser(new getUserDTO(id));

        sendJson(
            reply,
            {
                user: res.user,
            },
            HttpStatus.OK,
        );
    }
}
