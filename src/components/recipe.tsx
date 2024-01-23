import { Recipe, Settings } from "@/types";
import Image from "next/image";

export function RecipeShowcase({ name, src, description, settings }: Recipe) {
  return (
    <main className="w-full max-w-2xl p-4 md:p-8 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Image
        alt={name}
        className="w-full h-64 md:h-80 object-cover rounded-lg"
        height={600}
        src={src}
        style={{
          aspectRatio: "800/600",
          objectFit: "cover",
        }}
        width={800}
      />
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-center dark:text-gray-100">
          {name}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
          {description}
        </p>
      </div>
      <Settings {...settings} />
    </main>
  );
}

const Settings = ({ iso, aperture, shutterSpeed }: Settings) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold dark:text-gray-100">Settings</h2>
      <ul className="mt-2 grid gap-2">
        <li className="flex justify-between dark:text-gray-400">
          <span>ISO:</span>
          <span>{iso}</span>
        </li>
        <li className="flex justify-between dark:text-gray-400">
          <span>Aperture:</span>
          <span>{aperture}</span>
        </li>
        <li className="flex justify-between dark:text-gray-400">
          <span>Shutter Speed:</span>
          <span>{shutterSpeed}</span>
        </li>
      </ul>
    </div>
  );
};

export default RecipeShowcase;
