import { h } from "preact";

/** NOTE no error handling currently exists */
export const For = ({ items, children, ...props }) => {
    if (typeof children !== "function") {
        throw new Error("Container must have a function as children");
    }

    // if items is empty then render an else view (such as "No Products Found")

    // NOTE use a more semantic tag for the container
    return h("section", props, items.map(data => children(data)));
};

