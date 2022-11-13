import { signal, useSignal } from "@preact/signals";
import { User } from "firebase/auth";
import { collection, onSnapshot, DocumentData, doc, setDoc, deleteDoc, getDoc, getDocs } from "firebase/firestore";
import { fireStore } from ".";

export type Profile = Pick<User, "uid"> & {
    dietaryRequirements?: string[];
    rating: number;
};

export type Product = {
    uid: string;
    title: string;
    quantity: number;
    thumbnailUrl?: string;
};

// admin@mail.com | thisisadmin1 | QrQPMb4LvsdzxY0yq9dAcgljDai2

const ADMIN_UID = "QrQPMb4LvsdzxY0yq9dAcgljDai2";

export const newRepo = (...init: Product[]) => {

    const sig = signal<Product[]>(init);
    // const sig = useSignal<Product[]>(init);
    let flag = true;

    const colRef = collection(fireStore, `users/${ADMIN_UID}/products`);
    onSnapshot(colRef, next => {
        const data = next.docs.map(doc => doc.data());
        sig.value = [...data as Product[]];
    });


    const proxy = new Proxy(sig, {
        set(target, p, newValue, receiver) {
            console.trace("set", p, newValue, newValue.at(-1));
            (async () => {
                const res = await appendUserProduct({ uid: ADMIN_UID }, newValue.at(-1) as Product);
                if (res instanceof Error) {
                    throw res;
                }
            })();

            // target.value = newValue;
            return Reflect.get(target, p, receiver);
        },
        get(target, p, receiver) {
            if (flag) {
                (async () => {
                })();
                console.log(flag, p, receiver);
                flag = !flag;
            }
            // console.trace("get", target.value, p, receiver);
            return target.value;
        }
    });

    return proxy;
};

export async function appendUserProduct({ uid }: { uid: string; }, product: Product): Promise<true | Error> {
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