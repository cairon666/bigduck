import {Request, Response, Router} from "express";
import cookieParser from "cookie-parser";
import * as core from "express-serve-static-core";
import {AuthTokenProvider} from "../adapters/authTokenProvider/authTokenProvider";
import {HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_BAD_UNAUTHORIZED, HTTP_STATUS_OK} from "../../pkg/http-status";
import {UserService} from "../domain/services/user/user.service";
import {
    getUsersDTO, getUsersFilter, possibleFiltersPrams, usersFilter
} from "../domain/services/user/dto";
import bodyParser from "body-parser";
import {Order} from "../domain/services/types";
import {AuthStorageUnit, parseAndSendError, sendJson} from "./utils";

export class UserRouter {
    private authStorage: AuthTokenProvider
    private userService: UserService

    constructor(
        authStorage: AuthTokenProvider,
        userService: UserService
    ) {
        this.authStorage = authStorage
        this.userService = userService
    }

    public router(): core.Router {
        const userRoute = Router()
        userRoute.use("/*", cookieParser())
        userRoute.use("/:id", async (req, resp, next) => {
            if (req.cookies?.accessToken) {
                const accessToken: string = req.cookies.accessToken

                const res = await this.authStorage.get(accessToken)

                if (!res) {
                    resp.status(HTTP_STATUS_BAD_UNAUTHORIZED)
                    resp.end();
                    return
                }

                console.log(res)

                const parsRes: AuthStorageUnit = JSON.parse(res)

                if (parsRes.id != req.params.id && !parsRes.is_admin) {
                    resp.status(HTTP_STATUS_BAD_UNAUTHORIZED)
                    resp.end();
                    return
                }
            }
            next()
        })
        userRoute.get("/:id", this.getByIdHandle.bind(this)) // TODO
        userRoute.put("/:id", this.updateByIdHandle.bind(this)) // TODO
        userRoute.post("/:id/password", this.updatePasswordByIdHandle.bind(this)) // TODO
        userRoute.post("/:id/email", this.updateEmailByIdHandle.bind(this)) // TODO

        // userRoute.use("/", async (req, resp, next) => {
        //     if (req.cookies?.accessToken) {
        //         const accessToken: string = req.cookies.accessToken
        //
        //         const res = await this.authStorage.get(accessToken)
        //
        //         if (!res) {
        //             resp.status(HTTP_STATUS_BAD_UNAUTHORIZED)
        //             resp.end();
        //             return
        //         }
        //
        //         const parsRes: AuthStorageUnit = JSON.parse(res)
        //
        //         if (!parsRes.is_admin) {
        //             resp.status(HTTP_STATUS_BAD_UNAUTHORIZED)
        //             resp.end();
        //             return
        //         }
        //     }
        //     next()
        // });
        userRoute.use("/", bodyParser.urlencoded({extended: false}));
        userRoute.get("/", this.getHandle.bind(this))

        return userRoute
    }

    private getByIdHandle(req: Request, resp: Response) {
        try {

        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }

    private async getHandle(req: Request, resp: Response) {
        try {
            const page = Number(req.query.page)

            // parse order
            const order: Order<usersFilter> = new Order<usersFilter>()
            if (typeof req.query.order === "object") {
                (Object.keys(req.query.order).forEach((key) => {
                    if (possibleFiltersPrams.includes(key)) {
                        // @ts-ignore
                        order.setOrder(key, req.query.order[key] === "ASC" ? "ASC" : "DESC")
                    }
                }))
            } else {
                // if empty order
                order.setOrder("date_create", "DESC")
            }

            //  parse filter
            const filter: getUsersFilter = new getUsersFilter()
            if (req.query) {
                Object.keys(req.query).forEach((key) => {
                    filter.addField(key, req.query[key])
                })
            }

            const res = await this.userService.getUsers(new getUsersDTO(
                page,
                order,
                filter
            ))

            sendJson(resp, {users: res.users, count: res.count}, HTTP_STATUS_OK)
        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }

    private updateByIdHandle(req: Request, resp: Response) {
        try {

        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }

    private updatePasswordByIdHandle(req: Request, resp: Response) {
        try {

        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }

    private updateEmailByIdHandle(req: Request, resp: Response) {
        try {

        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }
}