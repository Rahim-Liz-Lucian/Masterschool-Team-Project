import { onAuthStateChanged } from "firebase/auth";
import { Suspense, useEffect } from "preact/compat";
import { Route, Switch } from "wouter-preact";
import { fireAuth, authCtx, authLoaded } from "./firebase";
import { routes } from "./routes";

export function App() {
    useEffect(() => {
        return onAuthStateChanged(fireAuth, next => {
            console.log("render");
            authCtx.value = next;
            authLoaded.value = true;
        });
    }, []);

    return (
        // @ts-ignore
        <Suspense fallback={<div>App Loading...</div>}>
            <Switch>{routes.map(({ path, Page }) => (
                <Route path={path}>
                    {/* @ts-ignore */}
                    {(params) => <Page {...params} />}
                </Route>
            ))}</Switch>
        </Suspense>
    );
}