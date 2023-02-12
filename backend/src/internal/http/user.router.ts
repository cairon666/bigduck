import {UserService} from '../domain/services/user/user.service';
import {sendJson} from './utils';
import {AuthContext} from './auth.context';
import {HttpStatus} from '../../pkg/http-status';
import {getUserDTO, updateUserDTO} from '../domain/services/user/dto';
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
        instance.put('/api/v1/user/:id_user', this.putUserHandler.bind(this));
        instance.get('/api/v1/user/:id_user', this.getUserHandler.bind(this));

        // r.delete("/api/v1/user/:id") TODO
        // r.get("/api/v1/users?page=1&....") TODO

        done();
    }

    private async putUserHandler(
        req: FastifyRequest<{
            Params: {
                id_user: string;
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
        const id = req.params.id_user;

        AuthContext.checkAccessIdOrAdmin(req, id);

        const dto: updateUserDTO = new updateUserDTO(
            id,
            {
                username: req.body.username || '',
                first_name: req.body.first_name || '',
                second_name: req.body.second_name || '',
                avatar_url: req.body.avatar_url || null,
                day_of_birth: req.body.day_of_birth || null,
                gender: req.body.gender || null,
            }
        );

        await this.userService.updateUser(dto);
        reply.status(HttpStatus.NO_CONTENT).send();
    }

    private async getUserHandler(
        req: FastifyRequest<{
            Params: {
                id_user: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const id = req.params.id_user;

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
