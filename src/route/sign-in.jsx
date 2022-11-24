import "./index.css";
import { Link, useLocation } from "wouter-preact";
import { useError } from "../utils/hooks";
import { WasteLess } from "../component/icons/icons";
import SignInForm from "../component/SignInForm";
import { fireAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Button, { BackButton } from "~/component/base/button";
import ErrorMessage from "~/component/base/ErrorMessage";
import { Input } from "~/component/base/input";
import { useState } from "preact/hooks";
import { signInUser } from "~/firebase/functions";

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
        <div className="page">
            <BackButton />
            <WasteLess width="220px" />

            <form id="sign-in" onSubmit={onSignIn}>
                <Input required name="email" type="email" value={formData.email} onChange={onChange("email")}>
                    Email
                </Input>
                <Input required name="password" type="password" value={formData.password} onChange={onChange("password")} >
                    Password
                </Input>

                <a href="/forgot-password">Forgot Password?</a>

                <Button className="btn btn-primary" type="submit">
                    Login
                </Button>
            </form>

            {/* FIXME Just needs center-ing */}
            <p>
                Don't have an account yet?
                <Link href="/sign-up"> Sign up!</Link>
            </p>

            {/* TODO sign in with google/facebook */}
            <div>
                <p>Or Sign Up using</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: "5px",
                        alignItems: "center",
                    }}
                >
                    <AiFillGoogleCircle size="2.5rem" color="#de5246" />
                    <BsFacebook size="2.2rem" color="#3b5998" />
                </div>
            </div>
            {/* TODO continue as guest */}
        </div>
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
            setLocation("/upload");
        } catch (error) {
            setError(error);
        }
    };

    return { onSignIn, error, resetError };
};