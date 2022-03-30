import AssetFingerprint from "@emurgo/cip14-js";
import { Buffer } from "buffer";

/**
 * compute the asset fingerprint according to cip14
 * https://cips.cardano.org/cips/cip14/
 *
 * @param scriptHash the script hash
 * @param assetName the asset name
 * @returns the cip14 asset fingerprint
 */
export function assetFingerprint(
  policyID: string,
  assetName: string
): AssetFingerprint {
  return AssetFingerprint.fromParts(
    Buffer.from(policyID, "hex"),
    Buffer.from(assetName)
  );
}
