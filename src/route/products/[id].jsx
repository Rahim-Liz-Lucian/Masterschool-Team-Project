import avatarFallback from "../../assets/brand/avatar-fallback.jpg";

import { Link } from "wouter-preact";
import ErrorMessage from "~/component/ErrorMessage";
import { useFireBaseAuth, useFirebaseProductByID } from "~/firebase";
import { useError } from "~/utils";
import { Star, Share, Telephone, Person, BackButton, Button, LinkAvatar, Avatar, WasteLessLite } from "~/component/core";
import NavMenu from "~/component/NavMenu";


export default function ProductPage({ id, ...props }) {
    const user = useFireBaseAuth();

    const { error, resetError, product, loading: dataLoading } = useHook({ user, id });

    const thumbnailURL = product?.thumbnailURL ?? avatarFallback;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    if (!user) return (
        <>
            <header className="header">
                <BackButton />
                <h1 className="header__title">Details</h1>
                <WasteLessLite className="icon" />
            </header>

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

            <NavMenu user={user} />
        </>
    );

    if (dataLoading) return <div>Data Loading...</div>;

    // TODO 404 component
    if (!product) return (<div>404 Product does not exist</div>);

    return (
        <>
            <header className="header">
                <BackButton />
                <h1 className="header__title">Details</h1>
                <WasteLessLite className="icon" />
            </header>

            <main className="product__page">
                <h2 className="product__title">product Title</h2>
                <img className="product__thumbnail" src={thumbnailURL} alt="" />
                <div>
                    <p>location</p>
                    <p>date</p>
                    <p>days ago</p>
                </div>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
                    et exercitationem nisi quae officia tempora magni explicabo.
                </p>
                <div>
                    <Person size={"2rem"} />
                    <h3>User Name</h3>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                </div>
                <div className="buttons">
                    <Button classes="btn btn-primary">
                        <Telephone />
                        Call
                    </Button>
                    <Button classes="btn btn-primary btn--border">
                        <Share />
                        Share
                    </Button>
                </div>

            </main>

            <aside>
                <NavMenu user={user} />
            </aside>
        </>
    );
}

const useHook = ({ id }) => {
    const { product, error: productError, loading } = useFirebaseProductByID(id);
    const { error, resetError } = useError(productError);

    return { error, resetError, loading, product, owner: product?.user };
};