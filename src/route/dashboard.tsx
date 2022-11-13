// NOTE these are just for examples
// NOTE app starts here
import { Product } from "../firebase/product";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { fireStorage, fireStore } from "../firebase";
import React, { FormEvent, Ref } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ProductSubmitForm from "../component/ProductSubmitForm";
import ProductCard from "../component/ProductCard";

// useSignal includes useMemo under the hood

const ADMIN_UID = "QrQPMb4LvsdzxY0yq9dAcgljDai2";

const useDashboard = () => {
    const products = useSignal<Product[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const productCollectionRef = collection(fireStore, `users/${ADMIN_UID}/products`);
        onSnapshot(productCollectionRef, next => {
            products.value = next.docs.map(doc => doc.data()) as Product[]; //ok
        });
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [title, quantity, thumbnail] = [...new FormData(formRef.current!).values()];

        if (!title.toString().trim()) {
            console.error("empty text field");
            return;
        }

        const product: Product = {
            // randomly generated
            uid: crypto.randomUUID(),
            // cannot start with whitespace
            title: `${title}`.trim(),
            // defaults to 1
            quantity: +quantity,
        };

        // TODO: make file optional
        const file = thumbnail as File;
        createImageBitmap(file, {

            resizeQuality: "high"
        });

        // // TODO compress image so that it is noot huge
        // // https://img.ly/blog/how-to-compress-an-image-before-uploading-it-in-javascript/
        // const fileRef = ref(fireStorage, `image/${ADMIN_UID}/products/${product.uid}`);
        // const result = await uploadBytes(fileRef, file, { contentType: file.type });
        // const thumbnailUrl = await getDownloadURL(result.ref);

        // const docRef = doc(fireStore, `users/${ADMIN_UID}/products/${product.uid}`);
        // const _ = await setDoc(docRef, { ...product, thumbnailUrl });
    };

    return { formRef, handleSubmit, products };
};

export default function Page() {
    const { formRef, handleSubmit, products } = useDashboard();

    return (
        <div>
            <h1>Upload a product</h1>
            <br />

            <ProductSubmitForm form={formRef} onSubmit={handleSubmit} />
            <br />

            {products.value.map(product => (<div key={product.uid}>
                <ProductCard product={product} />
            </div>))}
        </div>
    );
}

function compress;