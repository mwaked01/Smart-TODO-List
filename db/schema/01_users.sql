DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE "users" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(255),
  "email" VARCHAR(255),
  "password" VARCHAR(255)
);
