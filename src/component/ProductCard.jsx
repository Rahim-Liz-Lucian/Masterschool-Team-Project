import "./product-card.css";

import { relativeDays } from "~/utils";
import { Link } from "wouter-preact";

const ProductCard = ({ product }) => {
    const expirationDate = product.expirationDate.toLocaleDateString();
    const createdAt = relativeDays(product.createdAt.getTime());

    return (
        <Link to={`/products/${product.uid}`} title={`View more on ${product.user.displayName}'s ${product.title} upload`} className="product__card">
            <img className="product__thumbnail" src={product.thumbnailURL} alt={product.description} />
            <div className="product__list">
                <p className="product__title">{product.title}</p>

                <div class="product__info">
                    <p>{product.user.location.city}</p>
                    <p>{expirationDate}</p>
                    <p>{createdAt}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
// FIXME needs to be moved outside of base