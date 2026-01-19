import { Elysia, t } from "elysia"
import { UserRepository } from "../repositories/userRepository"

export const auth = new Elysia({ prefix: "/user" })
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
