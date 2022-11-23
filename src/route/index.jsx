import { signOut } from "firebase/auth";
import { Link, useLocation } from "wouter-preact";
import { fireAuth } from "../firebase";
import { useFirebaseAuth } from "../firebase/hooks";
import { WasteLess } from "../component/icons/icons";
import Button from "../component/base/Button";
import "../index.css";
import Product from "../component/base/Product";
import { useFirebaseCollectionData } from "../firebase/hooks";
import { collectionGroup } from "firebase/firestore";

export default function Page() {
  const [auth, isLoading] = useFirebaseAuth();
  const { onSignOut } = use({ auth });
  const [products, productsError, productsLoading] = useFirebaseCollectionData(
    (store) => {
      // TODO setup for where clause

      return collectionGroup(store, `products`);
    },
    [auth]
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="page">
      {/* <h1>{auth ? `Welcome ${auth.displayName}` : "Welcome"} 💚</h1> */}

      <WasteLess width="220px" />

      <div className="data-container">
        {products.map((product) => {
          return (
            <Product
              image={product.thumbnailUrl}
              title={product.title}
              // TODO: fix format on exp. date
              date={product.expirationDate}
              // TODO: get location from user
              location="London"
              daysAgo="2"
            />
          );
        })}
      </div>

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
