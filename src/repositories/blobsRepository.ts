import db from "../db/db";
import {blobs, users} from "../db/schema";
import {eq} from "drizzle-orm";

export abstract class BlobsRepository {
    static async getAll(userId : number) {
        return db.select().from(blobs).where(eq(blobs.userId,userId))
    }
}