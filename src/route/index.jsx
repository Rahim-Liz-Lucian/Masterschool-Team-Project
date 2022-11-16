import { Link } from "wouter-preact";
import { useFirebaseAuthData } from "../firebase/hooks";

export default function Page() {
  const [user, done] = useFirebaseAuthData();

  return !done ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>This is the home page</h1>
      {user ? (
        <nav>
          <Link href="/dashboard">Goto Dashboard</Link>
          <Link href="/settings/profile">Goto Settings</Link>
        </nav>
      ) : (
        <nav>
          <Link href="/sign-in">Sign In?</Link>
          <Link href="/sign-up">Sign Up?</Link>
        </nav>
      )}
    </div>
  );
}
