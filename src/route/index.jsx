"use strict";

import "./index.css";

import { useLocation } from "wouter-preact";
import { useState } from "preact/hooks";
import { signOutUser, useFireBaseAuth, useFirebaseProducts } from "~/firebase";
import { useError } from "~/utils";
import { LinkAvatar, BackButton, Select } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import ProductCard from "~/component/ProductCard";
import NavMenu from "~/component/NavMenu";



export default function Page() {
    const user = useFireBaseAuth();

    const [query, setQuery] = useState({ city: "none" });

    const { error, resetError, loading, products } = useHook({ user, query });

    if (loading) return <div>Data Loading...</div>;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <header className="header">
                <BackButton className="header__nav" />
                <h1 className="header__title">Browse</h1>
                <LinkAvatar user={user} to="/profile/" title={`Goto Profile`} />
            </header>

            <main>
                <div className="search">
                    <button>List View</button>
                    <button>Map View</button>
                    <Select value={query.city} onChange={e => setQuery({ ...query, city: e.target.value })}>
                        <option value="none">Select a location</option>
                        <option value="amsterdam">Amsterdam</option>
                        <option value="berlin">Berlin</option>
                        <option value="london">London</option>
                        <option value="paris">Paris</option>
                        <option value="tlv">Tel-Aviv</option>
                    </Select>
                </div>

                <div>
                    {!products.length ? "No products" : products.map(product => (
                        <ProductCard product={product} />
                    ))}
                </div>
            </main>

            <aside>
                <NavMenu user={user} />
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
