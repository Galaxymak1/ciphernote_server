import db from "../db/db";
import {User, users} from "../db/schema";
import * as bun from "bun";
import {eq} from "drizzle-orm";

type registerBody = {
    email: string;
    password: string;
}

export abstract class UserRepository {
    static async createUser({email,password} : registerBody) {
        const hashedPassword = await bun.password.hash(password);
        return db.insert(users).values({email, password: hashedPassword})
    }

    static async findByEmail(email: string): Promise<User | undefined> {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return user;
}

}
