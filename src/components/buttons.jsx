import styles from "./buttons.module.css";

export const Button = ({ variant = "primary", children, ...props }) => {
    return (
        <button {...props} className={styles[variant]}>
            {children}
        </button>
    );
};

export const A = ({ variant = "primary", children, ...props }) => {
    return (
        <a  {...props} className={styles[variant]}>
            {children}
        </a>
    );
};