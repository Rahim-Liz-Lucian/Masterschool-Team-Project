import { Product } from "../firebase";

export default function Card({ product, ...props }: React.HTMLAttributes<HTMLButtonElement> & { product: Product; }) {
    return (
        <div>
            Title {product.title}
            <br />

            Quantity {product.quantity}
            <br />

            <img src={product.thumbnailUrl} alt={product.uid} width={100} />
            <br />

            <button onClick={props.onClick}>Delete</button>
        </div >
    );
}