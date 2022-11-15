import { Link, Redirect, Route, RouteProps, Switch, useRoute } from "wouter-preact";
// NOTE these are just for examples
import TypedPage from "./route/x/typed";
import StyledPage from "./route/x/styled";
import RealTimePage from "./route/x/real-time";
// NOTE app starts here
import NotFoundPage from "./route";
import DashBoardPage from "./route/dashboard";
import SettingsPage from "./route/settings";
import SignUpPage from "./route/sign-up";
import SignInPage from "./route/sign-in";
import { useFirebaseAuthData } from "./firebase/hook";
import { User } from "firebase/auth";
import { h } from "preact";
import { Suspense, lazy } from "preact/compat";




export function App() {
    const [user, pending] = useFirebaseAuthData();

    return (
        <Switch>
            <Route path="/">
                {pending ?
                    <div>Loading...</div>
                    :
                    (<div>
                        <h1>This is the home page</h1>
                        {user ?
                            <nav>
                                <Link href="/dashboard">Goto Dashboard</Link>
                            </nav>
                            :
                            (<nav>
                                <Link href="/sign-in">Sign In?</Link>
                                <Link href="/sign-up">Sign Up?</Link>
                            </nav>)}
                    </div>)
                }
            </Route>


            <Route path="/dashboard" component={DashBoardPage} />
            <Route path="/settings" component={SettingsPage} />
            {/* <Route path="/dashboard" component={DashBoardPage} /> */}

            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />

            <Route path="/x/typed" component={TypedPage} />
            <Route path="/x/styled" component={StyledPage} />
            <Route path="/x/real-time" component={RealTimePage} />

            <Route component={NotFoundPage} />
        </Switch>
    );
}

function RouteRequired<T>({ required, redirect, ...props }: RouteProps & { redirect?: string; required: T | null; }) {
    return (required) ? <Route {...props} /> : <Redirect to={redirect ?? "/"} />;
}
