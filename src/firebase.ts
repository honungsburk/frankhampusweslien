import * as firebase from "firebase/app";
import * as Firestore from "firebase/firestore";
import { firebaseConfig } from "./secret.firebase";
import * as Storage from "firebase/storage";

export const app = firebase.initializeApp(firebaseConfig);
export const db = Firestore.getFirestore(app);
Firestore.connectFirestoreEmulator(db, "localhost", 8080);
export const storage = Storage.getStorage(app);
Storage.connectStorageEmulator(storage, "localhost", 9199);
