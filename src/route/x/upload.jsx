import Compressor from "compressorjs";
import { useState } from "preact/hooks";
import styled from "styled-components";
import { Redirect } from "wouter-preact";
import { Nav, } from "~/component/base/base";
import ErrorMessage from "~/component/base/ErrorMessage";
import { useFireBaseAuth } from "~/firebase/data";
import { uploadFile, uploadProduct } from "~/firebase/functions";
import { useError } from "~/utils/hooks";

export default function Page() {
    const user = useFireBaseAuth();
    const [formData, setFormData] = useState({});
    const { error, resetError, onUpload } = useHook({ user, formData });

    if (!user) return <Redirect to="/x/sign-in" />;

    if (error) return (
        <ErrorMessage {...{ error, resetError }} />
    );

    return (
        <Container>
            <h1>Add Product</h1>

            <Form onSubmit={onUpload}>

                <Input required name="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}>
                    Title
                </Input>

                <Input name="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}>
                    Description
                </Input>

                <Input required name="expirationDate" type="date" value={formData.expirationDate} onChange={e => setFormData({ ...formData, expirationDate: e.target.value })}>
                    Expiration Date
                </Input>

                {/* TODO This needs its own component likely */}
                <Input required type="file" accept="image/jpeg" name="thumbnail" value={formData.thumbnail} onChange={e => setFormData({ ...formData, thumbnail: e.target.files[0] })} >
                    Upload Image
                </Input>

                <Button type="submit">Upload</Button>
            </Form>

            <Nav />
        </Container >
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
        compressFile(formData.thumbnail, async (file) => {
            // NOTE error must be inside the async function
            try {
                const thumbnailURL = await uploadFile(file, `users/${user.uid}/products/${product.uid}`);

                await uploadProduct(user, { ...product, thumbnailURL });

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

const Container = styled.div`
    margin: auto;
    outline: 1px dashed gray;
    /* use a more responsive approach */
    width: 390px;
    display: flex;
    flex-direction: column;
    gap: 21px;
    align-items: center;
    padding: 60px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Button = styled.button`
    font-size:30px;
    line-height:36px;
    width: 288px;
    color: #fff;
    font-weight: 500;
    padding: 12px;
    border-radius: 16px;
    background: linear-gradient(90deg, #76C893 0%, #52B69A 100%), rgba(0, 0, 0, 0.2);
    
    :hover {
        /* TODO add a transition */
        box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.10);
    }
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;

    /* styling span */
    text-transform: capitalize;
    
    /* styling placeholder */
    input {
        width: 288px;
        padding: 4px 0;
        border-bottom: 1px solid black;
        
        /* placeholder styling */
        ::placeholder {
            text-transform: capitalize;
            font-style: italic;
        }
        
        :hover {
            border-bottom-color: #76C893;
        }
    }
`;

const Input = ({ name, type = "text", children, ...props }) => {
    return (
        <Label htmlFor={name}>
            <span name={name} id={name}>{children}</span>
            <input type={type} name={name} id={name} {...props} />
        </Label>
    );
};