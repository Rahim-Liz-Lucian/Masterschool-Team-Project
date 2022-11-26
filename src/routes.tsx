import { lazy } from "preact/compat";

import Index from "./route";
import SignIn from "./route/sign-in";
import SignUp from "./route/sign-up";
import Upload from "./route/upload";
import Profile from "./route/profile";
import ProfileSettings from "./route/profile/settings";
import ProductsID from "./route/products/[id]";

export const routesSync = [
    { path: "/", Page: Index },
    { path: "/sign-in", Page: SignIn },
    { path: "/sign-up", Page: SignUp },
    { path: "/upload", Page: Upload },
    { path: "/profile", Page: Profile },
    { path: "/profile/settings", Page: ProfileSettings },
    { path: "/products/:id", Page: ProductsID }
];

const files = import.meta.glob("/src/route/**/[a-z[]*.(ts|js|tsx|jsx)");

/**
 * This was used mainly for production to speed up development.
 * Below is just an extraction of how it was used within the application
 * 
 * ```js
 * export function App() {
 *   const { isLoading } = initApp();
 *
 *   if (isLoading) return (
 *     <div>App is loading...</div>
 *   );
 *
 *   return (
 *    <Suspense fallback={<div>App Loading...</div>}>
 *      <Switch>
 *        {routes.map(({ path, Page }) => (
 *          <Route path={path}>
 *            {(params) => <Page {...params} />}
 *          </Route>
 *        )).concat(<Redirect to="/" />)}
 *      </Switch>
 *    </Suspense>
 *  )
 * }
 * ```
 */
export const routes: { path?: string, Page: any; }[] = Object.keys(files).map((filePath) => {
    const path = filePath
        .replace(/\/src\/route|index|\.(ts|js|tsx|jsx)$/g, "")
        .replace(/\[\.{3}.+\]/, "*")
        .replace(/\[(.+)\]/, ":$1");

    return { path, Page: lazy(files[filePath]) };
});


