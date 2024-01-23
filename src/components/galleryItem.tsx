import { Recipe } from "@/types";
import Image from "next/image";
import Link from "next/link";

const GalleryItem = ({ id, name, src }: Recipe) => {
  return (
    <Link href={`recipes/${id}`} scroll={false}>
      <div className="border rounded-lg overflow-hidden transform transition hover:scale-105">
        <div className="relative">
          <Image
            alt={name}
            className="object-cover w-full h-48"
            height="200"
            src={src}
            style={{
              aspectRatio: "300/200",
              objectFit: "cover",
            }}
            width="300"
          />
          <h2 className="absolute bottom-0 left-0 text-lg font-bold text-white bg-black bg-opacity-50 w-full p-2">
            {name}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default GalleryItem;
