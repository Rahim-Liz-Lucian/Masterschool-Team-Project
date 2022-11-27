import { collection } from "firebase/firestore";
import { useState } from "preact/hooks";
import ErrorMessage from "~/component/ErrorMessage";
import { useFirebaseCollection } from "~/firebase";
import { useError } from "~/utils";
import { useFireBaseAuth } from "~/firebase";
import { Redirect } from "wouter-preact";
import { compressFile } from "~/utils";
import { uploadProduct } from "~/firebase/functions";
import { Input, BackButton, Form, Button } from "~/component/core";
import { WasteLessLite } from "~/component/core/icons";
import { Nav, Header } from "~/component/layout";

export default function Page() {
    const user = useFireBaseAuth();

    const minDate = new Date().toLocaleDateString("en-CA");

    const [formData, setFormData] = useState({ expirationDate: minDate });
    const { onUpload, products, loading, error, resetError } = useHook({ user, formData });

    const onChange = (key) => ({ target: { files, value } }) => {
        setFormData({ ...formData, [key]: files ? files[0] : value });
    };

    // FIXME this should not be here
    if (!user) return <Redirect to="/sign-in" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Header>
                <BackButton />
                <h1>Upload</h1>
                <WasteLessLite />
            </Header>

            <main>
                {/* TODO have a basket in top right corner */}
                <p>I have {products.length} Products in my account so far</p>

                <Form id="upload" onSubmit={onUpload}>
                    <Input required name="title" value={formData.title} onChange={onChange("title")}>Title</Input>

                    <Input name="description" value={formData.description} onChange={onChange("description")}>Description</Input>

                    <Input required type="date" name="expirationDate" value={formData.expirationDate} onChange={onChange("expirationDate")} min={minDate}>Expiration Date</Input>

                    {/* FIXME add styling from Liz's branch */}
                    <label htmlFor="thumbnail">
                        <span>Upload Thumbnail</span>
                        <input required type="file" name="thumbnail" id="thumbnail" accept="image/jpeg" value={formData.thumbnail} onChange={onChange("thumbnail")} />
                    </label>

                    <Button className="primary" type="submit" form="upload">Upload</Button>
                </Form>
            </main>

            <aside>
                <Nav user={user} />
            </aside>
        </>
    );
}

const useHook = ({ user, formData }) => {
    const [products, productsError, productsLoading] = useFirebaseCollection((store) => {
        return collection(store, `users/${user?.uid}/products`);
    }, [user]);

    const { error, setError, resetError } = useError(productsError);

    const onUpload = (e) => {
        e.preventDefault();

        const product = {
            title: formData.title,
            description: formData.description ?? "",
            // tags: formData.tags
            expirationDate: new Date(formData.expirationDate),
            createdAt: new Date(),
        };

        compressFile(formData.thumbnail, async (file) => {
            try {
                await uploadProduct(user, { product, file });
                alert(`product has been uploaded 💚`);
            } catch (error) {
                setError(error);
            }
        }, error => setError(error));
    };

    return { error, resetError, onUpload, products, loading: productsLoading, };
};
