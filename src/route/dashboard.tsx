// NOTE these are just for examples
// NOTE app starts here
import { UserData, ProductData } from "../firebase/data";
import { Ref, useRef } from "preact/hooks";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { fireAuth, fireStorage, fireStore } from "../firebase";
import { FormEvent } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ProductSubmitForm from "../component/ProductSubmitForm";
import ProductCard from "../component/ProductCard";
import Compressor from 'compressorjs';
import { signOut, User } from "firebase/auth";
import { useLocation } from "wouter-preact";
import { useFirebaseAuthData, useFirebaseCollectionData, useFirebaseDocumentData } from "../firebase/hook";

const use = ({ user, formRef }: { user: User | null; formRef: Ref<HTMLFormElement>; }) => {
    const [metaData, , pendingMetaData] = useFirebaseDocumentData<UserData>(store => {
        return doc(store, `users/${user?.uid}`);
    }, [user]);

    const [productData, , pendingProductsData] = useFirebaseCollectionData<ProductData>(store => {
        return collection(store, `users/${user?.uid}/products`);
    }, [user]);

    // NOTE acts as a controller
    const products = {
        data: productData,
        create(e: FormEvent<HTMLFormElement>) {
            // TODO change API to set this by default
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
        },
        update(product: ProductData) {
            return async () => {
                console.log(product);
            };
        },
        delete(product: ProductData) {
            const pathname = `${user?.uid}/products/${product.uid}`;

            const objRef = ref(fireStorage, `image/${pathname}`);
            const docRef = doc(fireStore, `users/${pathname}`);

            // NOTE using a higher order function to bypass needing to prop drill
            return async () => {
                Promise.all([deleteObject(objRef), deleteDoc(docRef)]);
            };
        }
    };

    return { done: !(pendingMetaData || pendingProductsData), meta: metaData, products };
};

// ProfileData

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);

    const [, setLocation] = useLocation();
    const [user,] = useFirebaseAuthData();

    const { done, meta, products } = use({ user, formRef });

    const handleSignOut = async () => {
        await signOut(fireAuth);
        setLocation("/");
    };

    return done ? (
        <div>
            <h1>Hello {meta?.name ?? "World"}!</h1>

            <button onClick={handleSignOut}>Sign out</button>

            <ProductSubmitForm form={formRef} onSubmit={products.create} />

            <div style={{ display: "flex" }}>
                {products.data.map(product => (<div key={product.uid}>
                    <ProductCard product={product} onClick={products.delete(product)} />
                </div>))}
            </div>
        </div>
    ) : <div>Loading...</div>;
}
