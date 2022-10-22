INSERT INTO patient(
  "id",
  "name",
  "version"
)
VALUES (
  uuid_generate_v4(),
  'user_1',
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  'user_2',
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  'user_3',
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  'user_4',
  CAST(1 AS INT)
),(
  uuid_generate_v4(),
  'user_5',
  CAST(1 AS INT)
);