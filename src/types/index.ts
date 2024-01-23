export type Settings = {
  iso?: number;
  aperture?: string;
  shutterSpeed?: string;
};

export type Recipe = {
  id: number;
  name: string;
  description: string;
  src: string;
  settings: Settings;
};
