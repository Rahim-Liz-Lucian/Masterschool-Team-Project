import { Link, Route } from "wouter-preact";
// NOTE these are just for examples
import TypedPage from "./route/x/typed";
import StyledPage from "./route/x/styled";
// NOTE app starts here
import DashBoardPage from "./route/dashboard";
import SignUpPage from "./route/sign-up";
import SignInPage from "./route/sign-in";
import { authContext, counter, setupAuthObserver } from "./firebase";
import { useEffect } from "preact/hooks";

export function App() {
    // const AuthContext = authContext();

    useEffect(() => {
        const unsubscribe = setupAuthObserver();
        // maybe this will work
        return unsubscribe;
    }, []);

    return (
        <div>
            <Route path="/">
                {counter}
                This is the home page
                <Link href="/sign-in">Sign In?</Link>
                <Link href="/sign-up">Sign Up?</Link>
            </Route>

            <Route path="/dashboard" component={DashBoardPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />

            <Route path="/x/typed" component={TypedPage} />
            <Route path="/x/styled" component={StyledPage} />
        </div>
    );
}
