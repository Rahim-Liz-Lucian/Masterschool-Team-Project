import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, writeBatch } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireStorage, fireStore, fireAuth } from ".";

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
    const fileRef = ref(fireStorage, filePath);

    const res = await uploadBytes(fileRef, file, { contentType: file.type, customMetadata: { /* TODO */ } });
    return await getDownloadURL(res.ref);
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
export function uploadProduct(user, product) {
    const productRef = doc(fireStore, `users/${user?.uid}/products/${product.uid}`);
    return setDoc(productRef, product);
}

/**
 * Uploads user details to the path `users/:userId`
 * 
 * Throws an error if any occur
 * 
 * @param {*} user 
 * @param {*} details 
 * @returns 
 */
export function uploadUserDetails(user, details) {
    const detailsRef = doc(fireStore, `users/${user?.uid}`);
    return setDoc(detailsRef, details, { merge: true });
}

/**
 * This function deletes all user data from the system
 * 
 * @remarks This is not production ready as the API is too complicated to understand ☹️
 */
export async function deleteUserAccount(user, password) {
    // TOOD re-auth and if that passes then delete account
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // fireStorage
    const filesRef = ref(fireStorage, `users/${user?.uid}`);
    // (storage/object-not-found) Not Found

    // fireStore
    const userRef = doc(fireStore, `users/${user?.uid}`);

    const productsRef = collection(fireStore, `users/${user?.uid}/products`);

    const batch = writeBatch(fireStore);
    const snap = await getDocs(productsRef);
    snap.forEach(document => document.exists && batch.delete(document.ref));


    return Promise.all([
        // collection on top level
        deleteDoc(userRef),
        // collection on products level
        batch.commit(),
        // deleteObject(filesRef),
        deleteUser(user)
    ]);
}

export async function changePassword(newPassword) {
    const user = fireAuth.currentUser
    updatePassword(user, newPassword).then(() => {
        console.log("password updated")
      }).catch((error) => {
        console.log(error)
      });
    
}

export async function changeEmail(newEmail) {
    const user = fireAuth.currentUser
    updateEmail(user, newEmail).then(() => {
        console.log("email updated")
      }).catch((error) => {
        console.log(error)
      });
    
}
