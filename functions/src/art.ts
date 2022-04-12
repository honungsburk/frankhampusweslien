import * as functions from "firebase-functions";
import * as Types from "../../src/Types";
import * as ArtCounter from "../../src/Types/ArtCounter";
import * as admin from "firebase-admin";
import { firebaseConfig } from "../../Env/firebase.secrets";

const app = admin.initializeApp({ projectId: firebaseConfig.projectId });
const db = admin.firestore(app);

export const artStatusCounter = functions.firestore
  .document("art/{docId}")
  .onWrite((change, context) => {
    const oldArt: Types.Artwork | undefined = change.before.data() as
      | Types.Artwork
      | undefined;
    const newArt: Types.Artwork | undefined = change.after.data() as
      | Types.Artwork
      | undefined;

    return db.runTransaction(async (transaction) => {
      const artCounterDoc = db.doc("application/art-counter");
      const artCounterData = await transaction.get(artCounterDoc);

      let counter: ArtCounter.ArtCounter = ArtCounter.artCounterInit();

      if (artCounterData.exists) {
        // counter = artCounterData.data();
        counter = ArtCounter.artCounterSchema.validateSync(
          artCounterData.data()
        );
      }

      const oldCounter = { ...counter };

      if (oldArt) {
        counter.total -= 1;
        const status = oldArt.saleInfo?.status;
        if (status === "Gift") {
          counter.sold -= 1;
        } else if (status === "Available") {
          counter.available -= 1;
        } else if (status === "Reserved") {
          counter.reserved -= 1;
        } else if (status === "Sold") {
          counter.sold -= 1;
        } else {
          counter.notForSale -= 1;
        }
      }

      if (newArt) {
        counter.total += 1;
        const status = newArt.saleInfo?.status;
        if (status === "Gift") {
          counter.sold += 1;
        } else if (status === "Available") {
          counter.available += 1;
        } else if (status === "Reserved") {
          counter.reserved += 1;
        } else if (status === "Sold") {
          counter.sold += 1;
        } else {
          counter.notForSale += 1;
        }
      }

      if (!ArtCounter.eq(oldCounter, counter)) {
        return transaction.set(artCounterDoc, counter);
      }
      return undefined;
    });
  });
