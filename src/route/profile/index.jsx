"use strict";
import "./index.css";
import avatarFallback from "~/assets/brand/avatar-fallback.jpg";

import { Link, Redirect, useLocation } from "wouter-preact";
import { signOutUser, useFireBaseAuth } from "~/firebase";
import { onDisabledLink, useError } from "~/utils";
import { BackButton } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import NavMenu from "~/component/NavMenu";

export default function Page() {
    const user = useFireBaseAuth();
    const { error, resetError, onSignOut } = useHook({ user });

    const photoURL = user?.photoURL ?? avatarFallback;

    if (!user) return <Redirect to="/" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <header className="header">
                <BackButton />
            </header>

            <main>


                <div className="header">
                    <img className="header__avatar" src={photoURL} alt="avatar" />
                    <h1 className="header__title">{user.displayName}</h1>
                </div>

                <ul className="settings__list">
                    <li><Link to="/profile/settings/reset-password">Change Password</Link></li>
                    <li><Link to="/profile/rewards" onClick={onDisabledLink}>Rewards</Link></li>
                    <li><Link to="/profile/history" onClick={onDisabledLink}>History</Link></li>
                    <li><Link to="/profile/settings">Settings</Link></li>
                    <li><Link to="/about" onClick={onDisabledLink}>About</Link></li>
                    <li><Link to="/help" onClick={onDisabledLink}>Help</Link></li>
                    <li><button onClick={onSignOut}>Sign Out</button></li>
                </ul>


            </main>

            <aside>
                <NavMenu user={user} />
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

