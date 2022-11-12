import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, getAuth } from "firebase/auth";
// TODO find the location of this function to 
// minimise the import size
import { getFirestore } from "firebase/firestore";
import { signal } from "@preact/signals";

const fireApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
});

export const fireAuth = getAuth(fireApp);

// TODO rename these helper functions
export async function authSignUp(email: string, password: string) {
    // Firebase is setting local storage for us using tokens
    // so is automatically logging user after refresh
    return createUserWithEmailAndPassword(fireAuth, email, password);
}

export async function authSignIn(email: string, password: string) {
    return signInWithEmailAndPassword(fireAuth, email, password);
}

export async function authSignOut() {
    signOut(fireAuth);
}

// not being used
export async function authDelete(user: User) {
    await deleteUser(user);
}

// No longer required to pass context
export const userSignal = signal(fireAuth.currentUser);

// there has to be a state change

const fireStore = getFirestore(fireApp);