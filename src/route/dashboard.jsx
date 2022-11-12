import { Redirect } from "wouter-preact";
import { useDashboard } from "../hook";

export default function Page() {
    const { handleSignOut, user } = useDashboard();



    if (!user.value) return (
        <Redirect to="/" />
    );

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h3>Current user logged in</h3>
                <p>Uid: {user.peek().uid}</p>
                <p>Email: {user.peek().email}</p>
            </div>

            <button onClick={handleSignOut}>
                Log out
            </button>
        </div>
    );
}
