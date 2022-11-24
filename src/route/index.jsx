import { signOut } from "firebase/auth";
import { Link, useLocation } from "wouter-preact";
import { fireAuth } from "~/firebase";
// import { useFirebaseAuth } from "~/firebase/data";
import { WasteLess } from "~/component/icons/icons";
import Button from "~/component/base/button";
import ProductCard from "~/component/base/ProductCard";
import { useFirebaseCollectionData } from "~/firebase/hooks";
import { collectionGroup } from "firebase/firestore";

import "./index.css";
import { useFireBaseAuth } from "~/firebase/data";

export default function Page() {
    const user = useFireBaseAuth();
    const { onSignOut, dataLoading, products } = useHook({ user });


    if (dataLoading) return <div>Data Loading...</div>;

    return (
        <main className="page">
            {/* <h1>{auth ? `Welcome ${auth.displayName}` : "Welcome"} 💚</h1> */}

            <WasteLess width="220px" />

            <div className="product__container">
                {products.map((product) => {
                    return (
                        <ProductCard product={product} />
                    );
                })}
            </div>

            {user ? (
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
                        <Button className="btn btn-primary">Sign Up</Button>
                    </Link>
                    <Link to="/sign-in">
                        <Button className="btn btn-primary btn--border">Sign In</Button>
                    </Link>
                </div>
            )}
        </main>
    );
}

const useHook = ({ user }) => {
    const [, setLocation] = useLocation();
    const [products, productsError, productsLoading] = useFirebaseCollectionData((store) => {
        // TODO setup for where clause
        return collectionGroup(store, `products`);
    }, [user]);

    const onSignOut = async () => {
        await signOut(fireAuth);

        alert(`Goodbye, see you soon 💚`);
        setLocation("/");
    };

    return { onSignOut, products, dataLoading: productsLoading };
};
