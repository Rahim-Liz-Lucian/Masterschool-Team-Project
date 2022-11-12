// FIXME loading an image and documents from collection needs cleaning up
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "preact/hooks";
import { Redirect } from "wouter-preact";
import { fireStorage, fireStore } from "../firebase";
import { useDashboard } from "../hook";
// components
import ProductCard from "../component/ProductCard";
import ProductUploadForm from "../component/ProductUploadForm";

// utils

async function getProductsDocument(u) {
    if (!u) return;
    const docRef = doc(fireStore, "product", u.uid);
    const snapShot = await getDoc(docRef);
    // NOTE `snapShot.get` to get a single field from the document 
    // FIXME if error then return error to user
    return snapShot.data();
}

async function appendProductsDocument({ uid, product }) {
    const docRef = doc(fireStore, "product", uid);
    const entry = { ...product, id: crypto.randomUUID() };
    await setDoc(docRef, { product: arrayUnion(entry) }, { merge: true });
    // FIXME if error then return error to user
    return entry;
}

// utils

export default function Page() {
    const { handleSignOut, user } = useDashboard();
    const formRef = useRef();
    const imgRef = useRef();


    // NOTE this must behave like a type guard
    if (!user.value) return (
        <Redirect to="/" />
    );

    const [products, setProducts] = useState([]);


    async function handleProductUpload(e) {
        e.preventDefault();
        console.log(formRef.current);

        const [title, description, dateString] = new FormData(formRef.current).values();
        // TODO error handling of input fields
        const item = await appendProductsDocument({ uid: user.value.uid, product: { title, description, dateString } });
        console.log(`added new item with id: ${item.id}`);
        setProducts([...products, item]);
    }

    // TODO loading state while data is being fetched from fireBase
    // NOTE look into caching

    useEffect(() => {
        (async () => {
            const data = await getProductsDocument(user.value); // TODO there is an assumption that this value exists
            setProducts(data.product);
        })();
    }, []);

    // not required
    useEffect(() => {
        (async () => {
            // this is getting the data from 
            const fileRef = ref(fireStorage, `image/${user.value.uid}/test-photo.jpg`);
            const url = await getDownloadURL(fileRef);
            imgRef.current.setAttribute('src', url);
        })();
    }, []);

    // TODO check why I can't use `ref` and have to define a variable called `form`

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h3>Current user logged in</h3>
                <p>Uid: {user.peek().uid}</p>
                <p>Email: {user.peek().email}</p>
            </div>



            <div>
                Upload a new product
                <ProductUploadForm form={formRef} onSubmit={handleProductUpload} />
            </div>

            <div>
                <img
                    ref={imgRef}
                    width={100}
                    alt="" />

                {products.map(product => (
                    <div key={product.id}><ProductCard product={product} /></div>
                ))}
            </div>

            <button onClick={handleSignOut}>
                Log out
            </button>
        </div>
    );
}

// list of tags could be handled with: https://www.w3schools.com/tags/att_input_list.asp
// https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd