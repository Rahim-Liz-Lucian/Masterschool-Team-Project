import styles from "./product.module.css";
import fallbackURL from "~/assets/img/product-fallback.png";
import { flatten, formatDate, formatRelativeDate } from "~/lib";
import { UserCard } from "../user";
import { For } from "~/lib";
import { Link } from "wouter-preact";
import { Img } from "../assets";

export const ProductCard = ({ data: { product: { thumbnailURL = fallbackURL, ...product }, user }, ...props }) => {

    return (
        <article {...props} className={styles.card}>
            <h3 className={styles.header}>{product.title}</h3>
            <Img src={thumbnailURL} alt="" fallback={fallbackURL} />

            <ul>
                <li>{user.location.city}</li>
                <li>{formatDate(product.expirationDate, "en-UK")}</li>
                <li>{formatRelativeDate(product.createdAt)}</li>
            </ul>
        </article>
    );
};

export const ProductArticle = ({ data: { product, user }, ...props }) => {
    return (
        <article className={flatten(styles.article, props.className)}>
            <h2 className={styles.header}>{product.title}</h2>
            <Img src={product.thumbnailURL} alt="" fallback={fallbackURL} />

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
        <For {...props} type="section" items={products} className={flatten(styles.list)}>
            {({ product, user }) => (
                <Link to={`/products/${product.uid}`} replace>
                    <ProductCard data={{ product, user }} />
                </Link>
            )}
        </For>
    );
};