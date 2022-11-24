import { signOut } from "firebase/auth";
import { Link, useLocation } from "wouter-preact";
import { useFireBaseAuth } from "~/firebase/data";
import { fireAuth } from "../firebase";

export default function Page() {
  const auth = useFireBaseAuth()
  const { onSignOut } = use({ auth });

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
