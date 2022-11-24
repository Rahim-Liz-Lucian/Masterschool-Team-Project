import { Link, useLocation } from "wouter-preact";
<<<<<<< HEAD
import { useFirebaseAuth } from "~/firebase/hooks";
import { useError } from "~/utils/hooks";
import wastelessLogo from "~/assets/brand/logo.svg";
import SignInForm from "~/component/SignInForm";
import { fireAuth } from "~/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "~/component/base/ErrorMessage";
import Button from "~/component/base/Button";
=======
import { useFirebaseAuth } from "../firebase/hooks";
import { useError } from "../utils/hooks";
import { WasteLess } from "../component/icons/icons";
import SignInForm from "../component/SignInForm";
import { fireAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "../component/base/ErrorMessage";
import Button from "../component/base/Button";
import "../index.css";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Back from "../component/base/Back";
>>>>>>> Liz_component_implementing

export default function Page() {
    const [, isLoading] = useFirebaseAuth();
    const { authenticate, error, resetError } = use();

    // TODO if currentUser then redirect to browse

<<<<<<< HEAD
    if (isLoading) return (
        <div>Loading...</div>
    );
=======
  return !error ? (
    <div className="page">
      <Back />
      <WasteLess width="220px" />
>>>>>>> Liz_component_implementing

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <img src={wastelessLogo} alt="Waste-Less logo" style={{ height: "160px", width: "100%" }} />

<<<<<<< HEAD
            <SignInForm authenticate={authenticate} />

            {/* FIXME Just needs center-ing */}
            <Link href="/sign-up">Don't have an account yet? Sign up!</Link>

            {/* TODO sign in with google/facebook */}

            {/* TODO continue as guest */}
            <Button classes="btn btn-secondary">Browse</Button>
        </div>
    );
=======
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
      <Button classes="btn btn-primary btn--border">Browse</Button>
    </div>
  ) : (
    <button onClick={resetError}>reset</button>
  );
>>>>>>> Liz_component_implementing
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
