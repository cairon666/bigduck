import {Controller, Get, Post} from "@nestjs/common";

@Controller("/api/v1/auth")
export class AuthController {
    @Post("/refresh")
    async refresh() {

    }

    @Post("/login")
    async login() {

    }

    @Post("/register")
    async register() {

    }
}