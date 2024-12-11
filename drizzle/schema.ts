import {
  AnySQLiteColumn,
  blob,
  index,
  integer,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const cards = sqliteTable("cards", {
  scryfallId: text("scryfall_id").primaryKey().notNull(),
  name: text(),
  embedding: numeric(),
}, (table) => {
  return {
    embeddingIdx: index("embedding_idx").on(),
  };
});

export const libsqlVectorMetaShadow = sqliteTable("libsql_vector_meta_shadow", {
  name: text().primaryKey().notNull(),
  metadata: blob(),
});

export const embeddingIdxShadow = sqliteTable("embedding_idx_shadow", {
  indexKey: integer("index_key").primaryKey(),
  data: blob(),
}, (table) => {
  return {
    idx: index("embedding_idx_shadow_idx").on(table.indexKey),
  };
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {});
