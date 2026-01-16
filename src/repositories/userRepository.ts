import db from "../db/db";
import {users} from "../db/schema";

export abstract class UserRepository {
    const createUser = (email: string) => {
        return db.insert(users).values({email:email})
    }
}