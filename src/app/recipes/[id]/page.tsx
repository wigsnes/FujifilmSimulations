import { promises as fs } from "fs";
import { RecipeShowcase } from "@/components/recipe";
import { Recipe } from "@/types";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const file = await fs.readFile(
    process.cwd() + "/public/recipes/data.json",
    "utf8"
  );
  const data = JSON.parse(file);

  const recipes = data.recipes as Recipe[];
  const recipe = recipes.find((recipe) => recipe.id === parseInt(params.id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <RecipeShowcase {...recipe} />
    </div>
  );
}
