import { db } from "./db/db.ts";
import { Card, cards } from "./db/schema.ts";
import { Embedder } from "./embedder/embedder.ts";

type ScryfallCard = {
  id?: string;
  layout?: string;
  oracle_text?: string;
  image_uris?: any;
} & Partial<Card>;

async function load_data() {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile("./.data/cards.json");

  const data_raw = decoder.decode(file);
  return JSON.parse(data_raw) as ScryfallCard[];
}

if (import.meta.main) {
  const data = await load_data();
  const card_data = data.filter((card) => card.layout === "normal" && card.id)
    .map((card) => ({
      ...card,
      embedding_text:
        `${card.name}, ${card.type_line}, ${card.oracle_text}, ${card.mana_cost}, ${card.power}/${card.toughness}`,
    }));

  const batch_size = 128;
  let processed = 0;
  while (processed < card_data.length) {
    console.log(
      "processing batch",
      Math.ceil(processed / batch_size),
      "of",
      Math.ceil(card_data.length / batch_size),
    );

    const real_batch_size = Math.min(batch_size, card_data.length - processed);
    const batch = card_data.slice(processed, processed + real_batch_size);
    const card_texts = batch.map((card) => card.embedding_text);
    console.log(card_texts);
    const embeddings = await Embedder.embed(card_texts);
    const cards_with_embeddings = batch.map((card, i): Card => ({
      scryfall_id: card.id!,
      name: card.name,
      image_uri: card.image_uris?.normal,
      mana_cost: card.mana_cost,
      type_line: card.type_line,
      power: card.power,
      toughness: card.toughness,
      embedding: embeddings[i],
    }));

    await db.insert(cards).values(cards_with_embeddings);
    processed += batch_size;
  }
}
