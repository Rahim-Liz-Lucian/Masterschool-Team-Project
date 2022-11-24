import { Link } from "wouter-preact";
import Back from "../../component/base/Back";
import Product from "../../component/base/Product";
import Button from "../../component/base/Button";
import {
  useFirebaseAuth,
  useFirebaseCollectionData,
} from "../../firebase/hooks";
import fallback from "../../assets/brand/fallback.png";
import "../../index.css";
import { AiFillStar } from "react-icons/ai";
import { BsPersonCircle, BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { findProduct } from "../../firebase/functions";
import { collectionGroup } from "firebase/firestore";

export default function Details(props) {
  const [auth, isLoading] = useFirebaseAuth();
  // const [products, productsError, productsLoading] = useFirebaseCollectionData(
  //   (store) => {
  //     // TODO setup for where clause

  //     return collectionGroup(store, `products`);
  //   },
  //   [auth]
  // );

  // // query to get single element

  // products.forEach(async (pro) => {
  //   const product = await findProduct(pro.userRef.path, pro.uid);
  //   console.log(product.ref.path);
  // });

  if (!auth)
    return (
      <div className="page">
        <h1>Hi! you must be signed in to be here</h1>
        <div className="buttons">
          <Link to="/sign-up">
            <Button classes="btn btn-primary">Sign Up</Button>
          </Link>
          <Link to="/sign-in">
            <Button classes="btn btn-primary btn--border">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  if (auth) {
    console.log(props);
    return (
      <div className="page product-page">
        <Back />
        <h1>product Title</h1>
        <img src={fallback} alt="" />
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
      </div>
    );
  }
}
