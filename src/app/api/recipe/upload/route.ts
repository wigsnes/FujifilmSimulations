import { uploadImage } from "@/lib/utils";
import { Recipe } from "@/types";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const data = await request.formData();
  const name = data.get("name");
  const image = data.get("image");
  const description = data.get("description");
  const aperture = data.get("aperture");
  const iso = data.get("iso");
  const shutterSpeed = data.get("shutter-speed");

  uploadImage(image as File)
    .then(async ({ url }) => {
      const id = await kv.incr("currentRecipeId");

      const recipe = {
        id: id,
        name: name as string,
        description: description ?? "",
        src: url,
        settings: {
          aperture: aperture,
          iso: parseInt(iso as string),
          shutterSpeed: shutterSpeed,
        },
      } as Recipe;

      await kv.hset(`recipe:${id}`, recipe);
      await kv.rpush<number>("recipes", id);
    })
    .catch((error) => {
      console.error(error);
      return new NextResponse("Error uploading image", { status: 500 });
    });

  return new NextResponse(null, { status: 200 });
}
