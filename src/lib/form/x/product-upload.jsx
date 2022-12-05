import { Form as FormBasic, Input as InputBasic, Select as SelectBasic } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { compressFile, createStore, useError } from "~/lib";
import { uploadProduct } from "../firebase";

const { Provider, useStore, valueOf } = createStore({ title: "", description: "", expirationDate: new Date().toLocaleDateString("en-CA"), thumbnail: null });

const useFormData = () => {
    return {
        title: valueOf("title"),
        description: valueOf("description"),
        expirationDate: valueOf("expirationDate"),
        thumbnail: valueOf("thumbnail"),
    };
};

export const Main = props => {
    return (
        <Provider>
            <main>
                {props.children}
            </main>
        </Provider>
    );
};

export const Form = ({ user, ...props }) => {
    const { title, description, expirationDate, thumbnail } = useFormData(); // inside

    const { error, setError, resetError } = useError();
    // const [, setLocation] = useLocation();

    const onUploadProduct = async (e) => {
        e.preventDefault();

        const product = {
            title,
            description: description ?? "",
            // tags: formData.tags
            expirationDate: new Date(expirationDate),
            createdAt: new Date(),
        };

        compressFile(thumbnail, async (file) => {
            try {
                await uploadProduct(user, { product, file });
                alert(`product has been uploaded 💚`);
            } catch (error) {
                setError(error);
            }
        }, error => setError(error));
    };

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <FormBasic onSubmit={onUploadProduct}>
            {props.children}
        </FormBasic>
    );
};

export const Input = props => {
    const [value, setStore] = useStore(store => store[props.name]);

    return (
        <InputBasic required={props.required} type={props.type} name={props.name} value={value} min={props.min} onChange={e => setStore({ [props.name]: e.target.value })}>{props.children}</InputBasic>
    );
};

export const Select = props => {
    const [value, setStore] = useStore(store => store[props.name]);

    return (
        <SelectBasic required={props.required} title={props.title} name={props.name} value={value} onChange={e => setStore({ [props.name]: e.target.value })}>
            {props.children}
        </SelectBasic>
    );
};

export const FileInput = props => {
    const [value, setStore] = useStore(store => store[props.name]);

    return (
        <InputBasic required={props.required} type={"file"} accept={props.accept} name={props.name} value={value} onChange={e => setStore({ [props.name]: e.target.files[0] })}></InputBasic>
    );
};

/*
({ target: { files, value } }) => {
        setFormData({ ...formData, [key]: files ? files[0] : value });
    };
*/