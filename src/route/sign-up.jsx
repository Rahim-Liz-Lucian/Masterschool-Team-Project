import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useErrorBoundary, useState } from "preact/hooks";
import wastelessLogo from "../assets/brand/logo.svg";
import SignUpForm from "../component/SignUpForm";
import { fireAuth, fireStore } from "../firebase";
import { validateEmailAndPassword } from "../utils";
import { useError } from "../utils/hook";


export default function Page() {
    const { register, error, resetError } = use();

    return !error ? (
        <section>
            {/* this ought to be a svg element */}
            <img src={wastelessLogo} alt="Waste-Less logo" style={{ height: "160px", width: "100%", margin: "0 auto" }} />

            <h2 className="heading">Sign up to wasteless</h2>

            <SignUpForm register={register} />
        </section>
    ) : <button onClick={resetError}>Reset</button>;
};

const use = () => {
    const { error, setError, resetError } = useError();

    const register = async ({ name, email, city, password, repeatPassword }) => {
        try {
            validateEmailAndPassword(email, password, repeatPassword);

            // throw error to be caught by error Boundary
            const cred = await createUserWithEmailAndPassword(fireAuth, email, ".");

            await updateProfile(cred.user, { displayName: name });

            // add a document with location information
            const docRef = doc(fireStore, `users/${cred.user.uid}`);
            await setDoc(docRef, { uid: cred.user.uid, location: { city } });

            alert(`Welcome, ${name} to Waste-Less 💚!!`);
        } catch (error) {
            setError(error);
        }
    };

    return { register, error, resetError };
};

