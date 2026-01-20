import { Elysia } from "elysia";
import {auth} from "./routes/authRoutes";
import { jwt } from '@elysiajs/jwt'

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .use(auth)
    .use(
        jwt({
            name: "jwt",
            secret: process.env.JWT_PRIVATE_KEY!
        })
    )
    .listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
