import { computed, useComputed, useSignal } from "@preact/signals";
import { doc, DocumentData, DocumentReference, Firestore, getDoc, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { Link } from "wouter-preact";
import { fireStore, userSignal } from "../../firebase";

function useFireStoreUserData<T = DocumentData>(fn: (db: Firestore) => DocumentReference<T>, idField?: string, deps?: any[]) {

    const memoFn = useCallback(fn, []);

    const memoRef = useMemo(() => fn(fireStore), [memoFn, fireStore].concat(deps || []));

    // convert to a useSignal
    const sig = useSignal<T | undefined>(undefined);
    useEffect(() => {
        return onSnapshot(memoRef, next => {
            // const tmp = next.data();
            // //@ts-ignore
            // tmp[idField] = next.id;
            // sig.value = tmp;
            // NOTE this is 
            sig.value = next.data();
        });
    }, [memoRef, idField]);

    let error = null;
    let pending = null;
    return [sig.value];
}

// In a script called data or something
class Meta {
    constructor(readonly name: string, readonly username: string) { }

    toString(): string {
        return `Welcome back, ${this.name}!`;
    }
}

const metaConverter = {
    toFirestore(meta: Meta): DocumentData {
        return { title: meta.name, author: meta.username };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot
    ): Meta {
        const data = snapshot.data();
        return new Meta(data.name, data.username);
    }
};

export default function Page() {
    const flip = useSignal(true);

    // does not require `useComputed`
    const GLOBAL_UID = [
        `24oAu5IAeTa8y7LV508beL6GQJZ2`,
        `WEerR23nz3ZPaqcy0ze66mVxOCx1`
    ][Number(flip.value)];

    const [userMeta, error, pending] = useFireStoreUserData(store => {
        return doc(store, `users/${GLOBAL_UID}`).withConverter(metaConverter);
    }, "id", [flip.value]);



    return (
        <div>
            {userMeta && <h1>{userMeta.toString()}</h1>}
            {userMeta && <p>{userMeta.name}</p>}
            {userMeta && <p>{userMeta.username}</p>}
            <button onClick={_ => flip.value = !flip.value}>Click me</button>
        </div>

    );


    // NOTE pop-in as first render will always be undefined
    // if (!user) return (
    //     <div>
    //         This is the home page
    //         <Link href="/sign-in">Sign In?</Link>
    //         <Link href="/sign-up">Sign Up?</Link>
    //     </div>
    // );

    // return (
    //     <div>
    //         This is the home page
    //         <Link href="/dashboard">Goto Dashboard</Link>
    //     </div>
    // );
}

