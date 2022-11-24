import { Link } from "wouter-preact";
import fallback from "../../assets/brand/fallback.png";
import Button from "./Button";
const Product = (props) => {
  return (
    <div className="product">
      <img src={props.image ? props.image : fallback} alt="empty " />
      <div className="product-info">
        <h3>{props.title}</h3>
        <div>
          <p>{props.location}</p>
          <p>{props.date}</p>
          <p>{props.daysAgo} days ago</p>
        </div>
        <Link href={`/products/${props.id}`} title={props.uid}>
          <Button classes={"btn btn-secondary"}>More</Button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
