import { promises as fs } from "fs";
import { RecipeShowcase } from "@/components/recipe";
import { Recipe } from "@/types";
import { Simulate } from "@/components/simulate";

async function openAndConvertToFile(filePath: string) {
  try {
    // Open the file and get a fileHandle
    const fileHandle = await fs.open(filePath, "r");

    // Read the contents of the file into a buffer
    const buffer = await fs.readFile(fileHandle);

    // Create a File object using the buffer
    const file = new File([buffer], filePath, {
      type: "application/octet-stream",
    });

    // Now you can work with the 'file' object
    return file;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function RecipePage() {
  // open the file
  // const file = await openAndConvertToFile("public/recipes/images/astia.jpg");

  // if (!file) {
  //   return null;
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <Simulate file={file} /> */}
    </div>
  );
}
