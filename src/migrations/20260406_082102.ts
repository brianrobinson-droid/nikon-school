import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "navigation_utility_bar" ADD COLUMN "icon_id" integer;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_utility_bar" ADD CONSTRAINT "navigation_utility_bar_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "navigation_utility_bar_icon_idx" ON "navigation_utility_bar" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "navigation_utility_bar" DROP CONSTRAINT "navigation_utility_bar_icon_id_media_id_fk";
  
  DROP INDEX "header_logo_idx";
  DROP INDEX "navigation_utility_bar_icon_idx";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "navigation_utility_bar" DROP COLUMN "icon_id";`)
}
