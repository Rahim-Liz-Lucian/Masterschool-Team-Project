import styles from "./button.module.css";

import { Link as WouterLink } from "wouter-preact";
import { Back } from "./icons";

export const Button = ({ className = "primary", ...props }) => {
    return (
        <button className={styles[className]}  {...props}>
            {props.children}
        </button>
    );
};

export const Link = ({ className, ...props }) => {
    return <WouterLink className={styles[className]} {...props}>{props.children}</WouterLink>;
};


export const BackButton = () => {
    return (
        <WouterLink to=".." >
            <Back className={styles.back} />
        </WouterLink>
    );
};
