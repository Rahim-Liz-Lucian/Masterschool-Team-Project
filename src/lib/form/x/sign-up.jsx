import { useLocation } from "wouter-preact";
import { Form as FormBasic, Input as InputBasic, Select as SelectBasic } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { registerUser, updateUserProfile } from "~/lib/firebase";
import { createStore, useError, validateEmailAndPassword } from "~/lib";

const { Provider, useStore, valueOf } = createStore({ displayName: "", email: "", password: "", repeatPassword: "", phoneNumber: "", city: "none", });

const useFormData = () => {
    return {
        displayName: valueOf("displayName"),
        email: valueOf("email"),
        password: valueOf("password"),
        repeatPassword: valueOf("repeatPassword"),
        phoneNumber: valueOf("phoneNumber"),
        city: valueOf("city"),
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

export const Form = props => {
    const { email, password, repeatPassword, displayName, city } = useFormData(); // inside

    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const onRegister = async (e) => {
        e.preventDefault();

        try {
            validateEmailAndPassword(email, password, repeatPassword);

            const { user } = await registerUser(email, password);

            await updateUserProfile(user, { displayName, email, location: { city } });

            alert(`successfully created an account`);
            setLocation("/");
        } catch (error) { setError(error); }
    };

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <FormBasic onSubmit={onRegister}>
            {props.children}
        </FormBasic>
    );
};

export const Input = props => {
    const [value, setStore] = useStore(store => store[props.name]);

    return (
        <InputBasic required={props.required} type={props.type} name={props.name} value={value} onChange={e => setStore({ [props.name]: e.target.value })}>{props.children}</InputBasic>
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