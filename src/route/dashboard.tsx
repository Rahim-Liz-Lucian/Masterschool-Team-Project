// NOTE these are just for examples
// NOTE app starts here
import { Product } from "../firebase";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { fireAuth, fireStorage, fireStore, userSignal } from "../firebase";
import { FormEvent } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ProductSubmitForm from "../component/ProductSubmitForm";
import ProductCard from "../component/ProductCard";
import Compressor from 'compressorjs';
import { signOut } from "firebase/auth";
import { Redirect, useLocation } from "wouter-preact";

export default function Page() {
    const { formRef, handleSubmit, handleDelete, products, user, handleSignOut } = useDashboard();

    if (!user) return (
        <Redirect to="/" />
    );

    return (
        <div>
            <h1>Upload a product</h1>
            <br />

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
    const products = useSignal<Product[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const [, setLocation] = useLocation();

    const user = userSignal.peek();

    useEffect(() => {
        const productCollectionRef = collection(fireStore, `users/${user?.uid}/products`);
        onSnapshot(productCollectionRef, next => {
            products.value = next.docs.map(doc => doc.data()) as Product[]; //ok
        });
    }, []);

    const handleSignOut = async () => {
        await signOut(fireAuth);
        setLocation("/");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // NOTE this is only guaranteed if a bad actor doesn't mess with the Javascript
        const [title, quantity, thumbnail] = [...new FormData(formRef.current!).values()];

        const product: Product = {
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

    const handleDelete = (product: Product) => {
        const thumbnailRef = ref(fireStorage, `image/${user?.uid}/products/${product.uid}`);
        const productRef = doc(fireStore, `users/${user?.uid}/products/${product.uid}`);
        // NOTE using a higher order function to bypass needing to prop drill
        return async () => {
            Promise.all([deleteObject(thumbnailRef), deleteDoc(productRef)]);
        };
    };

    return { formRef, handleSubmit, handleDelete, products, user, handleSignOut };
};