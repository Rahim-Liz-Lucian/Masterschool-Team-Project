import { ComponentChildren } from "preact";
import { forwardRef } from "preact/compat";
import { flatten, For } from "~/lib";
import { Props } from "~/lib/types";
import styles from "./form.module.css";

type ControlProps = Props<HTMLInputElement>;

export const Control = forwardRef<HTMLInputElement, ControlProps>(({ children, ...props }, ref) => {
    return (
        <label className={styles.control}>
            <span>{children}</span>
            <input {...props} ref={ref} />
        </label>
    );
});

export const Checkbox = ({ children, ...props }: ControlProps) => {
    return (
        <label className={styles.checkbox}>
            <input {...props} type="checkbox" />
            <span>{children}</span>
        </label>
    );
};

type SelectProps =
    & { title: string, items: unknown[]; }
    & { children: (item: unknown) => ComponentChildren; }
    & Omit<Props<HTMLSelectElement>, "children">;

/**
 * NOTE - Unknown are used here because the items are not known at compile time.
 */
export function Select<T>({ title, items, children, ...props }: SelectProps) {
    return (
        <label className={styles.control}>
            {title && <span>{title}</span>}
            <For {...props} tagName="select" items={items}>
                {children}
            </For>
        </label>
    );
};

type FormProps =
    & { classList: string[]; }
    & Props<HTMLFormElement>;

export const Form = forwardRef<HTMLFormElement, FormProps>(({ classList = [], ...props }, ref) => {
    return (
        <form {...props} ref={ref} className={flatten(styles.form, ...classList, props.className)}>
            {props.children}
        </form>
    );
});