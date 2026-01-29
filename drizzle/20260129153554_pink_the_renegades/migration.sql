ALTER TABLE "blobs" ADD COLUMN "deletedAt" integer;--> statement-breakpoint
ALTER TABLE "blobs" ALTER COLUMN "updatedAt" SET DATA TYPE integer USING "updatedAt"::integer;--> statement-breakpoint
ALTER TABLE "blobs" ALTER COLUMN "expiresAt" SET DATA TYPE integer USING "expiresAt"::integer;