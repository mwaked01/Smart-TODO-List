DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE "tasks" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
  "category_id" INTEGER NOT NULL REFERENCES "categories" ("id") ON DELETE CASCADE,
  "title" TEXT,
  "date_created" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);