import db from "../db/db";
import {blobs, users} from "../db/schema";
import {and, asc, eq, gt,sql} from "drizzle-orm";

export abstract class BlobsRepository {
    static async getAllById(userId : number) {
        return db.select().from(blobs).where(eq(blobs.userId,userId))
    }

    static async getAllByIdAndUpdatedAt(since : bigint , userId : number) {
        return db
            .select()
            .from(blobs)
            .where(
                and(
                    eq(blobs.userId,userId),
                    gt(blobs.updatedAt,since)
                ),
            )
            .orderBy(asc(blobs.updatedAt))
    }

    static async addBlob(  blob: {
                        id: string
                        ciphertext: Uint8Array
                        iv: Uint8Array
                        updatedAt: bigint
                        expiresAt?: bigint
                        type: string
                        name: string
                    }, userId: number

    ){
        await db
            .insert(blobs)
            .values({
                ...blob,
                ciphertext: Buffer.from(blob.ciphertext),
                iv : Buffer.from(blob.iv),
            })
            .onConflictDoUpdate({
                target:blobs.id,
                set:{
                    ciphertext: sql`excluded.ciphertext`,
                    iv: sql`excluded.iv`,
                    updatedAt: sql`excluded.updated_at`,
                    expiresAt: sql`excluded.expires_at`,
                    name: sql`excluded.name`,
                    type: sql`excluded.type`,
                },
                where: sql`excluded.updated_at > blobs.updated_at`,
            })
    }

    static async getMaxUpdatedAt(userId: number) {
        const [row] = await db
            .select({ max: sql<bigint>`max(${blobs.updatedAt})` })
            .from(blobs)
            .where(eq(blobs.userId, userId));

        return row?.max ?? 0n;
    }

}