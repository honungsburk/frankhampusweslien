import admin from "firebase-admin"; // required
import { algomarble } from "./AlgoMarble";
import { fineart } from "./FineArt";
import { stainedGlass } from "./StainedGlass";
import { firebaseConfig } from "../src/secret.firebase";
import { Artwork } from "../src/Types/Artwork";

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
  console.log("Seeding the database ...");
  try {
    for (let artwork of artworks) {
      // Upload the images fist so we know all documents have the correct images
      uploadImages(artwork.src)
        .then(() => {
          // Firebase doesn't allow you to upload using Firebase timestamps...
          const uploadArwork: any = { ...artwork };
          uploadArwork.createdAt = artwork.createdAt.toDate();
          return db.collection("art").add(uploadArwork);
        })
        .then(() => console.log(artwork.collection + " - " + artwork.name))
        .catch((err) => {
          console.log("ERROR");
          console.log(
            `I was not able to seed ${artwork.name} from ${artwork.collection}`
          );
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error, "Seeing the database failed");
  }
}

const artworks = algomarble.concat(fineart).concat(stainedGlass);

seedDatabase(artworks);
