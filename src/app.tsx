import { Link, Route, Switch } from "wouter-preact";
// NOTE these are just for examples
import TypedPage from "./route/x/typed";
import StyledPage from "./route/x/styled";
import RealTimePage from "./route/x/real-time";
// NOTE app starts here
import NotFoundPage from "./route/404";
import DashBoardPage from "./route/dashboard";
import SignUpPage from "./route/sign-up";
import SignInPage from "./route/sign-in";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "preact/hooks";
import { fireAuth, authCtx, isPending } from "./firebase";

const useFirebaseAuthData = () => {

    useEffect(() => {
        return onAuthStateChanged(fireAuth, next => {
            [authCtx.value, isPending.value] = [next, false];
        });
    }, []);

    return [authCtx.value, isPending.value] as const;
};

export function App() {
    const [user, pending] = useFirebaseAuthData();

    return (
        <Switch>
            <Route path="/">
                {pending ?
                    <div>Loading...</div>
                    :
                    (<div>
                        This is the home page
                        {user ?
                            <Link href="/dashboard">Goto Dashboard</Link>
                            :
                            (<>
                                <Link href="/sign-in">Sign In?</Link>
                                <Link href="/sign-up">Sign Up?</Link>
                            </>)}
                    </div>)
                }
            </Route>

            <Route path="/dashboard" component={DashBoardPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />

            <Route path="/x/typed" component={TypedPage} />
            <Route path="/x/styled" component={StyledPage} />
            <Route path="/x/real-time" component={RealTimePage} />

            <Route component={NotFoundPage} />
        </Switch>
    );
}