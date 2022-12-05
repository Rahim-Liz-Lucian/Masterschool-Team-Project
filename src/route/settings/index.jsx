import "./index.css";

import avatarFallback from "~/assets/brand/avatar-fallback.jpg";

import { Link, Redirect, useLocation } from "wouter-preact";
import { signOutUser, useFireBaseAuth } from "~/firebase";
import { onDisabledLink, useError } from "~/utils";
import { BackButton, WasteLessLite } from "~/component/core";
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
        <h1 className="header__title">Settings</h1>
        <WasteLessLite className="icon" />
      </header>

      <main>
        <figure className="profile__banner">
          <figcaption className="profile__title">{user.displayName}</figcaption>
          <img className="profile__avatar" src={photoURL} alt="avatar" />
        </figure>

        <ul className="settings__list">
          <li>
            <Link to="/settings/reset-password">Change Password</Link>
          </li>
          <li>
            <Link to="/settings/rewards" onClick={onDisabledLink}>
              Rewards
            </Link>
          </li>
          <li>
            <Link to="/settings/profile">Profile Settings</Link>
          </li>
          <li>
            <Link to="/settings/history" onClick={onDisabledLink}>
              History
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={onDisabledLink}>
              About
            </Link>
          </li>
          <li>
            <Link to="/help" onClick={onDisabledLink}>
              Help
            </Link>
          </li>
          <li>
            <button onClick={onSignOut}>Sign Out</button>
          </li>
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
};
