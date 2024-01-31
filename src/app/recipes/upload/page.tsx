"use client";

import { NewRecipeForm } from "@/components/new-recipe-form";
import { useFormState } from "react-dom";
import { createNewRecipe } from "./actions";
import { UploadButton } from "@/utils/uploadthing";

const initialState = {
  message: "",
};

export default function AvatarUploadPage() {
  const [state, formAction] = useFormState(createNewRecipe, initialState);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form action={formAction}>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res: any): any => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <NewRecipeForm />
        {state.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
