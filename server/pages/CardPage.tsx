import { BasicCard } from "../../db/schema.ts";
import { Card } from "../components/Card.tsx";
import { Layout } from "../components/Layout.tsx";

export function CardPage(card: BasicCard, related: BasicCard[]) {
  return (
    <Layout className="flow | card-page" title={card.name ?? "Card"}>
      <a class="back-link" href="/">
        ← Back
      </a>
      <div class="card-main">
        <Card card={card} />
      </div>
      <div class="card-related">
        <h2>Related Cards</h2>
        <div class="cards-grid">
          {related.map(r => <Card card={r} />)}
        </div>
      </div>
    </Layout>
  );
}
