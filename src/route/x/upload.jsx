import { useState } from "preact/hooks";
import styled from "styled-components";
import { Nav, } from "~/component/base/base";
import { useFireBaseAuth } from "~/firebase/data";

export default function Page() {
    const user = useFireBaseAuth();
    const [formData, setFormData] = useState({});
    const { onUpload } = useHook({ user, formData });

    return (
        <Container>
            <h1>Add Product</h1>

            <Form onSubmit={onUpload}>

                <Input required name="title"
                    value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}>
                    Title
                </Input>

                <Input name="description"
                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}>
                    Description
                </Input>

                <Input required name="expirationDate" type="date"
                    value={formData.expirationDate} onChange={e => setFormData({ ...formData, expirationDate: e.target.value })}>
                    Expiration Date
                </Input>

                {/* This needs its own component likely */}
                <Input required type="file" accept="image/jpeg" name="thumbnail"
                    value={formData.thumbnail} onChange={e => setFormData({ ...formData, thumbnail: e.target.files[0] })} >
                    Upload Image
                </Input>

                <button type="submit">Upload</button>
            </Form>

            <Nav />
        </Container >
    );
}

const useHook = ({ user, formData }) => {
    const onUpload = (e) => {
        e.preventDefault();

        console.log(formData);
    };
    return { onUpload };
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