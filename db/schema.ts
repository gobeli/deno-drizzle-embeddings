import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { f32Blob } from "./blob.ts";

export const cards = sqliteTable("cards", {
  scryfall_id: text().primaryKey(),
  name: text(),
  image_uri: text(),
  mana_cost: text(),
  type_line: text(),
  power: text(),
  toughness: text(),
  embedding: f32Blob("embedding", {
    length: 384,
  }),
});

export const basicCard = {
  scryfall_id: cards.scryfall_id,
  name: cards.name,
  image_uri: cards.image_uri,
};

export type Card = typeof cards.$inferSelect;
export type BasicCard = Record<keyof typeof basicCard, string | null>;
