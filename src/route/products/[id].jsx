import avatarFallback from "../../assets/brand/avatar-fallback.jpg";
import "./[id].css";
import { Link } from "wouter-preact";
import ErrorMessage from "~/component/ErrorMessage";
import { useFireBaseAuth, useFirebaseProductByID } from "~/firebase";
import { useError, relativeDays } from "~/utils";
import {
  Star,
  Share,
  Telephone,
  Person,
  BackButton,
  Button,
  LinkAvatar,
  Avatar,
  WasteLessLite,
} from "~/component/core";
import NavMenu from "~/component/NavMenu";

export default function ProductPage({ id, ...props }) {
  const user = useFireBaseAuth();

  const {
    error,
    resetError,
    product,
    loading: dataLoading,
  } = useHook({ user, id });
  console.log(product);

  const thumbnailURL = product?.thumbnailURL ?? avatarFallback;
  const expirationDate = product?.expirationDate
    ? product.expirationDate.toLocaleDateString()
    : null;
  const createdAt = product?.createdAt
    ? relativeDays(product.createdAt.getTime())
    : null;

  if (error) return <ErrorMessage {...{ error, resetError }} />;

  if (!user)
    return (
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
  if (!product) return <div>404 Product does not exist</div>;

  return (
    <>
      <header className="header">
        <BackButton />
        <h1 className="header__title">Details</h1>
        <WasteLessLite className="icon" />
      </header>

      <main className="product__page">
        <h2 className="product__title">{product.title}</h2>
        <img className="product__thumbnail" src={thumbnailURL} alt="" />
        <div className="product__details">
          <p>{product.user.location.city}</p>
          <p>{expirationDate}</p>
          <p>{createdAt}</p>
        </div>
        <p>{product.description}</p>
        <div className="product__user">
          <Person size={"1.5rem"} />
          <h3>{product.user.displayName}</h3>
          <div>
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>
        <div className="buttons">
          <Button classes="button">
            <Telephone />
            Call
          </Button>
          <Button classes="button-secondary">
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
