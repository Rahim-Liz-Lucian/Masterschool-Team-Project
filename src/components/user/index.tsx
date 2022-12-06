import styles from "./user.module.css";
import { Img, Share, Star, Telephone } from "../assets";
import photoFallback from "~/assets/img/avatar-fallback.jpg";
import { A, Button } from "../buttons";
import { Navigate } from "~/lib/routing";
import { Add, Home, Message, More, Profile } from "../assets";
import { flatten, useFirebaseAuth } from "~/lib";
import { Props } from "~/lib/types";
import { User } from "firebase/auth";

type BannerProps =
    & { user?: User | null; }
    & Pick<Props<HTMLElement>, "className">;

export const UserBanner = ({ user, className }: BannerProps) => {
    const fallback = `https://source.boringavatars.com/beam/${user?.uid}`;

    return (
        <figure className={styles.banner}>
            <figcaption>{user?.displayName}</figcaption>
            <Img variant="circle" src={user?.photoURL ?? fallback} alt="" fallback={fallback} />
        </figure>
    );
};

type CardProps =
    & { user?: User | null; }
    & Pick<Props<HTMLElement>, "className">;

export const UserCard = ({ user, ...props }: CardProps) => {
    const fallback = `https://source.boringavatars.com/beam/${user?.uid}`;

    return (
        <section className={flatten(styles.card, props.className)}>
            <div className={styles.meta}>
                <Img variant="circle" src={user?.photoURL ?? ""} alt="" fallback={fallback} />
                <h6>{user?.displayName}</h6>
                <UserRating />
            </div>

            <div className={styles.action}>
                <A>
                    <Telephone />
                    <span>Call</span>
                </A>
                <Button variant="secondary">
                    <Share />
                    <span>Share</span>
                </Button>
            </div>
        </section>
    );
};

/**
 * FIXME - This is a placeholder for the actual rating component.
 */
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

export function UserMenu() {
    const user = useFirebaseAuth();

    const fallback = `https://source.boringavatars.com/beam/${user?.uid}`;

    if (!user) return (
        <nav className={styles.menu}>
            <Navigate to="/sign-in" component={<Button>Login</Button>} />
            <Navigate to="/sign-up" component={<Button variant="secondary">Sign Up</Button>} />
        </nav>
    );

    return (
        <nav className={styles.menu}>
            <Navigate to="/settings" component={<Img variant="circle" src={user?.photoURL ?? fallback} alt="" fallback={fallback} />} />
            <Navigate to="/upload" element={Add} />
            <Navigate element={Home} />
            <Navigate element={Message} />
            <Navigate element={More} />
        </nav>
    );
}

