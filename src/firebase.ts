import firebase from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./secret.firebase";

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");
