import { Artwork } from "../src/Types/Artwork";
import { adaToLovelace, timestampAt, TokenID } from "./Helpers";
import * as Util from "../src/Util";

/**
 *
 * @param artwork the artwork
 * @returns
 */
export function possibleTokenID(artwork: Artwork): TokenID {
  return {
    policyID: "fc7f00513d26a5c4de57a5863f0849559493d5ec008951eeb65ed3f1",
    tokenName: "FHWALGOMARBLE" + artwork.name.replace(/[^0-9a-zA-Z]/gi, ""),
  };
}

const wasNotSold = new Set([
  457, 448, 437, 431, 418, 416, 415, 395, 376, 367, 354, 323, 306, 302, 282,
  271, 270, 259, 236, 162, 152, 127, 109, 103, 83, 66, 61, 49,
]);

export function algomarble(): Artwork[] {
  return Util.range(0, 511).map((name) => {
    return {
      name: name.toString().padStart(4, "0"),
      canUpdateCommunityName: true,
      collection: "AlgoMarble",
      saleInfo: {
        price: adaToLovelace("25"),
        status: wasNotSold.has(name) ? "Expired" : "Sold",
      },
      resolution: {
        x: 2400,
        y: 1600,
      },
      src: `images/${name}.jpg`,
      createdAt: timestampAt("2021-9-8"),
      tags: ["Generative", "AlgoMarble", "Noise"],
    };
  });
}
