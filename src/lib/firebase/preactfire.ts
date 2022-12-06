"use strict";

import { useSignal } from "@preact/signals";
import { DocumentData, Firestore, DocumentReference, onSnapshot, CollectionReference, collection, getDoc, QuerySnapshot, collectionGroup, QueryDocumentSnapshot } from "firebase/firestore";
import { useSyncExternalStore } from "preact/compat";
import { useCallback, useMemo, useEffect, useState, useRef } from "preact/hooks";
import { fireStore } from "./firebase";

export function useFirebaseDocument<T = DocumentData>(query: (db: Firestore) => DocumentReference<T>, deps?: any[]) {
    const memoFn = useCallback(query, []);
    const memoRef = useMemo(() => query(fireStore), [memoFn, fireStore].concat(deps || []));

    const data = useSignal<T | undefined>(undefined);
    const error = useSignal<Error | null>(null);
    // make this read-only
    const _loading = useSignal(true);

    useEffect(() => {
        _loading.value = true;
        return onSnapshot(memoRef, next => {
            _loading.value = false;
            error.value = null;
            data.value = next.data();
        }, e => {
            if (e == null) return; // will link to the video later

            _loading.value = false;
            error.value = e;
            // data.value = undefined;
        });
    }, [memoRef]);

    // let pending = null;
    return [data.value, error.value, _loading.value] as const;
}

export function useFirebaseCollection<T = DocumentData>(query: (db: Firestore) => CollectionReference<T>, map?: () => void, deps?: any[]) {
    const memoQuery = useCallback(query, []);
    const memoRef = useMemo(() => query(fireStore), [memoQuery, fireStore].concat(deps || []));

    const data = useSignal<T[]>([]);
    const error = useSignal<Error | null>(null);
    const _loading = useRef(true);

    useEffect(() => {
        return onSnapshot(memoRef, next => {
            data.value = next.docs.map(doc => doc.data());
            _loading.current = false;
        }, fireError => {
            if (fireError == null) return; // will link to the video later

            error.value = fireError;
            _loading.current = false;
        });
    }, [memoRef]);

    return [data.value, error.value, _loading.current] as const;
}


export const useFirebaseProducts = () => {
    const [data, setData] = useState<{ product: Product, user: User; }[]>([]);
    const [error, setError] = useState<Error>();
    const _loading = useRef(true);

    useEffect(() => {
        return onSnapshot(collectionGroup(fireStore, `products`), async (next: QuerySnapshot<DocumentData>) => {
            const res = await Promise.all(next.docs.map(parseDoc));
            setData(res);
            _loading.current = false;
        }, fireError => {
            setError(fireError);
            _loading.current = false;
        });
    }, []);

    return { data, isLoading: _loading.current, error };
};

export const useFirebaseProductByID = (id: string) => {
    const [data, setData] = useState<{ product: Product, user: User; }>();
    const [error, setError] = useState<Error>();
    const _loading = useRef(true);

    useEffect(() => {
        return onSnapshot(collectionGroup(fireStore, `products`), async (next: QuerySnapshot<DocumentData>) => {
            const [res] = await Promise.all((next.docs.filter(doc => doc.id === id)).map(parseDoc));
            setData(res);
            _loading.current = false;
        }, fireError => {
            setError(fireError);
            _loading.current = false;
        });
    }, []);

    return { data, isLoading: _loading.current, error };
};

const parseDoc = async (doc: QueryDocumentSnapshot<DocumentData>) => {
    const { createdAt, expirationDate, ...productDoc } = doc.data();
    // NOTE making an assumption that this needs to exist
    const userDoc = await getDoc((doc.ref.parent.parent)!);

    // NOTE type casting
    const product: Product = {
        ...productDoc as Product,
        uid: doc.id,
        createdAt: createdAt.toDate(),
        expirationDate: expirationDate.toDate(),
    };

    const user: User = { ...userDoc.data() as User, uid: userDoc.id };

    return { product, user };
};

export type User = {
    uid: string;
    displayName: string;
    email?: string;
    photoURL?: string;
    phoneNumber?: string;
    location: {
        city: string;
    };
    rating: number;
};

export type Product = {
    uid: string;
    title: string;
    description?: string;
    thumbnailURL: string;
    expirationDate: Date;
    createdAt: Date;
    user: User;
};

