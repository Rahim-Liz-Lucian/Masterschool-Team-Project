import { Back, LogoMini, ProductList, Select } from "~/components";
import { Header, Main, Nav } from "~/layout";
import { useFirebaseProducts } from "~/lib/firebase";
import { useRef, useState } from "preact/hooks";
import cities from "~/data/cities.json";

export default function Page() {
    const [filter, setFilter] = useState(cities[0].value);
    const { data, isLoading } = useFirebaseProducts();

    // TODO loading screen for products
    const filtered = data.filter((value) => filter === "all" ? true : value.user.location.city === filter);

    const a = useRef(null);
    const b = useRef(null);

    return (
        <>
            <Header>
                <Back />
                <h1>Browse</h1>
                <LogoMini />
            </Header>
            <Main>
                <section ref={a} className="container">
                    <Select items={cities} value={filter} onChange={e => setFilter(e.target.value)} >
                        {(city) => (<option key={city.value} {...city}>{city.label}</option>)}
                    </Select>
                    <ProductList products={filtered} />
                </section>
                <aside ref={b} className="container">
                    <Nav />
                </aside>
            </Main>
        </>
    );
}
