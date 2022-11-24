import Compressor from "compressorjs";
import { doc } from "firebase/firestore";
import { useState } from "preact/hooks";
import { Redirect } from "wouter-preact";
import { Nav, } from "~/component/base/base";
import ErrorMessage from "~/component/base/ErrorMessage";
import { fireStore } from "~/firebase";
import { useFireBaseAuth } from "~/firebase/data";
import { uploadFile, uploadProduct } from "~/firebase/functions";
import { useError } from "~/utils/hooks";
import "./upload.css";

export default function Page() {
    const user = useFireBaseAuth();
    const [formData, setFormData] = useState({});
    const { error, resetError, onUpload } = useHook({ user, formData });

    // user.displayName
    // user.email
    // user.phoneNumber
    // user.photoURL
    // user.uid

    if (!user) return <Redirect to="/x/sign-in" />;

    if (error) return (
        <ErrorMessage {...{ error, resetError }} />
    );

    return (
        <section className="page">
            <h1>Add Product</h1>

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

                <button type="submit">Upload</button>
            </form>

            <Nav />
        </section>
    );
}

const useHook = ({ user, formData }) => {
    const { error, setError, resetError } = useError();

    const onUpload = (e) => {
        e.preventDefault();

        const product = {
            uid: crypto.randomUUID(),
            title: formData.title,
            description: formData.description ?? "",
            // tags: formData.tags
            expirationDate: formData.expirationDate,
        };

        // NOTE error must be inside the async function
        compressFile(formData.photo, async (file) => {
            // NOTE error must be inside the async function
            try {
                const thumbnailURL = await uploadFile(file, `users/${user.uid}/products/${product.uid}`);

                const userRef = doc(fireStore, `users/${user.uid}`);

                // NOTE hopefully this gives a reference to the user it belongs to
                await uploadProduct(user, { ...product, thumbnailURL, userRef });

                alert(`product has been uploaded 💚`);
            } catch (error) {
                setError(error);
            }
        }, error => setError(error));
    };

    return { error, resetError, onUpload };
};

/**
 * Throws an error if one occurs
 * 
 * @param {*} file 
 * @param {*} success 
 * @returns 
 */
const compressFile = (file, success, error) => {
    return new Compressor(file, {
        quality: 0.6, maxWidth: 1500, maxHeight: 1000,
        success, error,
    });
};

const Input = ({ name, type = "text", children, ...props }) => {
    return (
        <label htmlFor={name}>
            <span name={name} id={name}>{children}</span>
            <input type={type} name={name} id={name} {...props} />
        </label>
    );
};