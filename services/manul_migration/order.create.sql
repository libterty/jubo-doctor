
DO
$body$
DECLARE
BEGIN
  EXECUTE 'CREATE TABLE "order" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "message" character varying NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "patientId" uuid,
    CONSTRAINT "PK_ORDER" PRIMARY KEY ("id"),
    CONSTRAINT "FK_ORDER_TO_PATIENT" FOREIGN KEY ("patientId")
        REFERENCES public.patient (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
  )';

  EXECUTE 'CREATE INDEX IF NOT EXISTS "IDX_ORDER_TO_PATIENT" ON "order" USING btree ("patientId" ASC NULLS LAST) TABLESPACE pg_default WHERE "deletedAt" IS NULL';

END
$body$