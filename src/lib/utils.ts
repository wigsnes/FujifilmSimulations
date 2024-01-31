import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadRecipe = async (form: FormData) => {
  return await fetch(`/api/recipe/upload`, {
    method: "POST",
    body: form,
  });
};

export const uploadImage = async (file: File) => {
  return await fetch(`/api/image/upload?filename=${file.name}`, {
    method: "POST",
    body: file,
  });
};
