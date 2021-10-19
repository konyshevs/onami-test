import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "### FIREBASE API KEY ###",
  authDomain: "### FIREBASE AUTH DOMAIN ###",
  projectId: "### CLOUD FIRESTORE PROJECT ID ###",
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBvoeOYDTgtJfNpgJ-vsfpYeizRRG9Adg",
  authDomain: "onami-e81f4.firebaseapp.com",
  projectId: "onami-e81f4",
  storageBucket: "onami-e81f4.appspot.com",
  messagingSenderId: "712120387368",
  appId: "1:712120387368:web:e3f0ea07c44a2c84dd721d",
  measurementId: "G-2GXB8RQK6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
