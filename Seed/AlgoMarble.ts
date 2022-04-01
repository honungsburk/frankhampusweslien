import { Artwork } from "../src/Types/Artwork";
import { adaToLovelace, timestampAt, TokenID } from "./Helpers";
import * as Util from "../src/Util";

export const devArtworks = ["0489", "0498", "0510", "0511"];

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

// export const algomarble: Artwork[] = [
//   {
//     name: "#0489",
//     collection: "AlgoMarble",
//     saleInfo: {
//       price: "25000000",
//       status: "Available",
//     },
//     src: "images/489.jpg",
//     resolution: {
//       x: 2400,
//       y: 1600,
//     },
//     tags: ["Generative", "AlgoMarble"],
//     createdAt: timestampAt("2021-9-8"),
//     token: {
//       policyID: "fc7f00513d26a5c4de57a5863f0849559493d5ec008951eeb65ed3f1",
//       assetName: "FHWALGOMARBLE0489",
//       onChainMetadata: {
//         name: "FHWALGOMARBLE0489",
//         image: "ipfs://QmWLSWKLWQdXe5QrjpYcHMHH6YrDdEguKXFHM6cmrwjevE",
//         mediaType: "image/png",
//         files: [
//           {
//             src: "ipfs://QmeKDp1SHJacnueymWjrudiF8Qo6iqoCjcrMyU2DUHixNh",
//             name: "FHWALGOMARBLE0489",
//             mediaType: "image/png",
//           },
//         ],
//       },
//     },
//   },
//   {
//     name: "#0498",
//     collection: "AlgoMarble",
//     saleInfo: {
//       price: "25000000",
//       status: "Sold",
//     },
//     src: "images/498.jpg",
//     resolution: {
//       x: 2400,
//       y: 1600,
//     },
//     tags: ["Generative", "AlgoMarble"],
//     createdAt: timestampAt("2021-9-8"),
//     token: {
//       policyID: "fc7f00513d26a5c4de57a5863f0849559493d5ec008951eeb65ed3f1",
//       assetName: "FHWALGOMARBLE0498",
//       onChainMetadata: {
//         name: "FHWALGOMARBLE0498",
//         image: "ipfs://QmTLLZW8SU7u7GBGQeNY8BByesWJLQPVb4vAMSw53MpW7f",
//         mediaType: "image/png",
//         files: [
//           {
//             src: "ipfs://QmeS8fMvsbdNurYwkW8dFZdcPnECNY1YRPEhrC2t2hkYJv",
//             name: "FHWALGOMARBLE0498",
//             mediaType: "image/png",
//           },
//         ],
//       },
//     },
//   },
//   {
//     name: "#0510",
//     collection: "AlgoMarble",
//     saleInfo: {
//       price: "25000000",
//       status: "Sold",
//     },
//     src: "images/510.jpg",
//     resolution: {
//       x: 2400,
//       y: 1600,
//     },
//     tags: ["Generative", "AlgoMarble"],
//     createdAt: timestampAt("2021-9-8"),
//     token: {
//       policyID: "fc7f00513d26a5c4de57a5863f0849559493d5ec008951eeb65ed3f1",
//       assetName: "FHWALGOMARBLE0510",
//       onChainMetadata: {
//         name: "FHWALGOMARBLE0510",
//         image: "ipfs://QmcFzm2aoo4hraVR9b2CZo5BYHvowRvWR3wxvmRxRn9g2d",
//         mediaType: "image/png",
//         files: [
//           {
//             src: "ipfs://QmeDeXykiDLw9ieWGHtdTJiX88xQg57f4dFGqPSbvLjhS7",
//             name: "FHWALGOMARBLE0510",
//             mediaType: "image/png",
//           },
//         ],
//       },
//     },
//   },
//   {
//     name: "#0511",
//     collection: "AlgoMarble",
//     saleInfo: {
//       price: "25000000",
//       status: "Sold",
//     },
//     src: "images/511.jpg",
//     resolution: {
//       x: 2400,
//       y: 1600,
//     },
//     tags: ["Generative", "AlgoMarble"],
//     createdAt: timestampAt("2021-9-8"),
//     token: {
//       policyID: "fc7f00513d26a5c4de57a5863f0849559493d5ec008951eeb65ed3f1",
//       assetName: "FHWALGOMARBLE0511",
//       onChainMetadata: {
//         name: "FHWALGOMARBLE0511",
//         image: "ipfs://QmRUDaR6aP4nkLXYxD37jEteK7cqYqmyFhahCBFKDBEqso",
//         mediaType: "image/png",
//         files: [
//           {
//             src: "ipfs://QmZLHRrHJ2z7QuEJ94M4BGc3s1Ae42bRuvgHGVikoUHHio",
//             name: "FHWALGOMARBLE0511",
//             mediaType: "image/png",
//           },
//         ],
//       },
//     },
//   },
// ];
