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
    policyID: "27706b242382999c8cb7e79c4bc7171a37a57768cf8f4b44754d3906",
    tokenName: "FHW" + artwork.name.replace(/[^0-9a-zA-Z]/gi, ""),
  };
}

const wasNotSold = new Set([
  124, 120, 119, 109, 108, 107, 100, 99, 98, 97, 94, 78, 77, 76, 74, 67, 64, 62,
  61, 60, 56, 52, 51, 50, 49, 46, 44, 42, 39, 37, 36, 33, 31, 28, 27, 21, 20,
  13, 10, 6, 4,
]);

export function motion(): Artwork[] {
  return Util.range(0, 128).map((id) => {
    const name = id.toString().padStart(3, "0");
    return {
      name: `MOTION-${name}`,
      collection: "MOTION",
      canUpdateCommunityName: true,
      src: `images/MOTION-${id}.mp4`,
      saleInfo: {
        price: adaToLovelace("35"),
        status: wasNotSold.has(id) ? "Expired" : "Sold",
      },
      resolution: {
        x: 1920,
        y: 1080,
      },
      tags: ["Generative", "MOTION"],
      createdAt: timestampAt("2021-10-27"),
    };
  });
}
