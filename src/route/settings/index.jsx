import "./index.css";

import { Link, Redirect, useLocation } from "wouter-preact";
import { signOutUser, useFireBaseAuth } from "~/firebase";
import { onDisabledLink, useError } from "~/utils";
import { BackButton, WasteLessLite } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { Nav, Header, Banner } from "~/component/layout";
import { Settings } from "~/component/core/list";

export default function Page() {
    const user = useFireBaseAuth();
    const { error, resetError, onSignOut } = useHook({ user });

    if (!user) return <Redirect to="/" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <Header>
                <BackButton />
                <h1>Settings</h1>
                <WasteLessLite />
            </Header>

            <main>
                <Banner user={user} />

                <Settings>
                    <li><Link to="/settings/reset-password">Change Password</Link></li>
                    <li><Link to="/settings/rewards" onClick={onDisabledLink}>Rewards</Link></li>
                    <li><Link to="/settings/profile">Profile Settings</Link></li>
                    <li><Link to="/settings/history" onClick={onDisabledLink}>History</Link></li>
                    <li><Link to="/about" onClick={onDisabledLink}>About</Link></li>
                    <li><Link to="/help" onClick={onDisabledLink}>Help</Link></li>
                    <li><button onClick={onSignOut}>Sign Out</button></li>
                </Settings>
            </main>

            <aside>
                <Nav user={user} />
            </aside>
        </>
    );
}

const useHook = ({ user }) => {
    const { error, resetError, setError } = useError();
    const [, setLocation] = useLocation();


    const onSignOut = async () => {
        await signOutUser();

        alert(`Goodbye, see you soon 💚`);
        setLocation("/");
    };

    return { error, resetError, onSignOut };
}

