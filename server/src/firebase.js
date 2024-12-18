// Import the functions you need from the SDKs you need
import { config } from "dotenv"
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
let app;
let firestore;
const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore();
    return app;
  } catch (error) {
    console.error("Error initializing Firebase app", error);
  }
}

const uploadProcessData = async () => {
  const data = {
    fullName: "John Doe",
    email: "john@gmail.com",
    password: "JohnDoe123",
  }
  try {
    const docu = doc(firestore, "users", "user1");
    const updatedData = await setDoc(docu, data);
    console.log("Data uploaded successfully");
    return updatedData;
  } catch (error) {
    console.error("Error uploading data", error);
  }
}

const getFirebaseApp = () => app;

export { initializeFirebaseApp, getFirebaseApp, uploadProcessData };