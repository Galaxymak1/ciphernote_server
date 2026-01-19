ALTER INDEX "id_idx" RENAME TO "blobs_user_updated_idx";--> statement-breakpoint
DROP INDEX "updated_idx";--> statement-breakpoint
DROP INDEX "blobs_user_updated_idx";--> statement-breakpoint
CREATE INDEX "blobs_user_updated_idx" ON "blobs" ("user_id","updatedAt");