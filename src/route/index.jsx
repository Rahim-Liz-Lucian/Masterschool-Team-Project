import { signOut } from "firebase/auth";
import { Link, useLocation } from "wouter-preact";
import { fireAuth } from "../firebase";
import { useFirebaseAuth } from "../firebase/hooks";

export default function Page() {
    const [auth, isLoading] = useFirebaseAuth();
    const { onSignOut } = use({ auth });

    if (isLoading) return (
        <div>Loading...</div>
    );

    return (
        <main>
            <h1>{auth ? `Welcome ${auth.displayName}` : "Welcome"} 💚</h1>

            <div>This is where data will go</div>

            {auth ? (
                <div>
                    <button onClick={onSignOut}>Sign out</button>
                    <nav>
                        <Link to="/upload">Upload product</Link>
                        <Link to="/settings/profile">My profile</Link>
                    </nav>
                </div>
            ) : (
                <div>
                    <Link to="/sign-in">Login</Link>
                    <Link to="/sign-up">Sign up</Link>
                </div>
            )}
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