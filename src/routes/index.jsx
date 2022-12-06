import { Back, LogoMini, ProductList, Select, UserMenu } from "~/components";
import { useFirebaseAuth, useFirebaseProducts } from "~/lib/firebase";
import { useRef, useState } from "preact/hooks";
import cities from "~/data/cities.json";
import { ASide, Header, Main } from "~/layout/layout";

export default function Page() {
    // const user = useFirebaseAuth();

    const [filter, setFilter] = useState("all");
    const { data, isLoading } = useFirebaseProducts();

    const filtered = data.filter((value) => filter === "all" ? true : value.user.location.city === filter);

    if (isLoading) <div>Data Loading...</div>;

    return (
        <>
            <Header>
                <Back />
                <h1>Browse</h1>
                <LogoMini />
            </Header>
            {/* NOTE this may make better sense as one component */}
            <ASide>
                <Select style={{ boxShadow: "none", border: "3px var(--green-primary) solid" }} items={[{ value: "all", label: "All" }, ...cities]} value={filter} onChange={e => setFilter(e.target.value)} >
                    {(city) => (<option key={city.value} {...city}>{city.label}</option>)}
                </Select>
            </ASide>
            <Main classList={["h-full", "column", "scroll-y"]}>
                <ProductList products={filtered} />
            </Main>
            <ASide>
                <UserMenu />
            </ASide>
        </>
    );
}