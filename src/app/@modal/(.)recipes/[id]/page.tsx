import RecipeShowcase from "@/components/recipe";
import { Modal } from "./modal";
import { Recipe } from "@/types";
import GoToNeighbourRecipe from "./goToNeighbourRecipe";
import { kv } from "@vercel/kv";

const PhotoModal = async ({ params }: { params: { id: string } }) => {
  const listOfRecipes = await kv.lrange<number>("recipes", 0, -1);
  const recipe = await kv.hgetall<Recipe>(`recipe:${params.id}`);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <Modal>
      <GoToNeighbourRecipe id={params.id} recipes={listOfRecipes}>
        <RecipeShowcase {...recipe} />
      </GoToNeighbourRecipe>
    </Modal>
  );
};

export default PhotoModal;
