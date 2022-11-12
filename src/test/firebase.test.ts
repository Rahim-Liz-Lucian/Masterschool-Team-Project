import { async } from "@firebase/util";
import { User } from "firebase/auth";
import { arrayUnion, doc, DocumentData, getDoc, setDoc, SetOptions, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { describe, assert, test, expect } from "vitest";
import { authDelete, authSignUp, fireStorage, fireStore } from "../firebase";
import { readFileSync } from 'fs';

// admin@mail.com | thisisadmin1 | QrQPMb4LvsdzxY0yq9dAcgljDai2
describe("firebase.test", () => {
    async function uploadProduct({ uid }: { uid: string; }) {
        const docRef = doc(fireStore, "product", uid);
        try {
            await setDoc(docRef, { name: "__test__" });
            return true;
        } catch (error) {
            return false;
        }
    }


    async function uploadProductImage({ uid, fileName }: { uid: string; fileName: string; }) {
        const fileRef = ref(fireStorage, fileName);
        const productPhoto = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
        const contentType = "image/jpeg";
        try {
            const result = await uploadBytes(fileRef, productPhoto!, { contentType });
            // // Pause the upload
            // uploadTask.pause();

            // // Resume the upload
            // uploadTask.resume();

            // // Cancel the upload
            // uploadTask.cancel();
        } catch {

        }
    }

    test("upload an image to the database", async () => {
        // upload image to client
        const fileName = "test-photo.jpg";
        const buf = readFileSync(`./src/assets/${fileName}`);
        const blob = new Blob([buf.buffer]);
        expect(blob.size).not.toBe(0);

        const arrBuf = await blob.arrayBuffer();

        // save to storage
        const uid = "QrQPMb4LvsdzxY0yq9dAcgljDai2";
        const fileRef = ref(fireStorage, `image/${uid}/${fileName}`);
        const result = await uploadBytes(fileRef, arrBuf, { contentType: blob.type });

        expect(result.metadata.fullPath).not.toBe("");

        // make a reference in firestore
        const docRef = doc(fireStore, "product", uid);
        const _ = await setDoc(docRef, { filePath: fileRef.fullPath });
    });

    test("inserting and array into firebase", async () => {
        const product = arrayUnion({ name: 'foo', counter: 1 }, { name: 'bar', counter: 2 }, { name: 'baz', counter: 3 });

        const uid = "QrQPMb4LvsdzxY0yq9dAcgljDai2";
        const docRef = doc(fireStore, "__t", uid);

        // create a new object
        const _1 = await setDoc(docRef, { product });

        // update that object on a upload
        const _2 = await updateDoc(docRef, {
            product: arrayUnion({ name: 'xyz', counter: 4 }),
        });

        // update that object on a upload
        const _3 = await setDoc(docRef, {
            product: arrayUnion({ name: 'abc', counter: 5 }),
        }, { merge: true });
        // }, { merge: true, mergeFields: ["product"] }); // NOTE this option does not work
        // const _2 = await setDoc(docRef, { data: [{ name: 'xyz', counter: 1 }], name: "__test__" }, { merge: true });

        // using a helper function 
        // addProduct({ uid, doc: { name: "mno" } });
    });
});

// function addProduct(args: { uid: string, doc: DocumentData; }, opt?: SetOptions) { 
//     setDoc
// }