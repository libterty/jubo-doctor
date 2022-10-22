-- 超過120請施打8u

INSERT INTO "order"(
  "id",
  "message",
  "patientId",
  "version"
)
VALUES (
  uuid_generate_v4(),
  '超過120請施打8u',
  (SELECT pt.id FROM patient AS pt WHERE pt.name = 'user_1'),
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  '超過110請施打7u',
  (SELECT pt.id FROM patient AS pt WHERE pt.name = 'user_1'),
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  '超過100請施打6u',
  (SELECT pt.id FROM patient AS pt WHERE pt.name = 'user_1'),
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  '超過100請施打6u',
  (SELECT pt.id FROM patient AS pt WHERE pt.name = 'user_2'),
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  '超過100請施打6u',
  (SELECT pt.id FROM patient AS pt WHERE pt.name = 'user_4'),
  CAST(1 AS INT)
);