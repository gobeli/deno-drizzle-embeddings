import { BasicCard } from "../../db/schema.ts";
import { Layout } from "../components/Layout.tsx";
import { Card } from "../components/Card.tsx";

export function SearchPage(cards: BasicCard[], search?: string) {
  return (
    <Layout title="Search" className="flow">
      <form class="search-form">
        <label for="search">Embedding Search</label>
        <input name="search" id="search" value={search} />
      </form>
      <div class="cards-grid">
        {cards.map(c => <Card card={c} />)}
      </div>
    </Layout>
  );
}
