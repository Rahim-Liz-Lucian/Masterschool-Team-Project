import avatarFallback from "~/assets/brand/avatar-fallback.jpg";
import { banner } from "./banner.module.css";

export const Banner = ({ user, className, ...props }) => {
    const photoURL = user?.photoURL ?? avatarFallback;

    return (
        <figure className={banner}>
            <figcaption>{user.displayName}</figcaption>
            <img src={photoURL} alt="avatar" />
        </figure>
    );
};