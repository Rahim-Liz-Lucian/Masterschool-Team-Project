import { Link } from "wouter-preact";
import { Back, LogoMini, ProductArticle } from "~/components";
import { Header, Nav, Main } from "~/layout";
import { useFirebaseProductByID } from "~/lib/firebase";

export default function Page({ uid }) {
    const { data, isLoading } = useFirebaseProductByID(uid);

    if (isLoading) return <Loading />;

    if (!data) return <NotFound />;

    return (
        <>
            <Header>
                <Link to={".."}>
                    <Back />
                </Link>
                <h1>Product</h1>
                <LogoMini />
            </Header>
            <Main>
                <ProductArticle data={data} />
                <aside>
                    <Nav />
                </aside>
            </Main>
        </>
    );
}

const NotFound = () => (
    <div>Not Found</div>
);

const Loading = () => (
    <div>Loading...</div>
);