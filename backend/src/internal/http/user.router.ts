import { json, Request, Response, Router } from 'express';
import { UserService } from '../domain/services/user/user.service';
import { parseAndSendError, sendJson } from './utils';
import { AuthContext } from './auth.context';
import { HttpStatus } from '../../pkg/http-status';
import { getUserDTO, updateUserDTO } from '../domain/services/user/dto';

export class UserRouter {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public router(): Router {
        const r = Router();

        r.use('/api/v1/user/*', json());
        r.put('/api/v1/user/:id', this.postUserHandler.bind(this));
        r.get('/api/v1/user/:id', this.getUserHandler.bind(this));
        // r.delete("/api/v1/user/:id") TODO
        // r.get("/api/v1/users?page=1&....") TODO

        return r;
    }

    private async postUserHandler(req: Request, resp: Response) {
        try {
            const id = req.params.id;

            AuthContext.checkAccessIdOrAdmin(req, id);

            const dto: updateUserDTO = new updateUserDTO(
                id,
                req.body.username,
                req.body.first_name,
                req.body.second_name,
                req.body.avatar_url || null,
                req.body.day_of_birth ? new Date(req.body.day_of_birth) : null,
                req.body.gender || null,
            );

            await this.userService.updateUser(dto);

            resp.status(HttpStatus.NO_CONTENT);
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async getUserHandler(req: Request, resp: Response) {
        try {
            const id = req.params.id;

            const res = await this.userService.getUser(new getUserDTO(id));

            sendJson(
                resp,
                {
                    user: res.user,
                },
                HttpStatus.OK,
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }
}
