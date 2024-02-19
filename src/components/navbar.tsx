"use client";

import Link from "next/link";
import { useState } from "react";

const SensorCameraMap = {
  GFX: ["GFX-50S", "GFX-50R", "GFX100", "GFX100S", "GFX-50S II", "GFX100 II"],
  BAYER: [
    "X-A1",
    "X-A2",
    "X-A3",
    "X-A5",
    "X-A7",
    "X-A10",
    "X-A20",
    "XF10",
    "X-T100",
    "X-T200",
  ],
  "EXR-CM": ["X100", "XF1", "X10", "X-S1"],
  "X-Trans I": ["X-Pro1", "X-E1", "X-M1"],
  "X-Trans II": [
    "X100S",
    "X100T",
    "X-E2",
    "X-E2S",
    "X-T1",
    "X-T10",
    "X70",
    "X20",
    "X30",
    "XQ1",
    "XQ2",
  ],
  "X-Trans III": ["X-Pro2", "X100F", "X-E3", "X-T2", "X-T20", "X-H1"],
  "X-Trans IV": [
    "X100V",
    "X-Pro3",
    "X-T4",
    "X-T3",
    "X-T30",
    "X-S10",
    "X-E4",
    "X-T30 II",
  ],
  "X-Trans V": ["X-H2s", "X-H2", "X-T5", "X-S20"],
};

type senorTypes = keyof typeof SensorCameraMap;

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sensor, setSensor] = useState<senorTypes | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0">
      <div className="flex flex-col w-full bg-gray-200">
        <div className="flex justify-center items-center h-12">
          <h1 className="text-3xl font-bold font-mono text-red-950">
            Fujifilm Film Simulation Recipes
          </h1>
        </div>
      </div>
      <div
        className="group flex flex-col h-8 w-full bg-gray-300"
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <div className="flex justify-center items-center">
          {Object.keys(SensorCameraMap).map((type) => (
            <Link
              key={type}
              href={`/${type}`}
              className={`flex justify-center items-center h-8 p-4 hover:underline ${
                open && sensor === type ? "bg-gray-400" : ""
              }`}
              onMouseEnter={() => {
                setOpen(true);
                setSensor(type as senorTypes);
              }}
            >
              {type}
            </Link>
          ))}
        </div>
        {open && (
          <div className="hidden group-hover:block">
            <div className="w-full flex justify-center items-center h-8 gap-4 bg-gray-400">
              {sensor !== null &&
                SensorCameraMap[sensor].map((camera) => (
                  <Link
                    key={camera}
                    href={`${sensor}/${camera}`}
                    className="hover:underline"
                  >
                    {camera}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
