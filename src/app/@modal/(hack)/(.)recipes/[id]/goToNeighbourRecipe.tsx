"use client";

import { Recipe } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type GoToNeighbourRecipeProps = {
  id: string;
  recipes: Recipe[];
  children: React.ReactNode;
};

const GoToNeighbourRecipe = ({
  children,
  id,
  recipes,
}: GoToNeighbourRecipeProps) => {
  const ref = useRef(null);
  const router = useRouter();

  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  const index = recipe ? recipes.indexOf(recipe) : -1;
  const previousRecipe = index > 0 ? recipes[index - 1] : null;
  const nextRecipe = recipes.length > index ? recipes[index + 1] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && previousRecipe) {
        router.replace(`/recipes/${previousRecipe.id}`, { scroll: false });
      }
      if (e.key === "ArrowRight" && nextRecipe) {
        router.replace(`/recipes/${nextRecipe.id}`, { scroll: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default GoToNeighbourRecipe;
