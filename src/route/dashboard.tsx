// NOTE these are just for examples
// NOTE app starts here
import { PersonalInformation, ProductData } from "../firebase";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { fireAuth, fireStorage, fireStore, userSignal } from "../firebase";
import { FormEvent } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ProductSubmitForm from "../component/ProductSubmitForm";
import ProductCard from "../component/ProductCard";
import Compressor from 'compressorjs';
import { signOut } from "firebase/auth";
import { Redirect, useLocation } from "wouter-preact";

export default function Page() {
    // TODO this should be split into two
    const { formRef, handleSubmit, handleDelete, products, user, handleSignOut, perInfo } = useDashboard();

    if (!user) return (
        <Redirect to="/" />
    );

    async function handleSearchUsers() {
        const perInfoRef = collection(fireStore, `users`);

        const constraint = where("name", "==", "Kristopher");
        const qry = query(perInfoRef,);

        const snap = await getDocs(qry);
        console.log(snap.docs);
    }


    return (
        <div>
            <h1>Welcome {perInfo.value.name}!</h1>
            <br />

            <button onClick={handleSearchUsers}>Search users</button>

            <button onClick={handleSignOut}>Sign out</button>

            <ProductSubmitForm form={formRef} onSubmit={handleSubmit} />
            <br />

            <div style={{ display: "flex" }}>
                {products.value.map(product => (<div key={product.uid}>
                    <ProductCard product={product} onClick={handleDelete(product)} />
                </div>))}
            </div>
        </div>
    );
}

const useDashboard = () => {
    const products = useSignal<ProductData[]>([]);
    const perInfo = useSignal<Partial<PersonalInformation>>({});

    const formRef = useRef<HTMLFormElement>(null);
    const [, setLocation] = useLocation();

    const user = userSignal.value; // could assume that this is live

    useEffect(() => {
        (async () => {
            const productCollectionRef = collection(fireStore, `users/${user?.uid}/products`);
            const unsub = onSnapshot(productCollectionRef, next => {
                products.value = next.docs.map(doc => doc.data()) as ProductData[]; //ok
            });

            const docRef = doc(fireStore, `users/${user?.uid}`);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                const { name, username } = snap.data();
                perInfo.value = { name, username };
            }
            return unsub;
        })();
    }, []);


    const handleSignOut = async () => {
        await signOut(fireAuth);
        setLocation("/");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // NOTE this is only guaranteed if a bad actor doesn't mess with the Javascript
        const [title, quantity, thumbnail] = [...new FormData(formRef.current!).values()];

        const product: ProductData = {
            // randomly generated uid for each product
            uid: crypto.randomUUID(),
            // cannot start with whitespace, but this is safe guarding
            title: `${title}`.trim(),
            // defaults to 1
            quantity: +quantity,
        };

        // FIXME: make file optional
        const _ = new Compressor(thumbnail as File, {
            // NOTE: maxWidth and maxHeight could be smaller
            quality: 0.6, maxWidth: 1500, maxHeight: 1000, error: (error) => console.error(error),
            async success(file) {
                const fileRef = ref(fireStorage, `image/${user?.uid}/products/${product.uid}`);
                const result = await uploadBytes(fileRef, file, { contentType: file.type });
                const thumbnailUrl = await getDownloadURL(result.ref);

                const docRef = doc(fireStore, `users/${user?.uid}/products/${product.uid}`);
                const _ = await setDoc(docRef, { ...product, thumbnailUrl });
            },
        });
    };

    const handleDelete = (product: ProductData) => {
        const thumbnailRef = ref(fireStorage, `image/${user?.uid}/products/${product.uid}`);
        const productRef = doc(fireStore, `users/${user?.uid}/products/${product.uid}`);
        // NOTE using a higher order function to bypass needing to prop drill
        return async () => {
            Promise.all([deleteObject(thumbnailRef), deleteDoc(productRef)]);
        };
    };

    return { formRef, handleSubmit, handleDelete, products, user, handleSignOut, perInfo };
};