import { Share, Star, Telephone } from "./icons";
import styles from "./user.module.css";
import photoFallback from "~/assets/img/avatar-fallback.jpg";
import { Button } from "./buttons";

export const UserBanner = ({ user, className, ...props }) => {
    const photoURL = user?.photoURL ?? photoFallback;

    return (
        <figure className={styles.banner}>
            <figcaption>{user.displayName}</figcaption>
            <img src={photoURL} alt="avatar" />
        </figure>
    );
};

export const UserCard = ({ user: { photoURL = photoFallback, ...user }, ...props }) => {
    return (
        <section className={styles.card}>
            <div>
                <img src={photoURL} alt="" />
                <h6>{user.displayName}</h6>
                <UserRating />
            </div>

            <div className="inline-container">
                <Button>
                    <Telephone />
                    <span>Call</span>
                </Button>
                <Button variant="secondary">
                    <Share />
                    <span>Share</span>
                </Button>
            </div>
        </section>
    );
};

export const UserRating = ({ ...props }) => {
    return (
        <div className={styles.rating}>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
        </div>
    );
};