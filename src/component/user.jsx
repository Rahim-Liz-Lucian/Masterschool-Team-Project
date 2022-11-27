import { Profile, Star } from "./core";
import { card } from "./user.module.css";

export const UserRating = ({ user }) => {
    return (
        // container for the star ratings
        <div className={card}>
            <Profile />
            <h3>{user.displayName}</h3>
            <div>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
            </div>
        </div>
    );
};