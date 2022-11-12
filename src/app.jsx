import Index from "./routes";
import { Link, Route } from "wouter";

// may need a stylesheet reset
export function App() {
    // Use Title and Wrapper like any other React component – except they're styled!
    return (
        // <Index></Index>
        <>
            <Route path="/" component={Index} />
            <Route path="/users/:username">
                {(params) => <div>Hello, {params.username}!</div>}
            </Route>
        </>
    );
}
