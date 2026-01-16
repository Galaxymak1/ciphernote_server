import { pgTable} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import {defineRelations} from "drizzle-orm"

export const users = pgTable("users",{
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    email: t.varchar({length: 256}).notNull().unique(),
})

export const blobs = pgTable("blobs", {
    id: t.varchar().primaryKey(),
    updatedAt: t.timestamp(),
    data: t.jsonb().notNull(),
    userId: t.integer("user_id").references(() => users.id),
})

export const keys = pgTable("keys", {
    id: t.varchar().primaryKey(),
    userId: t.integer("user_id"),
    wrappedKey: t.bytea(),
    iv : t.bytea(),
    salt: t.bytea(),
    iterations : t.integer(),
})

export const relations = defineRelations({users, blobs, keys},(r) =>({
    users: {
        blobs: r.many.blobs(),
        keys: r.one.keys({
            from:r.users.id,
            to: r.keys.userId
        })
    },
    blobs: {
        user: r.one.users({
            from:r.blobs.userId,
            to: r.users.id
        }),
    },
}))