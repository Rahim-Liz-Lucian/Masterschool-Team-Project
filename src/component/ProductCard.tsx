import { ProductData } from "../firebase/data";

export default function Card({ product, ...props }: React.HTMLAttributes<HTMLButtonElement> & { product: ProductData; }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h3>{product.title}</h3>

            <p>Quantity: {product.quantity}</p>

            <img src={product.thumbnailUrl} alt={product.uid} width={100} />

            <button onClick={props.onClick}>Delete</button>
        </div>
    );
}