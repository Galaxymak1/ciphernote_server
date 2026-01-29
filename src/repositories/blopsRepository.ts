import db from "../db/db";
import {blobs, users} from "../db/schema";
import {and, asc, eq, gt,sql} from "drizzle-orm";

export abstract class BlobsRepository {
    static async getAllById(userId : number) {
        return db.select().from(blobs).where(eq(blobs.userId,userId))
    }

    static async getAllByIdAndUpdatedAt(since : number , userId : number) {
        return db
            .select()
            .from(blobs)
            .where(
                and(
                    eq(blobs.userId,userId),
                    gt(blobs.updatedAt,since),
                ),
            )
            .orderBy(asc(blobs.updatedAt))
    }

    static async addBlob(  blob: {
                        id: string
                        ciphertext: Uint8Array
                        iv: Uint8Array
                        updatedAt: number
                        expiresAt?: number
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
                userId : userId
            })
            .onConflictDoUpdate({
                target:blobs.id,
                set:{
                    ciphertext: sql`excluded.ciphertext`,
                    iv: sql`excluded.iv`,
                    updatedAt: sql`excluded."updatedAt"`,
                    expiresAt: sql`excluded."expiresAt"`,
                    name: sql`excluded.name`,
                    type: sql`excluded.type`,
                },
                where: sql`excluded."updatedAt" > blobs."updatedAt"`,
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