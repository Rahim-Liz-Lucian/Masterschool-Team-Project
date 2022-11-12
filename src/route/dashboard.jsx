import { useAuthContext } from "../firebase";
import { Redirect, useLocation } from "wouter-preact";

export default function Page() {
    const { user, authSignOut } = useAuthContext();
    const [_, setLocation] = useLocation();


    async function handleSignOut(e) {
        try {
            await authSignOut();
            setLocation("/sign-in");
        } catch (error) {
            console.error(`Error signing-out ${user.uid}`);
        }
    }

    if (!user) return <Redirect to="/" />;

    return (
        <div>
            <h1>Dashboard</h1>
            {user && (
                <div>
                    <h3>Current user logged in</h3>
                    <p>Uid: {user.uid}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}

            <button onClick={handleSignOut}>
                Log out
            </button>
        </div>
    );
}

// bar___123