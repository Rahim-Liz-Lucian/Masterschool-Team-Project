"use strict";

import { useSignal } from "@preact/signals";
import { DocumentData, Firestore, DocumentReference, onSnapshot, CollectionReference, collection, getDoc, QuerySnapshot, collectionGroup } from "firebase/firestore";
import { useCallback, useMemo, useEffect, useState, useRef } from "preact/hooks";
import { fireStore } from "./firebase";

export function useFirebaseDocument<T = DocumentData>(query: (db: Firestore) => DocumentReference<T>, deps?: any[]) {
    const memoFn = useCallback(query, []);
    const memoRef = useMemo(() => query(fireStore), [memoFn, fireStore].concat(deps || []));

    const data = useSignal<T | undefined>(undefined);
    const error = useSignal<Error | null>(null);
    // make this read-only
    const pending = useSignal(true);

    useEffect(() => {
        pending.value = true;
        return onSnapshot(memoRef, next => {
            // NOTE may not be required any more
            // const tmp = next.data();
            // //@ts-ignore
            // tmp[idField] = next.id;
            // sig.value = tmp;
            pending.value = false;
            error.value = null;
            data.value = next.data();
        }, e => {
            if (e == null) return; // will link to the video later

            pending.value = false;
            error.value = e;
            // data.value = undefined;
        });
    }, [memoRef]);

    // let pending = null;
    return [data.value, error.value, pending.value] as const;
}

export function useFirebaseCollection<T = DocumentData>(query: (db: Firestore) => CollectionReference<T>, map?: () => void, deps?: any[]) {
    const memoQuery = useCallback(query, []);
    const memoRef = useMemo(() => query(fireStore), [memoQuery, fireStore].concat(deps || []));

    const data = useSignal<T[]>([]);
    const error = useSignal<Error | null>(null);
    const loading = useRef(true);

    useEffect(() => {
        return onSnapshot(memoRef, next => {
            data.value = next.docs.map(doc => doc.data());
            loading.current = false;
        }, fireError => {
            if (fireError == null) return; // will link to the video later

            error.value = fireError;
            loading.current = false;
        });
    }, [memoRef]);

    return [data.value, error.value, loading.current] as const;
}

export const useFirebaseProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<Error>();
    // NOTE this doesn't need to be state as its dependant on the above.
    const loading = useRef(true);

    useEffect(() => {
        return onSnapshot(collectionGroup(fireStore, `products`), async (next: QuerySnapshot<DocumentData>) => {
            const res = await Promise.all(next.docs.map(async doc => {
                const { createdAt, expirationDate, ...product } = doc.data();
                // FIXME making an assumption that this needs to exist
                const user = await getDoc((doc.ref.parent.parent)!);
                // NOTE type casting
                return { ...(product as Product), uid: doc.id, createdAt: createdAt.toDate() as Date, expirationDate: expirationDate.toDate() as Date, user: user.data() as User };
            }));
            setProducts(res);
            loading.current = false;
        }, fireError => {
            setError(fireError);
            loading.current = false;
        });
    }, []);

    return { products, loading: loading.current, error };
};

export const useFirebaseProductByID = (id: string) => {
    const [product, setProduct] = useState<Product>();
    const [error, setError] = useState<Error>();
    const loading = useRef(true);

    useEffect(() => {
        return onSnapshot(collectionGroup(fireStore, `products`), async (next: QuerySnapshot<DocumentData>) => {
            const [res] = await Promise.all((next.docs.filter(doc => doc.id === id)).map(async doc => {
                const { createdAt, expirationDate, ...product } = doc.data();
                // FIXME making an assumption that this needs to exist
                const user = await getDoc((doc.ref.parent.parent)!);
                // type casting
                return { ...(product as Product), uid: doc.id, createdAt: createdAt.toDate() as Date, expirationDate: expirationDate.toDate() as Date, user: user.data() as User };
            }));

            setProduct(res);
            // setLoading(false);
            loading.current = false;
        }, fireError => {
            setError(fireError);
            // setLoading(false);
            loading.current = false;
        });
    }, []);

    return { product, loading: loading.current, error };
};

// NOTE this should really be parsed as User with Products[] field

type User = {
    displayName: string;
    email?: string;
    photoURL?: string;
    phoneNumber?: string;
    location: {
        city: string;
    };
    rating: number;
};

type Product = {
    uid: string;
    title: string;
    description?: string;
    thumbnailURL: string;
    expirationDate: Date;
    createdAt: Date;
    user: User;
};

