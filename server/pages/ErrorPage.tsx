import { Layout } from "../components/Layout.tsx";

export function ErrorComponent(message: string) {
  return (
    <Layout title="Error">
      <h1>{message}</h1>
    </Layout>
  );
}
