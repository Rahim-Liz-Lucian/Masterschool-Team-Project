import avatarFallback from "~/assets/brand/avatar-fallback.jpg";
import { Facebook, Google } from "../core";
import { banner, oauth } from "./container.module.css";

export const Banner = ({ user, className, ...props }) => {
    const photoURL = user?.photoURL ?? avatarFallback;

    return (
        <figure className={banner}>
            <figcaption>{user.displayName}</figcaption>
            <img src={photoURL} alt="avatar" />
        </figure>
    );
};

export const OAuth = props => {
    return (
        <div className={oauth}>
            {props.children}
        </div>
    );
};