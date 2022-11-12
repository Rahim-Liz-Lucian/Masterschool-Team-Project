import { useAuthContext } from "../firebase";
import { Link, useLocation } from "wouter";

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
        alert("signing-out");
    }

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

            <Link href="/sign-in" onClick={handleSignOut}>
                Log out
            </Link>
        </div>
    );
}

// bar___123