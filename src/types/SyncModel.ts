import {blobs} from "../db/schema";
import {t} from "elysia"

export namespace SyncModel {
    export type PushBody = {
        localBlobs: Array<{
            id: string
            updatedAt: number
            expiresAt?: number
            ciphertext: string
            iv: string
            type: string
            name: string
        }>
    }

    export type PullBody = {
        id: number,
        since: bigint
    }

    export const SyncBlobSchema = t.Object({
        id: t.String(),
        updatedAt: t.Integer(),
        expiresAt: t.Optional(t.Integer()),
        ciphertext: t.String(),
        iv: t.String(),
        type: t.String(),
        name: t.String(),
    })
}