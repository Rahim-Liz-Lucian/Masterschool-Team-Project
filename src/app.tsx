/* eslint-disable @typescript-eslint/ban-ts-comment */
import { onAuthStateChanged } from "firebase/auth";
import { Suspense, useEffect } from "preact/compat";
import { Redirect, Route, Switch } from "wouter-preact";
import { fireAuth } from "./firebase";
import { authCtx, authLoading } from "./firebase/data";
import { routes } from "./routes";

export function App() {
    useEffect(() => {
        return onAuthStateChanged(fireAuth, next => {
            authCtx.value = next;
            authLoading.value = false;
        });
    }, []);


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

// najirab787@invodua.com
// admin123