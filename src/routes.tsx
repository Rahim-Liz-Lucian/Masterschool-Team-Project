import { lazy } from "preact/compat";

const files = import.meta.glob("/src/route/**/[a-z[]*.(ts|js|tsx|jsx)");

export const routes = Object.keys(files).map((filePath) => {
    const path = filePath
        .replace(/\/src\/route|index|\.(ts|js|tsx|jsx)$/g, "")
        .replace(/\[\.{3}.+\]/, "*")
        .replace(/\[(.+)\]/, ":$1");

    return { path, Page: lazy(files[filePath]) };
});
