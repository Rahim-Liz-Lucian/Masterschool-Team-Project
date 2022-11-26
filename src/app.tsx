/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./app.css";

import { Redirect, Route, Switch } from "wouter-preact";
import { initApp } from "./firebase";
import { routesSync } from "./routes";

export function App() {
    const { firebaseLoading } = initApp();

    if (firebaseLoading) return (
        <div>Firebase is syncing...</div>
    );

    return (
        <Switch>
            {routesSync.map(({ path, Page }) => (
                <Route path={path}>
                    {/* @ts-ignore */}
                    {(params) => <Page {...params} />}
                </Route>
            )).concat(<Redirect to="/" />)}
        </Switch>
    );
}