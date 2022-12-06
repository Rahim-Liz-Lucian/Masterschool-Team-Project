import { Props } from "~/lib/types";
import styles from "./oauth.module.css";

export const OAuth = (props: Props<HTMLMenuElement>) => {
    return (
        <menu {...props} className={styles.oauth} >
            {props.children}
        </menu>
    );
};