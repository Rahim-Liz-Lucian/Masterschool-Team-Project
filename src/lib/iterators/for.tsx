import { ComponentChildren } from "preact";
import { JSX } from "preact/compat";

/**
 * TODO make this an exported type.
 */
type ForProps<T extends keyof HTMLElementTagNameMap, Item extends any> =
    & Omit<JSX.HTMLAttributes<HTMLElementTagNameMap[T]>, "children">
    & { tagName: T; items: Item[]; children: (item: Item) => ComponentChildren; };

export function For<TagName extends keyof HTMLElementTagNameMap, Item extends any>({ tagName, items, children, ...props }: ForProps<TagName, Item>) {
    if (typeof children !== "function") {
        throw new Error("Container must have a function as children");
    }

    // @ts-ignore
    return h(tagName, props, items.map(data => children(data)));
};
