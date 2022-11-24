import { render } from "preact";
import { StrictMode } from "preact/compat";
import { App } from "./app";
// FIXME remove this
// import './index.css';

render(<StrictMode>
    <App />
</StrictMode>, document.getElementById("app") as HTMLElement);
