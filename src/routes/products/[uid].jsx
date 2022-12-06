import { Link } from "wouter-preact";
import { Back, LogoMini, ProductArticle, UserMenu } from "~/components";
import { ASide, Header, Main } from "~/layout";
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
            <Main className={"h-full column scroll-y"}>
                <ProductArticle className={"h-full"} data={data} />
            </Main>
            <ASide>
                <UserMenu />
            </ASide>
        </>
    );
}

const NotFound = () => (
    <div>Not Found</div>
);

const Loading = () => (
    <div>Loading...</div>
);