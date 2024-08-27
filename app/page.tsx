import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      Proyecto Ministerio
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
