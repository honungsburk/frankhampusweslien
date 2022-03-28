import admin from "firebase-admin"; // required
// import { firebaseConfig } from "./src/secret.firebase";

const useEmulator = true;

if (useEmulator) {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
}

admin.initializeApp({ projectId: "frank-hampus-weslien" });

const db = admin.firestore();

// seed function
function getSeedData() {
  try {
    [...Array(10).keys()].map(() =>
      db.collection("events").add({
        author_name: "Frank" + " " + "Weslien",
      })
    );
    console.log("database seed was successful");
  } catch (error) {
    console.log(error, "database seed failed");
  }
}

getSeedData();
