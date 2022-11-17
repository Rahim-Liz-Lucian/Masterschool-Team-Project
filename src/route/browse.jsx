import { signOut } from "firebase/auth";
import { Link, useLocation } from "wouter-preact";
import { fireAuth, useFirebaseAuth } from "../firebase";

export default function Page() {
    const [auth, authLoaded] = useFirebaseAuth();
    const { onSignOut } = use({ auth });

    if (!authLoaded) return (
        <div>Loading...</div>
    );

    return (
        <main>
            <h1>Browse</h1>

            <button onClick={onSignOut}>Sign out</button>
        </main>
    );
}

const use = ({ auth }) => {
    const [, setLocation] = useLocation();

    const onSignOut = async () => {
        await signOut(fireAuth);

        alert(`Goodbye, see you soon 💚`);
        setLocation("/");
    };

    return { onSignOut };
};