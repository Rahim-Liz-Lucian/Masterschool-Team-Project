import { Link, useLocation } from "wouter-preact";
import { useFirebaseAuth } from "../firebase/hooks";
import { useError } from "../utils/hooks";
import wastelessLogo from "../assets/brand/logo.svg";
import SignInForm from "../component/SignInForm";
import { fireAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "../component/base/ErrorMessage";

export default function Page() {
  // const [auth, isLoaded] = useFirebaseAuthData();
  const { authenticate, error, resetError } = use();

  // TODO if currentUser then redirect to browse

  return !error ? (
    <div className="page">
      <img
        src={wastelessLogo}
        alt="Waste-Less logo"
        style={{ height: "160px", width: "100%" }}
      />

      <SignInForm authenticate={authenticate} />

      {/* FIXME Just needs center-ing */}
      <Link href="/sign-up">Don't have an account yet? Sign up!</Link>

      {/* TODO sign in with google/facebook */}

      {/* TODO continue as guest */}
      <Button classes="btn btn-secondary">Browse</Button>
    </div>
  ) : (
    <button onClick={resetError}>reset</button>
  );
}

const use = () => {
  const { error, setError, resetError } = useError();

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
