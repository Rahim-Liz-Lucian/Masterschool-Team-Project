import { createStore, useError } from "~/lib";
import { Form as FormBasic, Input as InputBasic, Select as SelectBasic } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { useLocation } from "wouter-preact";
import { useFirebaseDocument } from "../firebase";
import { updateProfile } from "firebase/auth";
import { doc } from "firebase/firestore";


const { Provider: UpdateProvider, useStore: useUpdateForm, valueOf: valueOfUpdateForm } = createStore({ displayName: "", phoneNumber: "", city: "none" });

const useFormData = () => {
    return {
        displayName: valueOfUpdateForm("displayName"),
        phoneNumber: valueOfUpdateForm("phoneNumber"),
        city: valueOfUpdateForm("city"),
    };
};

// TODO main needs styling
export const Main = props => {
    return (
        <UpdateProvider>
            <main style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {props.children}
            </main>
        </UpdateProvider>
    );
};


export const UpdateForm = ({ user, ...props }) => {
    // NOTE may not be required
    const [, profileError,] = useFirebaseDocument(store => {
        return doc(store, `users/${user?.uid}`);
    }, [user]);

    const { displayName, city, phoneNumber } = useFormData(); // inside
    const { error, setError, resetError } = useError(profileError);
    const [, setLocation] = useLocation();



    const onUpdateProfile = async (e) => {
        e.preventDefault();

        console.log({ city, phoneNumber, displayName });

        // try {
        //     // TODO update user displayName, city & phoneNumber
        //     await updateProfile(user, { displayName });
        //     alert(`Your profile display name has been updated for ${displayName}`);
        // } catch (error) {
        //     setError(error);
        // }
    };


    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <FormBasic classList={["gap"]} onSubmit={onUpdateProfile}>
            {props.children}
        </FormBasic>
    );
};



export const Input = props => {
    const [value, setStore] = useUpdateForm(store => store[props.name]);

    return (
        <InputBasic type={props.type} name={props.name} value={value} onChange={e => setStore({ [props.name]: e.target.value })}>{props.children}</InputBasic>
    );
};
export const Select = props => {
    const [value, setStore] = useUpdateForm(store => store[props.name]);

    return (
        <SelectBasic required={props.required} title={props.title} name={props.name} value={value} onChange={e => setStore({ [props.name]: e.target.value })}>
            {props.children}
        </SelectBasic>
    );
};