import { useSignal } from "@preact/signals";
import { DocumentData, Firestore, DocumentReference, onSnapshot, CollectionReference } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { useCallback, useMemo, useEffect } from "preact/hooks";
import { fireStore } from ".";
import { authCtx, authLoading } from "./data";

export const useFirebaseAuth = () => {
    return [authCtx.value, authLoading.value] as const;
};

export function useFirebaseDocumentData<T = DocumentData>(query: (db: Firestore) => DocumentReference<T>, deps?: any[]) {
    const memoFn = useCallback(query, []);
    const memoRef = useMemo(() => query(fireStore), [memoFn, fireStore].concat(deps || []));

    const data = useSignal<T | undefined>(undefined);
    const error = useSignal<Error | null>(null);
    // make this read-only
    const pending = useSignal(true);

    useEffect(() => {
        pending.value = true;
        return onSnapshot(memoRef, next => {
            // NOTE may not be required anymore
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

export function useFirebaseCollectionData<T = DocumentData>(query: (db: Firestore) => CollectionReference<T>, deps?: any[]) {
    const memoFn = useCallback(query, []);
    const memoRef = useMemo(() => query(fireStore), [memoFn, fireStore].concat(deps || []));

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

export function useFirebaseStorageUrl(query: (db: FirebaseStorage) => unknown, file: File) {
    /*
    const fileRef = ref(fireStorage, `image/${user?.uid}/products/${product.uid}`);
    const result = await uploadBytes(fileRef, file, { contentType: file.type });
    const thumbnailUrl = await getDownloadURL(result.ref);
    */


    return [];
}