import { BasicCard } from "../../db/schema.ts";
import { Page } from "../models.ts";
import { Layout } from "../components/Layout.tsx";
import { Card } from "../components/Card.tsx";

function searchParams(page?: number, search?: string) {
  const params = new URLSearchParams();
  if (search) {
    params.append("search", search);
  }

  if (page !== null && page !== undefined) {
    params.append("page", page.toString());
  }

  return "?" + params.toString();
}

export function CardsPage(cardPage: Page<BasicCard>) {
  return (
    <Layout title="MTG Cards">
      <form class="search-form">
        <label for="search">Search</label>
        <input name="search" id="search" value={cardPage.search} />
      </form>
      <div class="cards">
        {cardPage.data.map(c => <Card card={c} />)}
      </div>
      <div>
        {cardPage.page > 1 && (
          <a href={searchParams(+cardPage.page - 1, cardPage.search)}>
            Previous
          </a>
        )}
        {(cardPage.page * cardPage.pageSize) < cardPage.total && (
          <a href={searchParams(+cardPage.page + 1, cardPage.search)}>Next</a>
        )}
      </div>
    </Layout>
  );
}
