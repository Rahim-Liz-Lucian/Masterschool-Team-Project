import { Link, Route } from "wouter-preact";
// NOTE these are just for examples
import TypedPage from "./routes/x/typed";
import StyledPage from "./routes/x/styled";
// NOTE app starts here
import DashBoardPage from "./routes/dashboard";
import SignUpPage from "./routes/sign-up";
import SignInPage from "./routes/sign-in";
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

            <Route path="/x/typed" component={TypedPage} />
            <Route path="/x/styled" component={StyledPage} />
        </AuthContext>
    );
}
