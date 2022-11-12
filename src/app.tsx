import { Route } from "wouter";
import SignUpPage from "./routes/sign-up";
import TypedPage from "./routes/x/typed";
import StyledPage from "./routes/x/styled";

export function App() {
    return (
        <>
            <Route path="/">
                This is the home page
            </Route>
            <Route path="/x/typed" component={TypedPage} />
            <Route path="/x/styled" component={StyledPage} />
            <Route path="/sign-up" component={SignUpPage} />
        </>
    );
}
