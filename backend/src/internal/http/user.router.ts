import {Router} from "express";
import cookieParser from "cookie-parser";
import * as core from "express-serve-static-core";
import {AuthTokenStorage} from "../adapters/authTokenStorage/authTokenStorage";
import {AuthStorageUnit} from "./types";
import {HTTP_STATUS_BAD_UNAUTHORIZED} from "../../pkg/http-status";

export class UserRouter {
    private authStorage: AuthTokenStorage

    constructor(authStorage: AuthTokenStorage) {
        this.authStorage = authStorage
    }

    public router(): core.Router {
        const userRoute = Router()
        userRoute.use(cookieParser())
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
        userRoute.get("/:id/") // TODO
        userRoute.put("/:id/") // TODO
        userRoute.post("/:id/password") // TODO
        userRoute.post("/:id/email") // TODO

        return userRoute
    }
}