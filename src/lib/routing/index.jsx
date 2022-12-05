import { Link, Redirect } from "wouter-preact";

export const Protected = ({ user, to = "/", children }) => {
    return !user ? <Redirect to={to} replace /> : children;
};

export const Navigate = ({ to = "/", element, component, children }) => {
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
