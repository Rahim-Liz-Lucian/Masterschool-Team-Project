import "./upload.css";
import Compressor from "compressorjs";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "preact/hooks";
import ErrorMessage from "../component/base/ErrorMessage";
import { uploadFile, uploadProduct } from "../firebase/functions";
import { useFirebaseCollectionData } from "../firebase/hooks";
import { useError } from "../utils/hooks";

import { useFireBaseAuth } from "~/firebase/data";
import { Input } from "~/component/base/input";
import Button, { BackButton } from "~/component/base/button";
import { Redirect } from "wouter-preact";

export default function Page() {
    const user = useFireBaseAuth();
    const [formData, setFormData] = useState({});
    const { onUpload, products, dataLoading, error, resetError } = useHook({ user, formData });

    if (dataLoading) return <div>Loading...</div>;

    if (!user) return <Redirect to="/sign-in" />;

    if (error) return (
        <div>
            <BackButton />
            <ErrorMessage {...{ error, resetError }} />
        </div>
    );

    return (
        <div className="page">
            <BackButton />
            <p>I have {products.length} Products in my basket</p>

            <form onSubmit={onUpload}>
                <Input required name="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}>
                    Title
                </Input>

                <Input name="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}>
                    Description
                </Input>

                <Input required name="expirationDate" type="date" value={formData.expirationDate} onChange={e => setFormData({ ...formData, expirationDate: e.target.value })}>
                    Expiration Date
                </Input>

                {/* TODO show preview of image upload */}
                <Input required type="file" accept="image/jpeg" name="photo" value={formData.thumbnail} onChange={e => setFormData({ ...formData, photo: e.target.files[0] })} >
                    Upload Image
                </Input>

                <Button className="btn btn-primary" type="submit">Upload</Button>
            </form>
        </div>
    );
}

const useHook = ({ auth: user }) => {
    const { error, setError, resetError } = useError();

    // products
    const [products, productsError, productsLoading] = useFirebaseCollectionData(
        (store) => {
            return collection(store, `users/${user?.uid}/products`);
        },
        [user]
    );

    useEffect(() => {
        productsError && setError(productsError);
    }, [productsError]);

    const onUpload = async ({
        title,
        description,
        expirationDate,
        thumbnail,
    }) => {
        const product = {
            title,
            expirationDate,
            uid: crypto.randomUUID(),
            description: description ?? ``,
        };

        new Compressor(thumbnail, {
            quality: 0.6,
            maxWidth: 1500,
            maxHeight: 1000,
            error(error) {
                setError(error);
            },
            async success(file) {
                try {
                    const thumbnailURL = await uploadFile(
                        file,
                        `users/${user?.uid}/images/products/${product.uid}`
                    );
                    await uploadProduct(user, { ...product, thumbnailURL });
                    alert(`Product has been uploaded 💚`);
                } catch (error) {
                    setError(error);
                }
            },
        });
    };

    return {
        error,
        resetError,
        onUpload,
        products,
        dataLoading: productsLoading,
    };
};

function ProductUploadForm({ onUpload }) {
    const [product, setProduct] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();

        onUpload(product);
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="title">
                <span>Title</span>
                <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                />
            </label>

            <label htmlFor="description">
                <span>Description</span>
                <input
                    type="text"
                    name="description"
                    id="description"
                    onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                    }
                />
            </label>

            <label htmlFor="expirationDate">
                <span>Expiration Date</span>
                <input
                    required
                    type="date"
                    name="expirationDate"
                    id="expirationDate"
                    onChange={(e) =>
                        setProduct({ ...product, expirationDate: e.target.value })
                    }
                />
            </label>

            <label htmlFor="thumbnail">
                <input
                    required
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    onChange={(e) =>
                        setProduct({ ...product, thumbnail: e.target.files[0] })
                    }
                />
            </label>
            <Button classes="btn btn-primary">Upload Product</Button>
            {/* <button type="submit">Upload product</button> */}
        </form>
    );
}
