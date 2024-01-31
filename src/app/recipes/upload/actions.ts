"use server";

import { Recipe } from "@/types";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createNewRecipe = async (prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    aperture: z.string().min(1),
    iso: z.string().min(1),
    shutterSpeed: z.string().min(1),
  });

  const data = schema.parse(Object.fromEntries(formData.entries()));

  const file = formData.get("image") as File;
  const filename = file.name;

  try {
    const id = await kv.incr("currentRecipeId");

    const recipe = {
      id: id,
      name: data.name,
      description: data.description ?? "",
      src: filename,
      settings: {
        aperture: data.aperture,
        iso: parseInt(data.iso),
        shutterSpeed: data.shutterSpeed,
      },
    } as Recipe;

    await kv.hset(`recipe:${id}`, recipe);
    await kv.rpush<number>("recipes", id);

    revalidatePath("/");
    return { message: "Recipe uploaded successfully" };
  } catch (error) {
    return { message: "Error uploading image" };
  }
};
