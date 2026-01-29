import { Elysia } from "elysia";
import {auth} from "./routes/authRoutes";
import { jwt } from '@elysiajs/jwt'
import cors from "@elysiajs/cors";
import {logger} from "@bogeychan/elysia-logger";
import {sync} from "./routes/syncRoutes";

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    // .use(
    //     logger({
    //         level: "error"
    //     })
    // )
    .use(auth)
    .use(sync)
    .use(
        jwt({
            name: "jwt",
            secret: process.env.JWT_PRIVATE_KEY!
        })
    )
    .use(cors())
    .listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
