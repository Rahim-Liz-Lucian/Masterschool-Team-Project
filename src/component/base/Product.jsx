import fallback from "../../assets/brand/fallback.png";
import Button from "./Button";
const Product = ({ image, title, location, date, daysAgo }) => {
  return (
    <div className="product">
      <img src={image} alt="empty " />
      <div className="product-info">
        <h3>{title}</h3>
        <div>
          <p>{location}</p>
          <p>{date}</p>
          <p>{daysAgo} days ago</p>
        </div>
        {/* <Button classes={"btn btn-secondary"}>More</Button> */}
      </div>
    </div>
  );
};

export default Product;
