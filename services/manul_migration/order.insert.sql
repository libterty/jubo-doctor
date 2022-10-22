-- 超過120請施打8u

INSERT INTO "order"(
  "id",
  "message",
  "patientId",
  "version"
)
VALUES (
  1,
  '超過120請施打8u',
  1,
  CAST(1 AS INT)
),(
  2,
  '超過110請施打7u',
  1,
  CAST(1 AS INT)
),(
  3,
  '超過100請施打6u',
  1,
  CAST(1 AS INT)
),(
  4,
  '超過100請施打6u',
  2,
  CAST(1 AS INT)
),(
  5,
  '超過100請施打6u',
  4,
  CAST(1 AS INT)
);