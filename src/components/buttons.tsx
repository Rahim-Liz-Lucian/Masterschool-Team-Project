import React, { JSX } from "preact/compat";
import { Props } from "~/lib/types";
import styles from "./buttons.module.css";

const variants = ["primary", "secondary", "caution"] as const;
type Variants = typeof variants[number];

type ButtonProps = Props<HTMLButtonElement, { variant?: Variants; }>;

export const Button = ({ variant = "primary", ...props }: ButtonProps) => (
    <button {...props} className={styles[variant]}>{props.children}</button>
);

type AnchorProps = Props<HTMLAnchorElement, { variant?: Variants; }>;

export const A = ({ variant = "primary", ...props }: AnchorProps) => (
    <a {...props} className={styles[variant]}>{props.children}</a>
);