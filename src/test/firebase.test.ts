import { async } from "@firebase/util";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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

    // test("upload a product to firebase", async () => {
    //     const ok = await uploadProduct({ uid: "QrQPMb4LvsdzxY0yq9dAcgljDai2" });
    //     expect(ok).toBe(true);
    // });

    // test("upload a file to firebase", async () => {
    //     // return link to photo probably
    //     const _ = await uploadProductImage({ uid: "QrQPMb4LvsdzxY0yq9dAcgljDai2", fileName: "some-photo" });

    // });

    // test removing product from database

    test("upload an image to the database", async () => {
        // upload image to client
        const fileName = "test-photo.jpg";
        const buf = readFileSync(`./src/assets/${fileName}`);
        const blob = new Blob([buf.buffer]);
        expect(blob.size).not.toBe(0);

        const arrBuf = await blob.arrayBuffer();

        // save to storage
        const fileRef = ref(fireStorage, `image/${fileName}`);
        const result = await uploadBytes(fileRef, arrBuf, { contentType: blob.type });

        expect(result.metadata.fullPath).not.toBe("");

        // make a reference in firestore
        const uid = "QrQPMb4LvsdzxY0yq9dAcgljDai2";
        const docRef = doc(fireStore, "product", uid);
        const _ = await setDoc(docRef, { filePath: result.metadata.fullPath });
    });
});