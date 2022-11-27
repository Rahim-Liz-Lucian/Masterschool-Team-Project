import { article, articleCard, collection, card, title, description, thumbnail, info, stats, statItem } from "./product.module.css";
import avatarFallback from "~/assets/brand/avatar-fallback.jpg";

import { relativeDays } from "~/utils";
import { Link } from "wouter-preact";
import { UserRating } from "./user";
import { Button } from "./core";

export const ProductArticle = ({ product: { user, ...product }, }) => {
    console.log(product, user);

    const thumbnailURL = product?.thumbnailURL ?? avatarFallback;

    const expirationDate = product.expirationDate.toLocaleDateString();
    const createdAt = relativeDays(product.createdAt.getTime());

    return (
        <article className={article}>
            <div className={articleCard}>
                <h2 className={title}>product Title</h2>
                <img className={thumbnail} src={thumbnailURL} alt="" />

                <ul className={stats}>
                    <li className={statItem}>{user.location.city}</li>
                    <li className={statItem}>{expirationDate}</li>
                    <li className={statItem}>{createdAt}</li>
                </ul>

                <p className={description}>{product.description}</p>
            </div>

            <UserRating user={user} />

            {/* contact? */}
            <div>
                <Button>
                    {/* <Telephone /> */}
                    <span>Call</span>
                </Button>
                <Button className="secondary">
                    {/* <Share /> */}
                    <span>Share</span>
                </Button>
            </div>

        </article>
    );
};

export const ProductCard = ({ product }) => {
    const expirationDate = product.expirationDate.toLocaleDateString();
    const createdAt = relativeDays(product.createdAt.getTime());

    return (
        <Link className={card} to={`/products/${product.uid}`} title={`View more on ${product.user.displayName}'s ${product.title} upload`} >
            <img className={thumbnail} src={product.thumbnailURL} alt={product.description} />
            <div className={info}>
                <p className={title}>{product.title}</p>

                <ul class={stats}>
                    <li className={statItem}>{product.user.location.city}</li>
                    <li className={statItem}>{expirationDate}</li>
                    <li className={statItem}>{createdAt}</li>
                </ul>
            </div>
        </Link>
    );
};

export const ProductList = ({ products }) => {
    return (
        <section className={collection}>
            {products.map(product => (
                <ProductCard key={product.uid} product={product} />
            ))}
        </section>
    );
};