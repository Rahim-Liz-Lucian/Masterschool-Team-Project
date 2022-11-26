"use strict";

import { useSignal } from "@preact/signals";
import { DocumentData, Firestore, DocumentReference, onSnapshot, CollectionReference, collection, getDoc, QuerySnapshot, collectionGroup } from "firebase/firestore";
import { useCallback, useMemo, useEffect, useState } from "preact/hooks";
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

    // convert to a useSignal
    const data = useSignal<T[]>([]);
    const error = useSignal<Error | null>(null);
    // make this read-only
    const pending = useSignal(true); // data === undefined

    useEffect(() => {
        pending.value = true;
        return onSnapshot(memoRef, next => {
            pending.value = false;
            error.value = null;
            data.value = next.docs.map(doc => doc.data());
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

export const useFirebaseProducts = (props?: { query?: string; }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        return onSnapshot(collectionGroup(fireStore, `products`), async (next: QuerySnapshot<DocumentData>) => {
            const res = await Promise.all(next.docs.map(async doc => {
                const { createdAt, expirationDate, ...product } = doc.data();
                // FIXME making an assumption that this needs to exist
                const user = await getDoc((doc.ref.parent.parent)!);
                // type casting
                return { ...(product as Product), uid: doc.id, createdAt: createdAt.toDate() as Date, expirationDate: expirationDate.toDate() as Date, user: user.data() as User };
            }));
            // run query here

            setProducts(res);
            setLoading(false);
        }, fireError => {
            setError(fireError);
            setLoading(false);
        });
    }, []);

    return { products, loading, error };
};

type User = {
    displayName: string;
    email?: string;
    photoURL?: string;
    phoneNumber?: string;
    location: {
        city: string;
    };
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

