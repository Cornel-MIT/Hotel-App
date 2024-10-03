import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDx07IF7H9dxhpwExkA3O3BPTmhlnkrGVg",
    authDomain: "hotel-booking-fa08d.firebaseapp.com",
    projectId: "hotel-booking-fa08d",
    storageBucket: "hotel-booking-fa08d.appspot.com",
    messagingSenderId: "373975992661",
    appId: "1:373975992661:web:33d58bac8256d3161707dc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);           