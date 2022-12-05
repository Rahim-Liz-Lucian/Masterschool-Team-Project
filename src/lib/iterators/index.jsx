import { h } from "preact";
import { memo } from "preact/compat";

/** NOTE no error handling currently exists */
export const For = memo(({ type = "div", items, children, ...props }) => {
    if (typeof children !== "function") {
        throw new Error("Container must have a function as children");
    }

    // NOTE if items is empty then render an else view (such as "No Products Found")

    // NOTE use a more semantic tag for the container
    return h(type, props, items.map(data => children(data)));
});

