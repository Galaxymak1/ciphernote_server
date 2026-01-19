import { Elysia, t } from "elysia"
import { UserRepository } from "../repositories/userRepository"
import {AuthService} from "../services/authService";

export const auth = new Elysia({ prefix: "/auth" })
    .post(
        "/register",
        async ({ body }) => {
            return UserRepository.createUser(body)
        },
        {
            body: t.Object({
                email: t.String({ format: "email" }),
                password: t.String({ minLength: 4 })
            })
        }
    )
    .post(
        "/login",
        async ({ body }) => {
            return AuthService.signIn(body)
        },{
            body: t.Object({
                email: t.String({ format: "email" }),
                password: t.String({ minLength: 4 })
            })
        }
    )
