import { forwardRef } from "preact/compat";
import { For } from "~/lib";
import styles from "./input.module.css";

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

export const Select = ({ items, children, ...props }) => {
    return (
        <For {...props} type="select" items={items} className={styles.filter}>
            {children}
        </For>
    );
};