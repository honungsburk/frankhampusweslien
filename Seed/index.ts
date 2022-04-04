import admin from "firebase-admin"; // required
import * as AlgoMarble from "./AlgoMarble";
import * as FineArt from "./FineArt";
import * as Motion from "./Motion";
import * as StainedGlass from "./StainedGlass";
import { firebaseConfig } from "../src/secret.firebase";
import {
  Artwork,
  Token,
  chainMetadataSchema,
  ChainMetadata,
} from "../src/Types/Artwork";
import * as yargs from "yargs";
import * as Path from "path";
import * as fs from "fs";
import { TokenID } from "./Helpers";
import * as BlockfrostEnv from "../Env/blockfrost.secrets";
import * as Blockfrost from "@blockfrost/blockfrost-js";
import * as Util from "../src/Util/Extra";

const API = new Blockfrost.BlockFrostAPI({
  projectId: BlockfrostEnv.env.mainnet,
});

type Env = {
  options: Options;
  connection: Connection;
};

type Connection = {
  app: admin.app.App;
  db: admin.firestore.Firestore;
  storage: admin.storage.Storage;
};

type Options = {
  production: boolean;
  wipe: boolean;
  verbose: boolean;
  "franks-fine-forms"?: string;
  algomarble?: string;
  "stained-glass"?: string;
  motion?: string;
};

const bucketName = "frank-hampus-weslien.appspot.com";

/**
 *
 * @param production If we should connect to the production instance
 * @returns the app and the db
 */
function initApp(production: boolean = false): Connection {
  if (!production) {
    process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
    process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199";
  }
  const app = admin.initializeApp({ projectId: firebaseConfig.projectId });
  const db = admin.firestore(app);
  const storage = admin.storage(app);
  return { app: app, db: db, storage: storage };
}

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

