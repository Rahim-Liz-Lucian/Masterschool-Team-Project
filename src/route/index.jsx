"use strict";

import "./index.css";

import { useLocation } from "wouter-preact";
import { useState } from "preact/hooks";
import { signOutUser, useFireBaseAuth, useFirebaseProducts } from "~/firebase";
import { useError } from "~/utils";
import { BackButton, Select, WasteLessLite } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { ProductList } from "~/component/product";
import { Header, Nav } from "~/component/layout";

export default function Page() {
    const user = useFireBaseAuth();

    const [query, setQuery] = useState({ city: "none" });

    const { error, resetError, loading, products } = useHook({ user, query });

    if (loading) return <div>Data Loading...</div>;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <Header>
                <BackButton />
                <h1>Browse</h1>
                <WasteLessLite />
            </Header>

            <main className="browse">
                <div className="search">
                    {/* <button>List View</button> */}
                    {/* <button>Map View</button> */}
                    <Select value={query.city} onChange={e => setQuery({ ...query, city: e.target.value })}>
                        <option value="none">Location</option>
                        <option value="amsterdam">Amsterdam</option>
                        <option value="berlin">Berlin</option>
                        <option value="london">London</option>
                        <option value="paris">Paris</option>
                        <option value="tlv">Tel-Aviv</option>
                    </Select>
                </div>

                <div>
                    {!products.length ? "No products" : <ProductList products={products} />}
                    {/* {!products.length ? "No products" : <ProductList products={[...products, ...products, ...products, ...products, ...products]} />} */}
                </div>
            </main>

            <aside>
                <Nav user={user} />
            </aside>
        </>
    );
}

// NOTE Query is only `city` for our MVP but plans to increase this
const useHook = ({ user, query: { city } }) => {
    const [, setLocation] = useLocation();
    const { products, loading, error: productsError } = useFirebaseProducts();
    const { error, resetError } = useError(productsError);

    const onSignOut = async () => {
        await signOutUser();

        alert(`Goodbye, see you soon 💚`);
        setLocation("/");
    };

    const filtered = products.filter(product => {
        if (city === "none") return true;
        return product.user.location.city === city;
    });

    return { onSignOut, products: filtered, loading, error, resetError };
};
