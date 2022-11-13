// NOTE these are just for examples
// NOTE app starts here
import { Product } from "../firebase/product";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { fireStorage, fireStore } from "../firebase";
import React, { FormEvent, Ref } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// useSignal includes useMemo under the hood

const ADMIN_UID = "QrQPMb4LvsdzxY0yq9dAcgljDai2";

export default function Page() {
    const products = useSignal<Product[]>([]);

    useEffect(() => {
        const productCollectionRef = collection(fireStore, `users/${ADMIN_UID}/products`);
        onSnapshot(productCollectionRef, next => {
            products.value = next.docs.map(doc => doc.data()) as Product[];
        });
    }, []);


    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [title, quantity, thumbnail] = [...new FormData(formRef.current!).values()];
        const file = thumbnail as File;

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

        const fileRef = ref(fireStorage, `image/${ADMIN_UID}/products/${product.uid}`);
        const result = await uploadBytes(fileRef, file, { contentType: file.type });
        const thumbnailUrl = await getDownloadURL(result.ref);

        const docRef = doc(fireStore, `users/${ADMIN_UID}/products/${product.uid}`);
        const _ = await setDoc(docRef, { ...product, thumbnailUrl });
    };

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

function ProductSubmitForm(props: React.HTMLAttributes<HTMLFormElement> & { form: Ref<HTMLFormElement>; }) {
    return (
        <form {...props} ref={props.form} >
            <label htmlFor="title">
                <span>Title</span>
                {/* prevent titles that start with white spaces */}
                <input required pattern="^[\S+]+[\S\s]+" type="text" name="title" id="title" />
            </label>
            <label htmlFor="Quantity">
                <span>Quantity</span>
                {/* value must be greater than 1 */}
                <input defaultValue={1} type="number" min={1} name="quantity" id="quantity" />
            </label>

            <label htmlFor="image">
                <span>Image</span>
                <input type="file" id="thumbnail" name="thumbnail" accept="image/png, image/jpeg"></input>
            </label>
            <button>Submit</button>
        </form>
    );
}

function ProductCard({ product }: { product: Product; }) {
    return (
        <div>
            Title {product.title}
            <br />

            Quantity {product.quantity}
            <br />

            <img src={product.thumbnailUrl} alt={product.uid} />
            <br />
        </div>
    );
}

async function appendUserProduct({ uid }: { uid: string; }, product: Product) {
    const docRef = doc(fireStore, `users/${uid}/products/${product.uid}`);
    try {
        const _ = await setDoc(docRef, product);
        return true;
    } catch (error) {
        // TODO error handling
        return false;
    }
}; 