// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAvCjsgw9rHYYc9mGlUrpGBV8mIgU9Lq6U",
    authDomain: "test-zz-44d0c.firebaseapp.com",
    projectId: "test-zz-44d0c",
    storageBucket: "test-zz-44d0c.appspot.com",
    messagingSenderId: "20587795034",
    appId: "1:20587795034:web:b298504f4876da76aa3e63"
};

// Initialize Firebase
!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export default db;

export { auth, storage, provider };
