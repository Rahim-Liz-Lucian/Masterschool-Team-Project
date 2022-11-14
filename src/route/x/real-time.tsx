import { useSignal } from "@preact/signals";
import Compressor from "compressorjs";
import { collection, doc, DocumentData } from "firebase/firestore";
import { ref } from "firebase/storage";
import { useRef, useState } from "preact/hooks";
import { ProductData, UserData } from "../../firebase/data";
import { useFirebaseDocumentData, useFirebaseCollectionData, useFirebaseStorageUrl } from "../../firebase/hook";

// In a script called data or something


export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);
    const flip = useSignal(true);
    const uid = flip.value ? `24oAu5IAeTa8y7LV508beL6GQJZ2` : `WEerR23nz3ZPaqcy0ze66mVxOCx1`;

    const [loadedFile, setLoadedFile] = useState<File>();

    const productUid = ``;

    const [] = useFirebaseStorageUrl(storage => {
        return ref(storage, `image/${uid}/products/${productUid}`);
    }, loadedFile!);

    const handleUpload: React.FormEventHandler<HTMLFormElement> = async (e) => {
        const formData = new FormData(formRef.current!);
        const [title, quantity, image] = ([...formData.values()]);

        // clean-up setDoc
        console.log(title, quantity, image);
        new Compressor(image as File, {
            quality: 0.6, maxWidth: 1500, maxHeight: 1000,
            async success(imageCpy) {
                console.log(imageCpy);

                const entry: ProductData = {
                    title,
                    quantity: +quantity,
                    thumbnailUrl: `unknown`
                };

                console.log(entry);
            },
        });
    };

    return (
        <div>
            <InformationCard uid={uid} onClick={_ => flip.value = !flip.value} />
            <ProductList uid={uid} />
            <ProductForm form={formRef} onSubmit={handleUpload} />
        </div>
    );
}

function ProductForm({ form, ...props }: Pick<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> & { form: React.Ref<HTMLFormElement>; }) {
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(e);
    };

    return (
        <form {...props} onSubmit={onSubmit} ref={form} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="title">
                <span>Title</span>
                <input required pattern="^[\S+]+[\S\s]+" type="text" name="title" id="title" />
            </label>
            <label htmlFor="Quantity">
                <span>Quantity</span>
                <input defaultValue={1} type="number" min={1} name="quantity" id="quantity" />
            </label>

            <label htmlFor="image">
                <span>Image</span>
                <input required type="file" id="thumbnail" name="thumbnail" accept="image/png, image/jpeg"></input>
            </label>
            <button>Submit</button>
        </form>
    );
}

function InformationCard({ uid, ...props }: { uid: string; } & Pick<React.HTMLAttributes<HTMLElement>, "onClick">) {
    // TODO find a way to say if pending false then data has to exist
    // this may be impossible but worth searching for
    const [user, error, pending] = useFirebaseDocumentData<UserData>(store => {
        return doc(store, `users/${uid}`);
    }, [uid]);


    return (
        <div>
            {user && <h1>Welcome {user.name}!</h1>}
            {user && <p>{user.username}</p>}
            <button onClick={props.onClick}>Switch Account</button>
        </div>
    );
}

function ProductList({ uid }: { uid: string; }) {
    const [products, _error, _pending] = useFirebaseCollectionData<ProductData>(store => {
        return collection(store, `users/${uid}/products`);
    }, [uid]); // NOTE not really required in this instance

    return (
        <div style={{ display: "flex" }}>
            {products.map(product => (<div key={product.uid}>
                <ProductCard product={product} />
            </div>))}
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