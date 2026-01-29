ALTER TABLE "blobs" ALTER COLUMN "updatedAt" SET DATA TYPE bigint USING "updatedAt"::bigint;--> statement-breakpoint
ALTER TABLE "blobs" ALTER COLUMN "expiresAt" SET DATA TYPE bigint USING "expiresAt"::bigint;--> statement-breakpoint
ALTER TABLE "blobs" ALTER COLUMN "deletedAt" SET DATA TYPE bigint USING "deletedAt"::bigint;