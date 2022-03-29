import admin from "firebase-admin"; // required
import { algomarble } from "./Seed/AlgoMarble";
import { fineart } from "./Seed/FineArt";
import { stainedGlass } from "./Seed/StainedGlass";
import { firebaseConfig } from "./src/secret.firebase";
import { Artwork } from "./src/Types/Artwork";

const useEmulator = true;

if (useEmulator) {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199";
}

const app = admin.initializeApp({ projectId: firebaseConfig.projectId });
const db = admin.firestore();

function createUploadMetadata(path: string) {
  return {
    destination: path,
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: "public, max-age=31536000",
    },
  };
}
const storage = admin.storage(app);
const bucket = storage.bucket("frank-hampus-weslien.appspot.com");

async function uploadImages(path: string) {
  const seedDataFolder = "devSeedData/";
  const parts = path.split("/");
  const fileName = parts[parts.length - 1];
  const nameParts = fileName.split(".");
  const name = nameParts[0];
  const extention = nameParts[1];
  storage
    .bucket("frank-hampus-weslien.appspot.com")
    .upload(seedDataFolder + fileName, createUploadMetadata(path));

  const origin = parts[0] + "/";
  if (extention !== "svg") {
    const lowResSrc = name + "_low_res.jpg";
    console.log(seedDataFolder + lowResSrc);
    console.log(origin + lowResSrc);
    bucket.upload(
      seedDataFolder + lowResSrc,
      createUploadMetadata(origin + lowResSrc)
    );
  }
  const thumbNailSrc = name + "_thumb_nail.jpg";
  bucket.upload(
    seedDataFolder + thumbNailSrc,
    createUploadMetadata(origin + thumbNailSrc)
  );
}

async function seedDatabase(artworks: Artwork[]) {
  try {
    for (let artwork of artworks) {
      console.log(artwork.src);
      uploadImages(artwork.src);
      await db.collection("art").add(artwork);
    }
    console.log("database seed was successful");
  } catch (error) {
    console.log(error, "database seed failed");
  }
}

const artworks = algomarble.concat(fineart).concat(stainedGlass);

seedDatabase(artworks);