async function checkCanReadFile(path: string): Promise<boolean> {
  return fs.promises
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

/**
 * Will throw error id the token doesn't exist!
 *
 * @param tokenID the token data to find
 */
async function findTokenData(tokenID: TokenID): Promise<Token> {
  const assetID = tokenID.policyID + Util.hexEncode(tokenID.tokenName);
  // console.log(tokenID.tokenName, assetID);
  const data = await API.assetsById(assetID);

  const onchainMetadata = chainMetadataSchema.validateSync(
    data.onchain_metadata,
    {
      stripUnknown: true,
    }
  );

  return {
    policyID: tokenID.policyID,
    assetName: tokenID.tokenName,
    onChainMetadata: onchainMetadata as ChainMetadata,
  };
}

/**
 *
 * @param conn Holds firebase connections
 * @param folderPath path to the LOCAL folder where the files are stored
 * @param path the path at which the files will be saved
 */
async function uploadImages(
  conn: Connection,
  folderPath: string,
  path: string
) {
  const bucket = conn.storage.bucket(bucketName);
  const fileName = Path.basename(path);
  const nameParts = fileName.split(".");
  const name = nameParts[0];
  const extention = nameParts[1];
  bucket.upload(Path.join(folderPath, fileName), createUploadMetadata(path));
  const origin = Path.dirname(path);
  const extWithNoLowRes = ["svg", "mp4"];
  if (!extWithNoLowRes.includes(extention)) {
    const lowResSrc = name + "_low_res.jpg";
    bucket.upload(
      Path.join(folderPath, lowResSrc),
      createUploadMetadata(Path.join(origin, lowResSrc))
    );
  }
  const thumbNailSrc = name + "_thumb_nail.jpg";
  bucket.upload(
    Path.join(folderPath, thumbNailSrc),
    createUploadMetadata(Path.join(origin, thumbNailSrc))
  );
}

//console.log("Seeding the database ...");

function uploadData(
  conn: Connection,
  folderPath: string,
  artworks: Artwork[],
  tokenID: (artwork: Artwork) => TokenID
): Promise<void>[] {
  return artworks.map(async (artwork) => {
    const seedstring = "[SEED] " + artwork.collection + " - " + artwork.name;
    const shouldUpload = await checkCanReadFile(
      Path.join(folderPath, Path.basename(artwork.src))
    );
    if (shouldUpload) {
      console.log(seedstring);
      // Upload the images fist so we know all documents have the correct images
      try {
        await uploadImages(conn, folderPath, artwork.src);

        // Firebase doesn't allow you to upload using Firebase timestamps...
        const uploadArwork: any = { ...artwork };
        uploadArwork.createdAt = artwork.createdAt.toDate();

        try {
          const token = await findTokenData(tokenID(artwork));
          console.log(seedstring, ": FOUND TOKEN");
          uploadArwork.token = token;
        } catch (err: any) {
          console.log(seedstring, ": NO TOKEN");
        }

        await conn.db.collection("art").add(uploadArwork);
        console.log(seedstring, ": Success");
      } catch (err: any) {
        console.log("ERROR");
        console.log(
          `I was not able to seed ${artwork.name} from ${artwork.collection}`
        );
        console.log(err);
      }
    } else {
      console.log(seedstring, ": SKIP (Missing File)");
    }
  });
}

/**
 * WARNING: Super dangerous function that will wipe all data!
 *
 * @param conn the firestore connection where to wipe all data
 */
async function wipe(conn: Connection): Promise<void> {
  console.log("[WIPING] Bucket...");
  // Delete Bucket
  await conn.storage.bucket(bucketName).deleteFiles({ prefix: "" });
  console.log("[WIPING] Wiped bucket successfully!");

  console.log("[WIPING] Firestore...");
  const collections = await conn.db.listCollections();
  for (let collection of collections) {
    await conn.db.recursiveDelete(conn.db.collection(collection.path));
  }
  console.log("[WIPING] Wiped firestore successfully!");
}

const args: Options = yargs
  .scriptName("seed")
  .usage("$0 [options]")
  .recommendCommands()
  .option("production", {
    describe: "if we should seed the production database",
    type: "boolean",
    defaultDescription: "False",
    default: false,
    boolean: true,
  })
  .option("wipe", {
    describe:
      "wipe the database and bucket before upload (ignored if --production is present)",
    type: "boolean",
    defaultDescription: "False",
    default: false,
    boolean: true,
  })
  .option("verbose", {
    describe: "print extra information",
    type: "boolean",
    defaultDescription: "False",
    default: false,
    boolean: true,
  })
  .option("franks-fine-forms", {
    normalize: true,
    group: "Collection:",
    type: "string",
    requiresArg: true,
    describe: `if the 'Frank's Fine Forms' collection should be included, and where to find the files`,
  })
  .option("algomarble", {
    normalize: true,
    group: "Collection:",
    type: "string",
    requiresArg: true,
    describe: `if the 'AlgoMarble' collection should be included, and where to find the files`,
  })
  .option("stained-glass", {
    normalize: true,
    group: "Collection:",
    type: "string",
    requiresArg: true,
    describe: `if the 'Stained Glass' collection should be included, and where to find the files`,
  })
  .option("motion", {
    normalize: true,
    group: "Collection:",
    type: "string",
    requiresArg: true,
    describe: `if the 'MOTION' collection should be included, and where to find the files`,
  })
  .help().argv;

////////////////////////////////////////////////////////////////////////////////
// Seed
//
// Will only reach these lines if help is not present! (yargs takes care of it)
////////////////////////////////////////////////////////////////////////////////

// TODO
// * add proper logging
async function run() {
  console.log("[MODE]", args.production ? "PRODUCTION" : "EMULATOR");
  console.log("[Initializing]");
  const conn = initApp(args.production);

  if (args.wipe && !args.production) {
    console.log("[WIPING] Firestore and Storage...");
    await wipe(conn);
  }

  const uploads: Promise<void>[] = [];
  if (args["franks-fine-forms"]) {
    console.log("[SEED] 'Frank's Fine Forms'");
    uploads.concat(
      uploadData(
        conn,
        args["franks-fine-forms"],
        FineArt.fineart,
        FineArt.possibleTokenID
      )
    );
  }

  // if (args.algomarble) {
  //   console.log("[SEED] 'AlgoMarble'");
  //   uploadData(conn, args.algomarble, AlgoMarble.algomarble());
  // }

  await Promise.all(uploads);
  console.log("[SEED]", "Complete");
}

run();
