CREATE TABLE "blobs" (
	"id" varchar PRIMARY KEY,
	"updatedAt" timestamp,
	"data" jsonb NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "keys" (
	"id" varchar PRIMARY KEY,
	"user_id" integer,
	"wrappedKey" bytea,
	"iv" bytea,
	"salt" bytea,
	"iterations" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(256) NOT NULL UNIQUE
);
--> statement-breakpoint
ALTER TABLE "blobs" ADD CONSTRAINT "blobs_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");