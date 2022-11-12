import { Redirect } from "wouter-preact";
import { testUser as user } from "../firebase";
import { useDashboard } from "../hook";

export default function Page() {
    const { handleSignOut } = useDashboard();

    if (!user.value) return (
        <Redirect to="/" />
    );

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h3>Current user logged in</h3>
                <p>Uid: {user.value.uid}</p>
                <p>Email: {user.value.email}</p>
            </div>

            <button onClick={handleSignOut}>
                Log out
            </button>
        </div>
    );
}
