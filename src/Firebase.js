
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB4DMFh8LWplCOp3IdqzJr5CLJqI_UHUWk",
    authDomain: "hostel-m-s-fyp.firebaseapp.com",
    projectId: "hostel-m-s-fyp",
    storageBucket: "hostel-m-s-fyp.firebasestorage.app",
    messagingSenderId: "510360957568",
    appId: "1:510360957568:web:0f39896d0ac9d5e2f02c65",
    measurementId: "G-QTKT0LV3J4"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
