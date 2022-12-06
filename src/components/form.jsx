import { forwardRef } from "preact/compat";
import { flatten, For } from "~/lib";
import styles from "./form.module.css";

export const Control = forwardRef(({ children, ...props }, ref) => {
    return (
        <label className={styles.control}>
            <span>{children}</span>
            <input {...props} ref={ref} />
        </label>
    );
});

export const Checkbox = ({ children, ...props }) => {
    return (
        <label className={styles.checkbox}>
            <input {...props} type="checkbox" />
            <span>{children}</span>
        </label>
    );
};

export const Select = ({ title, items, children, ...props }) => {
    return (
        <label className={styles.control}>
            {title && <span>{title}</span>}
            <For {...props} type="select" items={items}>
                {children}
            </For>
        </label>
    );
};

export const Form = forwardRef(({ classList = [], children, ...props }, ref) => {
    return (
        <form {...props} ref={ref} className={flatten(styles.form, ...classList, props.className)}>
            {children}
        </form>
    );
});