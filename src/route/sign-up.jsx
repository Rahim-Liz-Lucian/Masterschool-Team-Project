import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import wastelessLogo from "../assets/brand/logo.svg";
import SignUpForm from "../component/SignUpForm";
import { fireAuth, fireStore } from "../firebase";
import { validateEmailAndPassword } from "../utils";
import { useError } from "../utils/hooks";

export default function Page() {
    const { register, error, resetError } = use();

    return !error ? (
        <section>
            {/* this ought to be a svg element */}
            <img src={wastelessLogo} alt="Waste-Less logo" style={{ height: "160px", width: "100%" }} />

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
            const cred = await createUserWithEmailAndPassword(fireAuth, email, password); // the solution

            await Promise.all([
                updateProfile(cred.user, { displayName: name }),
                // setDoc(doc(fireStore, `users/${cred.user.uid}`), { uid: cred.user.uid, location: { city } }),
                uploadDocument(`users/${cred.user.uid}`, { uid: cred.user.uid, location: { city } })
            ]);

            // add a document with location information
            // const docRef = doc(fireStore, `users/${cred.user.uid}`);
            // await setDoc(doc(fireStore, `users/${cred.user.uid}`), { uid: cred.user.uid, location: { city } });

            alert(`Welcome, ${name} to Waste-Less 💚!!`);
        } catch (error) { setError(error); }
    };

    return { register, error, resetError };
};

function uploadDocument(path, data) { return setDoc(doc(fireStore, path), data); }