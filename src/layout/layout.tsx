import React from "preact/compat";
import { flatten } from "~/lib";
import styles from "./layout.module.css";

type Props = React.HTMLAttributes<HTMLElement> & { classList?: string[]; };

// classList 

export const Header = ({ classList = [], ...props }: Props) => (
    <header {...props} className={flatten(styles.header, ...classList, props.className)}>
        {props.children}
    </header>
);


export const Main = ({ classList = [], ...props }: Props) => (
    <main {...props} className={flatten(styles.main, ...classList, props.className)}>
        {props.children}
    </main>
);


export const ASide = ({ classList = [], ...props }: Props) => (
    <aside {...props} className={flatten(styles.aside, ...classList, props.className)}>
        {props.children}
    </aside>
);
