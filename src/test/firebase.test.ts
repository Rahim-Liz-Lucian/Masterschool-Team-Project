import { User } from "firebase/auth";
import { arrayUnion, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, onSnapshot, setDoc, SetOptions, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { describe, assert, test, expect } from "vitest";
import { unregisterUser, registerUser, fireStorage, fireStore } from "../firebase";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

// admin@mail.com | thisisadmin1 | QrQPMb4LvsdzxY0yq9dAcgljDai2
describe("firebase.test", () => {
    test.skip("upload an image to the database", async () => {
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

    test.skip("inserting and array into firebase", async () => {
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



    // admin@mail.com | thisisadmin1 | QrQPMb4LvsdzxY0yq9dAcgljDai2
    const admin: Profile = {
        uid: "QrQPMb4LvsdzxY0yq9dAcgljDai2",
        rating: 5,
    };

    test.skip("add two products to admins's collection", async () => {
        const apple: Product = { uid: randomUUID(), title: "Apple", quantity: 1 };
        let ok = await appendUserProduct(admin, apple);
        expect(ok).toBe(true);

        // add another item
        const orange: Product = { uid: randomUUID(), title: "Orange", quantity: 2 };
        ok = await appendUserProduct(admin, orange);
        expect(ok).toBe(true);
    });

    test.skip("remove a product from the collection", async () => {
        const productId = "2777074d-3626-4a7f-b2f8-a53178da7f2e";
        let ok = await removeUserProduct(admin, productId);
        expect(ok).toBe(true);
    });

    test("get a product from the collection", async () => {
        const validId = "841d9fea-a65a-40c7-a155-7d20163a5ac9";
        let product = await selectUserProduct(admin, validId);
        expect(product).not.toBeInstanceOf(Error);

        const invalidId = "841d9fea-a65a-40c7-a155-7d20163a5ac";
        product = await selectUserProduct(admin, invalidId);
        expect(product).toBeInstanceOf(Error);

        const products = await selectUserProductMany(admin);
        expect(products).toBeInstanceOf(Array);
        expect((products as DocumentData[]).length).toBe(2);
    });
});

type Profile = Pick<User, "uid"> & {
    dietaryRequirements?: string[];
    rating: number;
};

type Product = {
    uid: string;
    title: string;
    quantity: number;
};

export async function appendUserProduct({ uid }: Profile, product: Product): Promise<true | Error> {
    const docRef = doc(fireStore, `users/${uid}/products/${product.uid}`);
    try {
        let _ = await setDoc(docRef, product);
        return true;
    } catch (error) {
        return error as Error;
    }
}

export async function removeUserProduct({ uid }: Profile, productId: string): Promise<true | Error> {
    const docRef = doc(fireStore, `users/${uid}/products/${productId}`);
    try {
        let _ = await deleteDoc(docRef);
        return true;
    } catch (error) {
        return error as Error;
    }
}

export async function selectUserProduct({ uid }: Profile, productId: string): Promise<DocumentData | Error> {
    const docRef = doc(fireStore, `users/${uid}/products/${productId}`);
    try {
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return Error(`user ${uid} does not have a product with id ${productId}`);
        return docSnap.data();
    } catch (error) {
        return error as Error;
    }
}

export async function selectUserProductMany({ uid }: Profile): Promise<DocumentData[] | Error> {
    const colRef = collection(fireStore, `users/${uid}/products`);
    try {
        const snap = await getDocs(colRef);
        if (snap.empty) return Error(`user ${uid} has no documents in the collection`);
        return snap.docs.map(doc => doc.data());
    } catch (error) {
        return error as Error;
    }
}