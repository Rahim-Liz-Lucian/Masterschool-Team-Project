import { User } from "firebase/auth";
import { ComponentChildren, VNode } from "preact";
import { JSX, Children } from "preact/compat";
import { Link, LinkProps, Redirect, RedirectProps, RouteProps, SwitchProps } from "wouter-preact";

type ProtectedProps =
    & { user: User | null; }
    & { children: VNode<RouteProps<undefined, string>>[]; }
    & Omit<RedirectProps, "children">;

/**
 * FIXME - TypeScript is not happy with this component.
 */
export const Protected = ({ user, to = "/", children }: ProtectedProps) => {
    return !user ? <Redirect to={to} replace /> : children;
};

type NavigateProps =
    & {
        element?: JSX.Element["type"];
        component?: JSX.Element;
        children?: typeof Children;
    }
    & Pick<LinkProps, "to">;

export const Navigate = ({ to = "/", element, component, children }: NavigateProps) => {
    if (element) {
        const Component = element;
        return (
            <Link to={to}>
                <Component />
            </Link>
        );
    }

    if (component) return (
        <Link to={to}>
            {component}
        </Link>
    );

    return (
        <Link to={to}>
            {children}
        </Link>
    );
};
