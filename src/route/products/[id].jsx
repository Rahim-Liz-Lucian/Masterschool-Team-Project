import { doc } from "firebase/firestore";
import { useEffect, useState } from "preact/hooks";
import { AiFillStar } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsFillTelephoneOutboundFill, BsPersonCircle } from "react-icons/bs";
import { Link } from "wouter-preact";
import Button, { BackButton } from "~/component/core/button";
import ErrorMessage from "~/component/ErrorMessage";
import { getUserProfile, useFireBaseAuth, useFirebaseDocument } from "~/firebase";
import { useError } from "~/utils";
import avatarFallback from "../../assets/brand/avatar-fallback.jpg";

import "./[id].css";

export default function ProductPage({ id, ...props }) {
    const user = useFireBaseAuth();

    const { error, resetError, product, dataLoading, owner } = useHook({ user, id });

    const thumbnailURL = product?.thumbnailURL ?? avatarFallback;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    if (!user) return (
        <>
            <header className="header">
                <BackButton className="header__nav" />
                <h1 className="header__title">Product</h1>
                <img className="header__icon" src={avatarFallback} alt="" />
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
        </>
    );

    if (dataLoading) return <div>Data Loading...</div>;

    // TODO 404 component
    if (!product) return (<div>404 Product does not exist</div>);

    console.log(owner);

    return (
        <>
            <header className="header">
                <BackButton className="header__nav" />
                <h1 className="header__title">Details</h1>
                <img className="header__icon" src={avatarFallback} alt="" />
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
                    <BsPersonCircle size={"2rem"} />
                    <h3>User Name</h3>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                </div>
                <div className="buttons">
                    <Button classes="btn btn-primary">
                        <BsFillTelephoneOutboundFill />
                        Call
                    </Button>
                    <Button classes="btn btn-primary btn--border">
                        <FaShare />
                        Share
                    </Button>
                </div>

            </main>
        </>
    );
}

const useHook = ({ id }) => {
    const { error, setError, resetError } = useError();


    const [product, productError, productLoading] = useFirebaseDocument(store => {
        return doc(store, `products/${id}`);
    }, [id]);

    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            // error handling should go here
            try {
                const snapshot = await getUserProfile(product?.userRef);
                setUser(snapshot);
                // setDataLoading(false);

            } catch (error) {
                setError(error);
            }
        })();
    }, [product]);

    useEffect(() => {
        productError && setError(productError);
    }, []);

    return { error, resetError, dataLoading: productLoading, product, owner: user };
};