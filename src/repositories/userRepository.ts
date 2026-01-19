import db from "../db/db";
import { users} from "../db/schema";
import * as bun from "bun";
import {eq} from "drizzle-orm";
import {AuthModel} from "../types/AuthModel";



export abstract class UserRepository {
    static async createUser({email,password} : AuthModel.registerBody) {
        const hashedPassword = await bun.password.hash(password);
        return db.insert(users).values({email, password: hashedPassword})
    }

    static async findByEmail(email: string) {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return user;
}

}
