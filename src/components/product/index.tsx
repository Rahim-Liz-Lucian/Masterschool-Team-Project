import styles from "./product.module.css";
import fallbackURL from "~/assets/img/product-fallback.png";
import { flatten, formatDate, formatRelativeDate, Product, User } from "~/lib";
import { UserCard } from "../user";
import { For } from "~/lib";
import { Link } from "wouter-preact";
import { Img } from "../assets";
import { Props } from "~/lib/types";

type CardProps = Props<HTMLElement, { product: Product, user: User; }>;

export const ProductCard = ({ product: { thumbnailURL = fallbackURL, ...product }, user, ...props }: CardProps) => {

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

type ArticleProps = Props<HTMLElement, { data: { product: Product, user: User; }; }>;

export const ProductArticle = ({ data: { product, user }, ...props }: ArticleProps) => {
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

type ListProps = Props<HTMLElement, { products: { product: Product, user: User; }[]; }>;

export const ProductList = ({ products, ...props }: ListProps) => {
    return (
        <For {...props} tagName="section" items={products} className={flatten(styles.list)}>
            {({ product, user }) => (
                <Link to={`/products/${product.uid}`} replace>
                    <ProductCard product={product} user={user} />
                </Link>
            )}
        </For>
    );
};