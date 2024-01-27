import { Gallery } from "@/components/gallery";
import { Recipe } from "@/types";
import { kv } from "@vercel/kv";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-10 font-mono">
        Fujifilm Film Simulation Recipes
      </h1>
      <Gallery recipes={recipes} />
    </main>
  );
}
