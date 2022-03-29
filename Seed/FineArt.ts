import { Artwork } from "../src/Types/Artwork";
import { timestampAt } from "./Helpers";

export const fineart: Artwork[] = [
  {
    name: "Aristocrat",
    description: "A copy of another artist's work. It was made for practice.",
    collection: "Frank's Fine Art",
    src: "images/Aristocrat-Dishonored.jpg",
    resolution: {
      x: 1700,
      y: 3000,
    },
    createdAt: timestampAt("2020-7-4"),
  },
  {
    name: "Magical Rocks",
    description: "A copy of another artist's work. It was made for practice.",
    collection: "Frank's Fine Art",
    src: "images/Magical_Rocks.jpg",
    resolution: {
      x: 2256,
      y: 2820,
    },
    createdAt: timestampAt("2020-8-29"),
  },
  {
    name: "Farsan",
    description:
      "This is a painting of an old photo of my dad who was a TV repair man at the time.",
    collection: "Frank's Fine Art",
    src: "images/Farsan.jpg",
    resolution: {
      x: 6000,
      y: 4000,
    },
    createdAt: timestampAt("2021-8-28"),
  },
  {
    name: "Rising Bull",
    saleInfo: {
      price: "100000000",
      status: "Sold",
    },
    description: "A bull rising with the sun.",
    collection: "Frank's Fine Art",
    src: "images/Bull.jpg",
    resolution: {
      x: 2048,
      y: 2732,
    },
    createdAt: timestampAt("2021-5-1"),
    token: {
      policyID: "dd04ad427b8c2f76409502907063239518d81ad7415046e170d3da07",
      assetName: "FHWARTRisingBull",
      onChainMetadata: {
        name: "FHWARTRisingBull",
        image: "ipfs://QmeDcEbZDMmUhLbyKMsHv3NJEvz4wBgdEfGT8TuUHR3rR8",
        mediaType: "image/png",
        files: [
          {
            src: "ipfs://QmQ2VNKvhYFDF6mVcdL1fndSLkmZJTcnYKGaoh13zMzVP9",
            name: "FHWARTHighResolution",
            mediaType: "image/png",
          },
        ],
      },
    },
  },
];
