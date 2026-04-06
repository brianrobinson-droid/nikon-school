import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_social_media_platform" AS ENUM('facebook', 'twitter', 'instagram', 'pinterest', 'tiktok');
  CREATE TABLE "training_nav_cards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "footer_social_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_media_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"show" boolean DEFAULT true
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_utility_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"country_selector_label" varchar,
  	"country_selector_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"homepage_url" varchar DEFAULT '/' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "finance_your_training_page_certification_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt_text" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "finance_your_training_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"training_nav_section_heading" varchar DEFAULT 'Training we offer' NOT NULL,
  	"nikon_training_explained_heading" varchar NOT NULL,
  	"nikon_training_explained_body" jsonb NOT NULL,
  	"qualiopi_datadock_heading" varchar NOT NULL,
  	"qualiopi_datadock_body" jsonb NOT NULL,
  	"accompaniment_heading" varchar NOT NULL,
  	"accompaniment_body" jsonb NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"contact_form_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "training_nav_cards_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_items_id" integer;
  ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar NOT NULL;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_media" ADD CONSTRAINT "footer_social_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_nav_items" ADD CONSTRAINT "navigation_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_utility_bar" ADD CONSTRAINT "navigation_utility_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "finance_your_training_page_certification_badges" ADD CONSTRAINT "finance_your_training_page_certification_badges_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "finance_your_training_page_certification_badges" ADD CONSTRAINT "finance_your_training_page_certification_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."finance_your_training_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "training_nav_cards__order_idx" ON "training_nav_cards" USING btree ("_order");
  CREATE INDEX "training_nav_cards_updated_at_idx" ON "training_nav_cards" USING btree ("updated_at");
  CREATE INDEX "training_nav_cards_created_at_idx" ON "training_nav_cards" USING btree ("created_at");
  CREATE INDEX "faq_items__order_idx" ON "faq_items" USING btree ("_order");
  CREATE INDEX "faq_items_updated_at_idx" ON "faq_items" USING btree ("updated_at");
  CREATE INDEX "faq_items_created_at_idx" ON "faq_items" USING btree ("created_at");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_media_order_idx" ON "footer_social_media" USING btree ("_order");
  CREATE INDEX "footer_social_media_parent_id_idx" ON "footer_social_media" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_nav_items_order_idx" ON "navigation_nav_items" USING btree ("_order");
  CREATE INDEX "navigation_nav_items_parent_id_idx" ON "navigation_nav_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_utility_bar_order_idx" ON "navigation_utility_bar" USING btree ("_order");
  CREATE INDEX "navigation_utility_bar_parent_id_idx" ON "navigation_utility_bar" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "finance_your_training_page_certification_badges_order_idx" ON "finance_your_training_page_certification_badges" USING btree ("_order");
  CREATE INDEX "finance_your_training_page_certification_badges_parent_id_idx" ON "finance_your_training_page_certification_badges" USING btree ("_parent_id");
  CREATE INDEX "finance_your_training_page_certification_badges_image_idx" ON "finance_your_training_page_certification_badges" USING btree ("image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_training_nav_cards_fk" FOREIGN KEY ("training_nav_cards_id") REFERENCES "public"."training_nav_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_items_fk" FOREIGN KEY ("faq_items_id") REFERENCES "public"."faq_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_training_nav_cards_id_idx" ON "payload_locked_documents_rels" USING btree ("training_nav_cards_id");
  CREATE INDEX "payload_locked_documents_rels_faq_items_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_items_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "training_nav_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_utility_bar" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "finance_your_training_page_certification_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "finance_your_training_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "training_nav_cards" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_social_media" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "navigation_nav_items" CASCADE;
  DROP TABLE "navigation_utility_bar" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "finance_your_training_page_certification_badges" CASCADE;
  DROP TABLE "finance_your_training_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_training_nav_cards_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_items_fk";
  
  DROP INDEX "payload_locked_documents_rels_training_nav_cards_id_idx";
  DROP INDEX "payload_locked_documents_rels_faq_items_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "training_nav_cards_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_items_id";
  ALTER TABLE "footer" DROP COLUMN "copyright_text";
  DROP TYPE "public"."enum_footer_social_media_platform";`)
}
