import { pgTable} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import {defineRelations} from "drizzle-orm"


export type User = typeof users.$inferSelect;

export const users = pgTable("users",{
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    email: t.varchar({length: 256}).notNull().unique(),
    password: t.varchar({length: 256}).notNull().unique(),
})

export const blobs = pgTable("blobs", {
    id: t.varchar().primaryKey(),
    updatedAt: t.timestamp().notNull(),
    expiresAt: t.integer(),
    ciphertext: t.bytea().notNull(),
    iv: t.bytea().notNull(),
    userId: t.integer("user_id").references(() => users.id),
    type: t.varchar().notNull(),
    name: t.varchar().notNull(),

})

export const vaults = pgTable("vaults", {
    id: t.varchar().primaryKey(),
    userId: t.integer("user_id"),
    wrappedKey: t.bytea(),
    iv : t.bytea().notNull(),
    salt: t.bytea().notNull(),
    iterations : t.integer(),
})

export const relations = defineRelations({users, blobs, vaults},(r) =>({
    users: {
        blobs: r.many.blobs(),
        vaults: r.one.vaults({
            from:r.users.id,
            to: r.vaults.userId
        })
    },
    blobs: {
        user: r.one.users({
            from:r.blobs.userId,
            to: r.users.id
        }),
    },
}))