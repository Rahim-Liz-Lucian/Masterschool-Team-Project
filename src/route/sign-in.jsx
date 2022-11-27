import "./sign-in.css"; // move soon

import { Link as WouterLink, useLocation } from "wouter-preact";
import { useError } from "~/utils";
import { WasteLess, Input, Google, Facebook, Form, Button, Link } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { useState } from "preact/hooks";
import { signInUser } from "~/firebase";
import { Header } from "~/component/layout";

export default function Page() {
    // const [auth, isLoaded] = useFirebaseAuthData();
    const [formData, setFormData] = useState({});
    const { onSignIn, error, resetError } = useHook({ formData });

    const onChange = (key) => e => {
        setFormData({ ...formData, [key]: e.target.value });
    };

    // TODO if currentUser then redirect to browse
    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <Header>
                <WasteLess className="icon--hero" />
            </Header>

            <main className="sign-in">
                {/* TODO move logo to header */}

                <Form id="sign-in" onSubmit={onSignIn}>
                    <Input name="email" type="email" value={formData.email} onChange={onChange("email")}>Email</Input>

                    <Input name="password" type="password" value={formData.password} onChange={onChange("password")}>Password</Input>

                    <a className="form__reset" href="/forgot-password">Forgot Password?</a>

                    <div className="oauth">
                        <span>Or Sign Up using</span>
                        <Facebook />
                        <Google />
                    </div>

                    <Button className="primary" type="submit">Login</Button>

                    <span>Don't have an account yet?<WouterLink href="/sign-up"> Sign up!</WouterLink></span>
                </Form>

                <Link to="/" className="secondary">Browse</Link>
            </main>
        </>
    );
}

const useHook = ({ formData: { email, password } }) => {
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
            setError(error);
        }
    };

    return { onSignIn, error, resetError };
};
