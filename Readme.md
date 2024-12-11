# Vector Embeddings with Deno

This is a small project to show the usage of vector embeddings with deno, drizzle and sqlite.
You can search magic the gathering cards and find similar cards based on the vector embeddings:

![Demo image](static/demo.png)

## Run locally
To run the project locally first run `npx drizzle-kit migrate`, to create the sqlite db.
Then run `deno task init` to fill the db with the embeddings.
Finally to run the hono server, run `deno task dev`.
