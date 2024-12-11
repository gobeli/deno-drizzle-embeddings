import { BasicCard } from "../../db/schema.ts";

export function Card({card}: {card: BasicCard}) {
  return (
    <a href={"/card/" + card.scryfall_id} class="card">
      <img src={card.image_uri!} alt={card.name!} />
    </a>
  );
}
