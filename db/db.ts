import { drizzle } from "drizzle-orm/libsql/node";
import { DefaultLogger, LogWriter } from "drizzle-orm/logger";
import { Column, SQL, sql } from "drizzle-orm";

class MyLogWriter implements LogWriter {
  write(message: string) {
    if (Deno.env.get("ENVIRONMENT") === "LOCAL") {
      console.log(message);
    }
  }
}

const logger = new DefaultLogger({ writer: new MyLogWriter() });

export const db = drizzle({
  connection: {
    url: "file:local.db",
  },
  logger,
});

export function lower(column: Column): SQL {
  return sql`lower(${column})`;
}
