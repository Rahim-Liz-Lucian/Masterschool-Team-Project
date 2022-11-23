import { Link, useLocation } from "wouter-preact";
import { useFirebaseAuth } from "~/firebase/hooks";
import { useError } from "~/utils/hooks";
import wastelessLogo from "~/assets/brand/logo.svg";
import SignInForm from "~/component/SignInForm";
import { fireAuth } from "~/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "~/component/base/ErrorMessage";
import Button from "~/component/base/Button";

export default function Page() {
    const [, isLoading] = useFirebaseAuth();
    const { authenticate, error, resetError } = use();

    // TODO if currentUser then redirect to browse

    if (isLoading) return (
        <div>Loading...</div>
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <img src={wastelessLogo} alt="Waste-Less logo" style={{ height: "160px", width: "100%" }} />

            <SignInForm authenticate={authenticate} />

            {/* FIXME Just needs center-ing */}
            <Link href="/sign-up">Don't have an account yet? Sign up!</Link>

            {/* TODO sign in with google/facebook */}

            {/* TODO continue as guest */}
            <Button classes="btn btn-secondary">Browse</Button>
        </div>
    );
}

const use = () => {
    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const authenticate = async ({ email, password }) => {
        console.log(email, password);
        try {
            const cred = await signInWithEmailAndPassword(fireAuth, email, password);
            // should redirect but for now will just alert the user
            alert(`Sign-in has been successful ${cred.user.uid} 💚`);
        } catch (error) {
            setError(error);
        }
    };

    return { authenticate, error, resetError };
};
