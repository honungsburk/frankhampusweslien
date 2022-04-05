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

export function motion(): Artwork[] {
  return Util.range(0, 128).map((id) => {
    const name = id.toString().padStart(3, "0");
    return {
      name: `MOTION-${name}`,
      collection: "MOTION",
      canUpdateCommunityName: true,
      src: `images/MOTION-${id}.mp4`,
      saleInfo: {
        price: adaToLovelace("25"),
        status: "Sold",
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
