import { Product } from "../firebase/product";

export default function Card({ product }: { product: Product; }) {
    return (
        <div>
            Title {product.title}
            <br />

            Quantity {product.quantity}
            <br />

            <img src={product.thumbnailUrl} alt={product.uid} width={100} />
            <br />
        </div>
    );
}