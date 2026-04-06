import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "finance_your_training_page"
      RENAME COLUMN "phone_number" TO "advisor_contact_phone_number";
    ALTER TABLE "finance_your_training_page"
      RENAME COLUMN "contact_form_url" TO "advisor_contact_contact_form_url";
    ALTER TABLE "finance_your_training_page"
      ADD COLUMN "advisor_contact_section_heading" character varying NOT NULL DEFAULT 'Contact our pedagogical advisor',
      ADD COLUMN "advisor_contact_contact_form_label" character varying NOT NULL DEFAULT 'Complete our contact form',
      ADD COLUMN "advisor_contact_phone_label" character varying NOT NULL DEFAULT 'Phone:';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "finance_your_training_page"
      DROP COLUMN "advisor_contact_section_heading",
      DROP COLUMN "advisor_contact_contact_form_label",
      DROP COLUMN "advisor_contact_phone_label";
    ALTER TABLE "finance_your_training_page"
      RENAME COLUMN "advisor_contact_phone_number" TO "phone_number";
    ALTER TABLE "finance_your_training_page"
      RENAME COLUMN "advisor_contact_contact_form_url" TO "contact_form_url";
  `)
}
