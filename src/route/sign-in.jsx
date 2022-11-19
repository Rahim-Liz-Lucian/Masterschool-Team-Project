import { Link, useLocation } from "wouter-preact";
import { useFirebaseAuth } from "../firebase/hooks";
import { useError } from "../utils/hooks";
import wastelessLogo from "../assets/brand/logo.svg";
import SignInForm from "../component/SignInForm";
import { fireAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "../component/base/ErrorMessage";

export default function Page() {
    const [, isLoading] = useFirebaseAuth();
    const { authenticate, error, resetError } = use();

    if (error) return (
        <ErrorMessage {...{ error, resetError }} />
    );

    if (isLoading) return (
        <div>Loading...</div>
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <img src={wastelessLogo} alt="Waste-Less logo" style={{ height: "160px", width: "100%" }} />

            <SignInForm authenticate={authenticate} />

            <Link href="/sign-up">Don't have an account?</Link>

            <Link href="/">Browse as guest?</Link>
        </div>
    );
}

const use = () => {
    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const authenticate = async ({ email, password }) => {
        try {
            const cred = await signInWithEmailAndPassword(fireAuth, email, password);
            // NOTE alert is just a debugging option
            alert(`Sign-in has been successful ${cred.user.uid} 💚`);
            setLocation("/browse");
        } catch (error) { setError(error); }
    };

    return { authenticate, error, resetError };
};