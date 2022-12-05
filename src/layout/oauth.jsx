import styles from "./oauth.module.css";
export const OAuth = props => {
    return (
        <menu {...props} className={styles.oauth} >
            {props.children}
        </menu>
    );
};