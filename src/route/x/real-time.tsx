import { computed, useComputed, useSignal } from "@preact/signals";
import { collection, CollectionReference, doc, DocumentData, DocumentReference, Firestore, getDoc, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { Link } from "wouter-preact";
import { fireStore, ProductData, userSignal } from "../../firebase";

function useFireStoreDocumentData<T = DocumentData>(fn: (db: Firestore) => DocumentReference<T>, deps?: any[]) {
    const memoFn = useCallback(fn, []);
    const memoRef = useMemo(() => fn(fireStore), [memoFn, fireStore].concat(deps || []));

    // convert to a useSignal
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

function useFireStoreCollectionData<T = DocumentData>(fn: (db: Firestore) => CollectionReference<T>, deps?: any[]) {
    const memoFn = useCallback(fn, []);
    const memoRef = useMemo(() => fn(fireStore), [memoFn, fireStore].concat(deps || []));

    // convert to a useSignal
    const data = useSignal<T[]>([]);
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

// In a script called data or something

type UserData = DocumentData | {
    name: string;
    username: string;
};



export default function Page() {
    const flip = useSignal(true);
    const uid = flip.value ? `24oAu5IAeTa8y7LV508beL6GQJZ2` : `WEerR23nz3ZPaqcy0ze66mVxOCx1`;

    return (
        <div>
            <UserDataCard uid={uid} />
            <button onClick={_ => flip.value = !flip.value}>Click me</button>
        </div>
    );
}

function UserDataCard({ uid }: { uid: string; }) {
    // TODO find a way to say if pending false then data has to exist
    // this may be impossible but worth searching for

    const [user, error, pending] = useFireStoreDocumentData<UserData>(store => {
        return doc(store, `users/${uid}`);
    }, [uid]);

    const [products, _error, _pending] = useFireStoreCollectionData<ProductData>(store => {
        return collection(store, `users/${uid}/products`);
    });

    // console.log(meta, error, pending);
    // if (pending) return (
    //     <div>Loading...</div>
    // );

    return (
        <div>
            {user && <h1>Welcome {user.name}!</h1>}
            {user && <p>{user.username}</p>}

            <div style={{ display: "flex" }}>
                {products.map(product => (<div key={product.uid}>
                    <ProductCard product={product} />
                </div>))}
            </div>
        </div>
    );
}



function ProductCard({ product }: { product: ProductData; }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h3>Title {product.title}</h3>

            <p>Quantity {product.quantity}</p>

            <img src={product.thumbnailUrl} alt={product.uid} width={100} />

            <button disabled>Query</button>
        </div>
    );
}