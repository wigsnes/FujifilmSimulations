import RecipeShowcase from "@/components/recipe";
import { Modal } from "./modal";
import { Recipe } from "@/types";
import { promises as fs } from "fs";
import GoToNeighbourRecipe from "./goToNeighbourRecipe";

const PhotoModal = async ({ params }: { params: { id: string } }) => {
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
    <Modal>
      <GoToNeighbourRecipe id={params.id} recipes={recipes}>
        <RecipeShowcase {...recipe} />
      </GoToNeighbourRecipe>
    </Modal>
  );
};

export default PhotoModal;
