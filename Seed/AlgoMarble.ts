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

export function algomarble(): Artwork[] {
  return Util.range(0, 511).map((name) => {
    return {
      name: name.toString().padStart(4, "0"),
      canUpdateCommunityName: true,
      collection: "Stained Glass",
      saleInfo: {
        price: adaToLovelace("25"),
        status: "Sold",
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
