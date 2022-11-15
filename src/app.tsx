import { lazy, Suspense } from "preact/compat";
import { Route, Switch } from "wouter-preact";

const files = import.meta.glob('/src/route/**/[a-z[]*.(ts|js|tsx|jsx)');

// console.log(files);

const pages = Object.keys(files).map(filePath => {
    const path = filePath
        .replace(/\/src\/route|index|\.(ts|js|tsx|jsx)$/g, '')
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1');

    const Page = lazy(files[filePath]);

    return (
        <Route key={path} path={path}>
            {/* @ts-ignore */}
            {params => <Page {...params} />}
        </Route>
    );
});

export function App() {
    return (
        // @ts-ignore
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>{pages}</Switch>
        </Suspense>
    );
}