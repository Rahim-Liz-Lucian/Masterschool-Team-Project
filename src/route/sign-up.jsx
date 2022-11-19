import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useLocation } from "wouter-preact";
import wastelessLogo from "../assets/brand/logo.svg";
import ErrorMessage from "../component/base/ErrorMessage";
import SignUpForm from "../component/SignUpForm";
import { fireAuth, } from "../firebase";
import { uploadUserDetails } from "../firebase/functions";
import { validateEmailAndPassword } from "../utils";
import { useError } from "../utils/hooks";

export default function Page() {
    const { onRegister, error, resetError } = use();

    if (error) return (
        <ErrorMessage {...{ error, resetError }} />
    );

    return (
        <div>
            {/* this ought to be a svg element */}
            <img src={wastelessLogo} alt="Waste-Less logo" style={{ height: "160px", width: "100%" }} />

            <h2 className="heading">Sign up to wasteless</h2>

            <SignUpForm onRegister={onRegister} />
        </div>
    );
}

const use = () => {
    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const onRegister = async ({ name, email, city, password, repeatPassword }) => {
        try {
            validateEmailAndPassword(email, password, repeatPassword);

            const cred = await createUserWithEmailAndPassword(fireAuth, email, password); // the solution

            await Promise.all([
                updateProfile(cred.user, { displayName: name }),
                uploadUserDetails(cred.user, { uid: cred.user.uid, location: { city } }),
            ]);

            alert(`Welcome, ${name} to Waste-Less 💚!!`);
            setLocation("/");

        } catch (error) { setError(error); }
    };

    return { onRegister, error, resetError };
};

// function _uploadUserDetails(path, data) { return setDoc(doc(fireStore, path), data); }