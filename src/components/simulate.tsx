"use client";

import { Slider } from "@/components/ui/slider";
// import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SimulateProps = {
  file: File;
};

export function Simulate({ file }: SimulateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [imageName, setImageName] = useState("");
  const [brightnessValue, setBrightnessValue] = useState(0);
  const [saturateValue, setSaturateValue] = useState(0);

  useEffect(() => {
    if (file) {
      const fileSrc = URL.createObjectURL(file);
      setImageSrc(fileSrc);
      setImageName(file.name);
      return () => {
        URL.revokeObjectURL(fileSrc);
      };
    }
  }, [file]);

  // useEffect(() => {
  //   applyFilter();
  // }, [file, imageSrc, brightnessValue, saturateValue]);

  const getFilterString = () => {
    return `brightness(${brightnessValue}%) saturate(${saturateValue}%)`;
  };

  // const applyFilter = () => {
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext("2d");
  //   const image = new Image();
  //   image.src = imageSrc;
  //   image.onload = () => {
  //     if (canvas && context) {
  //       context.filter = getFilterString();
  //       context.save();
  //       context.drawImage(image, 0, 0, canvas.width, canvas.height);

  //       context.restore();
  //     }
  //   };
  // };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex h-14 items-center border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <h1 className="text-lg font-semibold">Image Editor</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex-1">
            {/* <Image
              alt="Image"
              className="mx-auto aspect-square overflow-hidden rounded-lg object-cover"
              height="550"
              src="/recipes/images/astia.jpg"
              width="550"
            /> */}
            <canvas
              className="canvas max-w-lg max-h-[22rem] w-full object-fit mx-auto"
              data-testid="image-editor-canvas"
              id="canvas"
              ref={canvasRef}
            />
          </div>
          <div className="flex-1 grid gap-4">
            <Setting name="Brightness" value={0}>
              <Slider
                className="rounded-lg w-full"
                id="brightness"
                max={100}
                min={-100}
                step={1}
                value={[brightnessValue]}
                onValueChange={(value) => setBrightnessValue(value[0])}
              />
            </Setting>
            <Setting name="Saturation" value={0}>
              <Slider
                className="rounded-lg w-full"
                id="saturation"
                max={100}
                min={-100}
                step={1}
                value={[saturateValue]}
                onValueChange={(value) => setSaturateValue(value[0])}
              />
            </Setting>
          </div>
        </div>
      </main>
    </div>
  );
}

type SettingProps = {
  name: string;
  value: number;
  children: React.ReactNode;
};

const Setting = ({ name, value, children }: SettingProps) => {
  return (
    <div className="grid grid-cols-[1fr,2fr,1fr] justify-between items-center w-full">
      <h2 className="text-lg font-semibold text-right md:text-center">
        {name}
      </h2>
      <div className="">{children}</div>
      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
        {value}
      </span>
    </div>
  );
};
