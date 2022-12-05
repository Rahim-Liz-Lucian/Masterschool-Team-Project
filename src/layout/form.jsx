import { forwardRef } from "preact/compat";
import styles from "./form.module.css";

export const Form = forwardRef(({ children, ...props }, ref) => {
    return (
        <form {...props} ref={ref} className={styles.form}>
            {children}
        </form>
    );
});