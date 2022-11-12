import { useState } from 'preact/hooks';
import IndexPage from "./routes";

export function App() {
    const [count, setCount] = useState(0);


    return (
        <IndexPage />
    );
}
