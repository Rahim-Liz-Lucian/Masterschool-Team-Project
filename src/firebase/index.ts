import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, User, getAuth } from "firebase/auth";
// TODO find the location of this function to 
// minimise the import size
import { arrayUnion, doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { signal } from "@preact/signals";

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
 * This signal holds the context of the currently logged in user.
 */
export const authCtx = signal<User | null>(fireAuth.currentUser);

/**
 * This signal holds the context the current loading state.
 */
export const isPending = signal(true);

/**
 * Registering a new user
 * 
 * @remarks
 * TODO currently does not save a user profile in a collection.
 */
export async function registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(fireAuth, email, password);
}

/** 
 * Delete a user from the database, as well as all their saved data
 * 
 * @remarks
 * TODO function currently does not remove collections linked to user
 */
export async function unregisterUser(user: User) {
    await deleteUser(user);
}

/**
 * User attempts to login to service
 */
export async function loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(fireAuth, email, password);
}

/**
 * Logout current user 
 */
export async function logoutUser() {
    return signOut(fireAuth);
}

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

/**
 * Query the `product` collection for the document that is associated with the User's uuid 
 * 
 * @remarks
 * FIXME error handling
 */
export async function getUserProducts({ uid }: User) {
    const docRef = doc(fireStore, `product/${uid}`);
    const snapShot = await getDoc(docRef);
    // FIXME if error then return error to user
    return snapShot.data();
}

/**
 * Query the `product` collection for the document that is associated with the User's uuid 
 * 
 * @remarks
 * TODO research on sub-collections.
 */
export async function getUserProduct(user: User, { product }: { product: unknown; }) {
    throw new Error("not implemented");
}

/**
 * Upload a new document to the `product` collection for the User. 
 * 
 * @remarks
 * FIXME error handling
 */
export async function appendProductsDocument({ uid }: User, { product }: { product: any; }) {
    const docRef = doc(fireStore, `product/${uid}`);
    const entry = { ...product, id: crypto.randomUUID() };
    await setDoc(docRef, { product: arrayUnion(entry) }, { merge: true });
    // FIXME if error then return error to user
    return entry;
}

