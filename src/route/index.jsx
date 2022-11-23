import { signOut } from "firebase/auth";
import { Link, useLocation } from "wouter-preact";
import { fireAuth } from "../firebase";
import { useFirebaseAuth } from "../firebase/hooks";
import { WasteLess } from "../component/icons/icons";
import Button from "../component/base/Button";
import "../index.css";
// import { collectionGroup } from "../firebase/hooks";

export default function Page() {
  const [auth, isLoading] = useFirebaseAuth();
  const { onSignOut } = use({ auth });

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="page">
      {/* <h1>{auth ? `Welcome ${auth.displayName}` : "Welcome"} 💚</h1> */}
      <WasteLess width="167px" />

      <div className="data-container">This is where data will go</div>

      {auth ? (
        <div>
          <button onClick={onSignOut}>Sign out</button>
          <nav>
            <Link to="/upload">Upload product</Link>
            <Link to="/settings/profile">My profile</Link>
          </nav>
        </div>
      ) : (
        <div className="buttons">
          <Link to="/sign-up">
            <Button classes="btn btn-primary">Sign Up</Button>
          </Link>
          <Link to="/sign-in">
            <Button classes="btn btn-primary btn--border">Sign In</Button>
          </Link>
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
// const [products, productsError, productsLoading] = useFirebaseCollectionData(store => {
//   // TODO setup for where clause

//   return collectionGroup(store, `products`);
// }, [user]);
