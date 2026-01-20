import {blobs} from "../db/schema";
import {t} from "elysia"

export namespace SyncModel {
    export type PushBody = {
        localBlobs: Array<{
            id: string
            updatedAt: bigint
            expiresAt?: bigint
            ciphertext: Uint8Array
            iv: Uint8Array
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
        updatedAt: t.BigInt(),
        expiresAt: t.Optional(t.BigInt()),
        ciphertext: t.Uint8Array(),
        iv: t.Uint8Array(),
        type: t.String(),
        name: t.String(),
    })
}