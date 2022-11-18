import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO find the location of this function to 
// minimise the import size
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const fireApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
});

/** FIREBASE AUTHENTICATION  */

/**
 * @remarks
 * FIXME this should not be globally available
 */
export const fireAuth = getAuth(fireApp);

/** 
 * FIREBASE STORE & STORAGE 
 *
 * @remarks
 * TODO Understanding the Data-model. 
 * 
 * https://firebase.google.com/docs/firestore/data-model 
 */
export const fireStore = getFirestore(fireApp);

export const fireStorage = getStorage(fireApp);
