import { signal, useSignal } from "@preact/signals";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
// TODO find the location of this function to 
// minimise the import size
import { addDoc, collection, doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "preact/hooks";
import { fireAuth, fireStorage, fireStore, user } from "./firebase";


export const initApp = () => {
    const isLoading = useSignal(true);

    useEffect(() => {
        return onAuthStateChanged(fireAuth, next => {
            [user.value, isLoading.value] = [next, false];
        });
    }, []);

    return { isLoading: isLoading.value };
};

export const useFireBaseAuth = () => {
    return user.value;
};

/** FUNCTIONS */

/**
 * Register a new user to the firebase Application
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export async function registerUser(email, password) {
    return createUserWithEmailAndPassword(fireAuth, email, password);
}

/** 
 * Delete a user from the database, as well as all their saved data
 * 
 * @param {*} user 
 * @returns 
 */
export async function unregisterUser(user) {
    await deleteUser(user);
}

/**
 * User attempts to login to service
 *
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export async function signInUser(email, password) {
    return signInWithEmailAndPassword(fireAuth, email, password);
}

/**
 * Logout current user 
 */
export async function signOutUser() {
    return signOut(fireAuth);
}

/**
 * Upload a file to firebase. Throws an error if one exists
 * 
 * @param {File} file 
 * @param {string} filePath 
 * @returns
 */
export async function uploadFile(file, filePath) {
    const res = await uploadBytes(ref(fireStorage, filePath), file, { contentType: file.type, customMetadata: { /* TODO */ } });
    return getDownloadURL(res.ref);
}

/**
 * Uploads a product to the path `users/:userId/products/:productsId`
 * 
 * Throws an error if any occur
 * 
 * @param {*} user 
 * @param {*} product 
 * @returns 
 */
export async function uploadProduct(user, { product, file }) {
    const docRef = await addDoc(collection(fireStore, `users/${user.uid}/products/`), product);
    const thumbnailURL = await uploadFile(file, `users/${user.uid}/products/${docRef.id}`);
    return updateDoc(docRef, { thumbnailURL });
}

export async function getUserProfile(userRef) {
    const snapshot = await getDoc(userRef);
    return snapshot.data();
}

/**
 * Uploads user details to the path `users/:userId`
 * 
 * Throws an error if any occur
 */
export function updateUserProfile(user, details) {
    const detailsRef = doc(fireStore, `users/${user?.uid}`);

    return Promise.all([
        updateProfile(user, { displayName: details.displayName }),
        setDoc(detailsRef, details, { merge: true }),
    ]);
}

/**
 * Update document data with this helper function.
 * 
 * @param {string} path 
 * @param {*} data 
 * @returns 
 */
export async function updateData(path, data) {
    return updateDoc(doc(fireStore, path), data);
}