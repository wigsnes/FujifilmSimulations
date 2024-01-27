import { RecipeShowcase } from "@/components/recipe";
import { Recipe } from "@/types";
import { kv } from "@vercel/kv";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await kv.hgetall<Recipe>(`recipe:${params.id}`);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  // await kv.rpush<number>("recipes", parseInt(params.id));
  // await kv.hset(`recipe:${params.id}`, recipe);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <RecipeShowcase {...recipe} />
    </div>
  );
}
