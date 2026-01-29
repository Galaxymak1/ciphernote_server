import { Elysia, t } from "elysia"
import { SyncService } from "../services/syncService"
import { SyncModel } from "../types/SyncModel"
import { TokenService, AccessTokenPayload } from "../services/tokenService"

export const sync = new Elysia({ prefix: "/sync" })
    .derive(({ request, set }) => {
        const token = request.headers
            .get("authorization")
            ?.replace("Bearer ", "")

        if (!token) {
            set.status = 401
            throw new Error("Unauthorized")
        }

        try {
            const user = TokenService.verifyAccess(token)
            return { user }
        } catch {
            set.status = 401
            throw new Error("Invalid token")
        }
    })
    .post(
        "/push",
        async ({ body, user }) => {
            return await SyncService.push(body,user.sub)
        },
        {
            body: t.Object({
                localBlobs: t.Array(SyncModel.SyncBlobSchema)
            }),
        }
    )
    .post(
        "/pull",
        async ({ body, user }) => {
            return await SyncService.pull(body.since, user.sub)
        },
        {
            body: t.Object({
                since: t.Integer(),
            }),
        }
    )
