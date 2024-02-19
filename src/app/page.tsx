import { Gallery } from "@/components/gallery";
import { Recipe } from "@/types";
import { kv } from "@vercel/kv";
import Link from "next/link";

export default async function Home() {
  const listOfRecipes = await kv.lrange<number>("recipes", 0, -1);
  const recipes = await Promise.all(
    listOfRecipes
      .map(async (id) => {
        const recipe = await kv.hgetall<Recipe>(`recipe:${id}`);
        return recipe;
      })
      .filter(Boolean) as Promise<Recipe>[]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-16 py-32">
      <Gallery recipes={recipes} />
      <Link href="https://www.google.com/">Google</Link>
    </main>
  );
}
