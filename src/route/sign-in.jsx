import "./sign-in.css"; // move soon

import { Link, useLocation } from "wouter-preact";
import { useError } from "~/utils";
import { WasteLess, Input, Google, Facebook } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { useState } from "preact/hooks";
import { signInUser } from "~/firebase";

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
            <header className="sign-in header">
                <WasteLess className="icon--hero" />
            </header>

            <main className="sign-in">
                {/* TODO move logo to header */}

                <form className="sign-in form" id="sign-in" onSubmit={onSignIn}>
                    <Input name="email" type="email" value={formData.email} onChange={onChange("email")}>Email</Input>

                    <Input name="password" type="password" value={formData.password} onChange={onChange("password")}>Password</Input>

                    <a className="form__reset" href="/forgot-password">Forgot Password?</a>

                    <div className="oauth">
                        <span>Or Sign Up using</span>
                        <Facebook className="icon--facebook" />
                        <Google className="icon--google" />
                    </div>

                    <button className="button" type="submit">Login</button>

                    <span>Don't have an account yet?<Link href="/sign-up"> Sign up!</Link></span>
                </form>

                <Link to="/" className="button--secondary">Browse</Link>
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
