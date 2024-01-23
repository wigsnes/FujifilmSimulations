import { promises as fs } from "fs";
import { Gallery } from "@/components/gallery";
import { Recipe } from "@/types";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/public/recipes/data.json",
    "utf8"
  );
  const data = JSON.parse(file);
  const recipes = data.recipes as Recipe[];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-10 font-mono">
        Fujifilm Film Simulation Recipes
      </h1>
      <Gallery recipes={recipes} />
    </main>
  );
}
