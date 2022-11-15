import { lazy, Suspense } from "preact/compat";
import { Route, Switch } from "wouter-preact";

const files = import.meta.glob('/src/route/**/[a-z[]*.(tsx|jsx)');

// console.log(files);

const pages = Object.keys(files)
    .sort()
    .reverse()
    .map(filePath => {
        const path = filePath
            .replace(/\/src\/route|index|\.(tsx|jsx)$/g, '')
            .replace(/\[\.{3}.+\]/, '*')
            .replace(/\[(.+)\]/, ':$1');

        // @ts-ignore
        const Page = lazy(files[filePath]);

        // @ts-ignore
        return (
            <Route key={path} path={path}>
                {/* @ts-ignore */}
                {params => <Page {...params} />}
            </Route>
        );
    }).concat(<div>Didn't work</div>);

export function App() {
    return (
        // @ts-ignore
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>{pages}</Switch>
        </Suspense>
    );
}