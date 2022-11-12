export default function Card({ product }) {
    return (
        <div>
            <span>Title: {product.title}</span>
            <span>Description: {product.description}</span>
        </div>
    );
}