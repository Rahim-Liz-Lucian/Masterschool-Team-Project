
import { Link } from "wouter-preact";
import ErrorMessage from "~/component/ErrorMessage";
import { useFireBaseAuth, useFirebaseProductByID } from "~/firebase";
import { relativeDays, useError } from "~/utils";
import { Star, Share, Telephone, Person, BackButton, Button, LinkAvatar, Avatar, WasteLessLite, Profile } from "~/component/core";
import { Nav, Header } from "~/component/layout";
import { UserRating } from "~/component/user";
import { ProductArticle } from "~/component/product";


export default function ProductPage({ id, ...props }) {
    const user = useFireBaseAuth();

    const { error, resetError, product, loading: dataLoading } = useHook({ user, id });


    if (error) return <ErrorMessage {...{ error, resetError }} />;

    if (!user) return (
        <>
            <Header>
                <BackButton />
                <h1>Details</h1>
                <WasteLessLite />
            </Header>

            <main>
                <h1>Hi! you must be signed in to be here</h1>
                <div className="buttons">
                    <Link to="/sign-up">
                        <Button className="btn btn-primary">Sign Up</Button>
                    </Link>
                    <Link to="/sign-in" preload>
                        <Button className="btn btn-primary btn--border">Sign In</Button>
                    </Link>
                </div>
            </main>

            <aside>
                <Nav user={user} />
            </aside>
        </>
    );

    if (dataLoading) return <div>Data Loading...</div>;

    // TODO 404 component
    if (!product) return (<div>404 Product does not exist</div>);

    console.log(product.user.rating);


    return (
        <>
            <Header>
                <BackButton />
                <h1>Details</h1>
                <WasteLessLite />
            </Header>

            <main className="product__page">
                <ProductArticle product={product} />
            </main>

            <aside>
                <Nav user={user} />
            </aside>
        </>
    );
}

const useHook = ({ id }) => {
    const { product, error: productError, loading } = useFirebaseProductByID(id);
    const { error, resetError } = useError(productError);

    return { error, resetError, loading, product, owner: product?.user };
};