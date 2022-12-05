import styles from "./product.module.css";
import thumbnailFallback from "~/assets/img/product-fallback.png";
import { formatDate, formatRelativeDate } from "~/lib";
import { UserCard } from "./user";
import { For } from "~/lib";
import { Link } from "wouter-preact";

export const ProductCard = ({ data: { product: { thumbnailURL = thumbnailFallback, ...product }, user }, ...props }) => {
    return (
        <article {...props} className={styles.card}>
            <h3>{product.title}</h3>
            <img src={thumbnailURL} alt="" />

            <ul>
                <li>{user.location.city}</li>
                <li>{formatDate(product.expirationDate, "en-UK")}</li>
                <li>{formatRelativeDate(product.createdAt)}</li>
            </ul>
        </article>
    );
};

export const ProductArticle = ({ data: { product: { thumbnailURL = thumbnailFallback, ...product }, user }, ...props }) => {
    return (
        <article className={styles.article}>
            <h2>{product.title}</h2>
            <img src={thumbnailURL} alt="" />

            <ul>
                <li>{user.location.city}</li>
                <li>{formatDate(product.expirationDate, "en-UK")}</li>
                <li>{formatRelativeDate(product.createdAt)}</li>
            </ul>

            <p>{product.description}</p>

            <UserCard user={user} />
        </article>
    );
};

export const ProductList = ({ products, ...props }) => {
    return (
        <For {...props} type="section" items={products} className={styles.list}>
            {({ product, user }) => (
                <Link to={`/products/${product.uid}`} replace>
                    <ProductCard data={{ product, user }} />
                </Link>
            )}
        </For>
    );
};