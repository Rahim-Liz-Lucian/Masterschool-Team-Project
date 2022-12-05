import { useState } from "preact/hooks";
import { Link, Redirect, Route, Switch, useLocation } from "wouter-preact";
import Browse from "./routes";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import Upload from "./routes/upload";
import Product from "./routes/products/[uid]";
import Settings from "./routes/settings";
import UpdateProfile from "./routes/settings/profile";
import { useInitApplication } from "./lib/firebase";
import { Protected } from "./lib/routing";


export function App() {
    const { user, loading } = useInitApplication();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Switch>
            <Route path="/" component={Browse} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/products/:uid" >
                {(params) => <Product uid={params.uid} />}
            </Route>
            <Protected user={user}>
                <Route path="/upload" component={Upload} />
                <Route path="/settings" component={Settings} />
                <Route path="/settings/profile" component={UpdateProfile} />
            </Protected>
        </Switch>
    );
}

// const Protected = ({ user, children }) => {
//     return (!user) ? <Redirect to="/" replace /> : children;
// };
