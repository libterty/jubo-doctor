
DO
$body$
DECLARE
BEGIN
  EXECUTE 'CREATE TABLE "order" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "message" character varying NOT NULL,
    "version" integer NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "PK_ORDER" PRIMARY KEY ("id")
  )';

  EXECUTE 'ALTER TABLE "order" ADD COLUMN "patientId" INTEGER';

  EXECUTE 'ALTER TABLE "order" ADD CONSTRAINT "FK_ORDER_TO_PATIENT" FOREIGN KEY ("patientId") REFERENCES "order"("id") MATCH SIMPLE ON DELETE CASCADE ON UPDATE NO ACTION';

  EXECUTE 'CREATE INDEX IF NOT EXISTS "IDX_ORDER_TO_PATIENT" ON "order" USING btree ("patientId" ASC NULLS LAST) TABLESPACE pg_default WHERE "deletedAt" IS NULL';

END
$body$