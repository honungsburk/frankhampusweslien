import { Artwork } from "../src/Types/Artwork";
import { timestampAt } from "./Helpers";

export const motion: Artwork[] = [
  {
    name: "MOTION-064",
    collection: "MOTION",
    src: "images/MOTION-64.mp4",
    resolution: {
      x: 1920,
      y: 1080,
    },
    tags: ["Generative", "MOTION"],
    createdAt: timestampAt("2021-10-27"),
  },
];
