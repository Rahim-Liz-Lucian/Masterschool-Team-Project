import { useLocation } from "wouter-preact";
import { Form as FormBasic, Input as InputBasic } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { signInUser } from "~/lib/firebase";
import { createStore, useError } from "~/lib";

const { Provider, useStore, valueOf } = createStore({ email: "", password: "" });

const useFormData = () => {
    return { email: valueOf("email"), password: valueOf("password") };
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
    const { email, password } = useFormData(); // inside
    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const onSignIn = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signInUser(email, password);
            // should redirect but for now will just alert the user
            alert(`Sign-in has been successful ${user.uid} 💚`);
            setLocation("/");
        } catch (error) {
            // send error to notification 
            setError(error);
        }
    };

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <FormBasic classList={["links"]} onSubmit={onSignIn}>
            {props.children}
        </FormBasic>
    );
};

export const Input = props => {
    const [value, setStore] = useStore(store => store[props.name]);

    return (
        <InputBasic type={props.type} name={props.name} value={value} onChange={e => setStore({ [props.name]: e.target.value })}>{props.children}</InputBasic>
    );
};
