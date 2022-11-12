import { Link, Route } from "wouter-preact";
// NOTE these are just for examples
import TypedPage from "./route/x/typed";
import StyledPage from "./route/x/styled";
// NOTE app starts here
import NotFoundPage from "./route/404";
import DashBoardPage from "./route/dashboard";
import SignUpPage from "./route/sign-up";
import SignInPage from "./route/sign-in";
import { authContext } from "./firebase";

export function App() {
    const AuthContext = authContext();

    return (
        <AuthContext>
            <Route path="/">
                This is the home page
                <Link href="/sign-in">Sign In?</Link>
                <Link href="/sign-up">Sign Up?</Link>
            </Route>

            <Route path="/dashboard" component={DashBoardPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />

            <Route path="/*" component={NotFoundPage} />

            <Route path="/x/typed" component={TypedPage} />
            <Route path="/x/styled" component={StyledPage} />
        </AuthContext>
    );
}
