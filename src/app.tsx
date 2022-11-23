/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Suspense } from "preact/compat";
import { Redirect, Route, Switch } from "wouter-preact";
import { initApp } from "./firebase/data";
import { routes } from "./routes";

export function App() {
    const { isLoading } = initApp();

    if (isLoading) return (
        <div>Custom hook is loading...</div>
    );

    return (
        // @ts-ignore
        <Suspense fallback={<div>App Loading...</div>}>
            <Switch>
                {routes.map(({ path, Page }) => (
                    <Route path={path}>
                        {/* @ts-ignore */}
                        {(params) => <Page {...params} />}
                    </Route>
                )).concat(<Redirect to="/"></Redirect>)}
            </Switch>
        </Suspense>
    );
}