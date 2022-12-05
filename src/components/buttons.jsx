import styles from "./buttons.module.css";

export const Button = ({ variant = "primary", children, ...props }) => {
    return (
        <button {...props} className={styles[variant]}>
            {children}
        </button>
    );
};