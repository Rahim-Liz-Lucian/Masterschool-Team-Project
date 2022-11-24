import { collection, collectionGroup, getDoc, query } from "firebase/firestore";
import { useEffect, useState } from "preact/hooks";
import styled from "styled-components";
import { Redirect, useLocation } from "wouter-preact";
import { Nav } from "~/component/base/base";
import ErrorMessage from "~/component/base/ErrorMessage";
import { useFireBaseAuth } from "~/firebase/data";
import { signOutUser } from "~/firebase/functions";
import { useFirebaseCollectionData } from "~/firebase/hooks";
import { useError } from "~/utils/hooks";
import "./index.css";

export default function Page() {
    const user = useFireBaseAuth();
    const { error, resetError, products, dataLoading, onSignOut } = useHook({ user });

    if (!user) return <Redirect to="/x/sign-in" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    if (dataLoading) return (
        <div>Data loading..</div>
    );

    return (
        <section className="page">
            <div>
                <h1>Browse</h1>
                <button>List View</button>
                <button>Map View</button>
            </div>

            <div>
                {products.map(product => (
                    <ProductCard key={product.uid} product={product} />
                ))}
            </div>

            {/* NOTE this should be located elsewhere, but just trying to get functionality sorted */}
            <button onClick={onSignOut}>Sign Out</button>
            <Nav />
        </section>
    );
}

const useHook = ({ user }) => {
    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const [products, productsError, productsLoading] = useFirebaseCollectionData(store => {
        // TODO setup for where clause

        return collectionGroup(store, `products`);
    }, [user]);

    useEffect(() => { setError(productsError); }, [productsError]);

    const onSignOut = async () => {
        await signOutUser();
        alert(`See you soon! 🙋🏿‍♀️`);
        setLocation("/x/sign-in");
    };

    return { error, resetError, products, dataLoading: productsLoading, onSignOut };
};

const ProductCard = ({ product }) => {
    const { dataLoading, data: { user } } = useAggregateData({ product });

    if (dataLoading) return (
        <div>Loading...</div>
    );

    return (
        <div className="product__card">
            This is a product card
            <h3>{product.title}</h3>
            <img src={product.thumbnailURL} alt={product.description} />

            <br />
            {/* user styles */}
            <img src={user.photoURL} alt={user.displayName} />
        </div>
    );
};

/**
 * Need to get the user and product details together
 */
const useAggregateData = ({ product: { userRef, ...product } }) => {
    const [dataLoading, setDataLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            // error handling should go here
            const snapshot = await getDoc(userRef);
            setUser(snapshot.data());
            setDataLoading(false);
        })();
    }, []);

    return { dataLoading, data: { user, product } };
}; 