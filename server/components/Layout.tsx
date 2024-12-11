import { html } from "hono/html";

export const Layout = (props: { title: string; children?: any; className?: string; }) => {
  return html`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${props.title}</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body class="${props.className}">
        ${props.children}
      </body>
    </html>`;
};
