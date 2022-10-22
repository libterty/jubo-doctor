
DO
$body$
DECLARE
BEGIN
  EXECUTE 'CREATE TABLE "patient" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" character varying(255) NOT NULL,
    "version" integer NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "PK_PATIENT" PRIMARY KEY ("id")
  )';

  EXECUTE 'CREATE INDEX IF NOT EXISTS "IDX_PATIENT_NAME" ON "patient" ("name") WHERE "deletedAt" IS NULL';

END
$body$