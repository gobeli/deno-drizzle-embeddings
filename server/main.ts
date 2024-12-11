import { Context, Hono } from "hono";
import { serveStatic } from "hono/deno";

import { basicCard, cards } from "../db/schema.ts";
import { db, lower } from "../db/db.ts";
import { CardsPage } from "./pages/CardsPage.tsx";
import { eq, like, sql, ne } from "drizzle-orm";
import { CardPage } from "./pages/CardPage.tsx";
import { ErrorComponent } from "./pages/ErrorPage.tsx";
import { Embedder } from "../embedder/embedder.ts";
import { BasicCard } from "../db/schema.ts";
import { SearchPage } from "./pages/SearchPage.tsx";

const app = new Hono();
const pageSize = 10;

app.get("/", async (c: Context) => {
  const search = c.req.query("search");
  let result: BasicCard[] = [];

  if (search) {
    const [embedding] = await Embedder.embed([search]);
    result = await db.select(basicCard).from(
      sql`vector_top_k('embedding_idx', vector(${
        JSON.stringify(embedding)
      }), 20)`,
    ).innerJoin(cards, sql`cards.rowid = id`);
  }

  return c.html(SearchPage(result, search));
});

app.get("/card/:id", async (c: Context) => {
  const id = c.req.param("id");
  const cardResponse = await db.select(basicCard).from(cards).where(
    eq(cards.scryfall_id, id),
  );

  if (cardResponse.length <= 0) {
    return c.notFound();
  }

  const related = await db.select(basicCard).from(
    sql`vector_top_k('embedding_idx', vector(
      (select embedding from cards where scryfall_id = ${id})
  ), 20)`,
  ).where(ne(cards.scryfall_id, id)).innerJoin(cards, sql`cards.rowid = id`);

  return c.html(CardPage(cardResponse[0], related));
});

app.get("/all", async (c: Context) => {
  const page = isNaN(+c.req.query("page")!) ? 1 : +c.req.query("page")!;
  const search = c.req.query("search");
  const cardResponse = await db.select({
    card: basicCard,
    count: sql<number>`count(*) over()`,
  }).from(cards)
    .where(
      search ? like(lower(cards.name), `%${search.toLowerCase()}%`) : undefined,
    )
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return c.html(
    CardsPage({
      data: cardResponse.map((r) => r.card),
      total: cardResponse[0]?.count,
      page,
      pageSize,
      search,
    }),
  );
});

app.notFound((c: Context) => {
  return c.html(ErrorComponent("Not found"), 404);
});

app.use("/static/*", serveStatic({ root: "./" }));

Deno.serve(app.fetch);
