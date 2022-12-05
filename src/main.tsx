import { render } from "preact";
import { StrictMode } from "preact/compat";
import { App } from "./app";

render(<StrictMode>
    <App />
</StrictMode>, document.getElementById("app") as HTMLElement);
