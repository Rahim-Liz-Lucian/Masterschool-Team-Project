import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "wouter-preact";
import wastelessLogo from "../assets/brand/logo.svg";
import Button from "../component/base/Button";
import SignInForm from "../component/SignInForm";
import { fireAuth } from "../firebase";
import { useFirebaseAuthData } from "../firebase/hooks";
import { useError } from "../utils/hooks";

export default function Page() {
    // const [auth, isLoaded] = useFirebaseAuthData();
    const { authenticate, error, resetError } = use();

    return !error ? (
        <div>
            <img src={wastelessLogo} alt="Waste-Less logo" style={{ height: "160px", width: "100%" }} />

            <SignInForm authenticate={authenticate} />

            {/* FIXME Just needs center-ing */}
            <Link href="/sign-up">Already have an account?</Link>

            {/* TODO continue as guest */}
        </div>
    ) : <button onClick={resetError}>reset</button>;
}

// 4wsWwACBWAhZvfFg5e64zfEtugA2
const use = () => {
    const { error, setError, resetError } = useError();

    const authenticate = async ({ email, password }) => {
        console.log(email, password);
        try {
            const cred = await signInWithEmailAndPassword(fireAuth, email, password);
            // should redirect but for now will just alert the user
            alert(`Sign-in has been successful ${cred.user.uid} 💚`);
        } catch (error) { setError(error); }
    };

    return { authenticate, error, resetError };
};