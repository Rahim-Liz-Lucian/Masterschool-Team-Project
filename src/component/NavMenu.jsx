import { Link, useLocation } from "wouter-preact";
import { Add, Home, Message, More, Profile } from "./core";

const NavMenu = ({ user }) => {
    const [location] = useLocation();

    if (!user) return (
        <div className="nav--main">
            <Link className="button" to="/sign-in">Login</Link>
            <Link className="button--secondary" to="/sign-up">Sign Up</Link>
        </div>
    );

    const className = "nav__icon";

    linksSync.forEach(link => {
        console.log({ path: link.path, bool: link.path === "/" + window.location.pathname.split`/`[1] });
    });

    return (
        <nav className="nav--main">
            {linksSync.map(link => ({ ...link, className: "/" + window.location.pathname.split`/`[1] === link.path ? "nav__icon--active" : "nav__icon" })).map(({ path, Component, className }) => (
                <Link to={path}>
                    <Component className={className} />
                </Link>
            ))}
            {/* <Link to="/settings/">
                <Profile className={[className, undefined].join`--`} />
            </Link>
            <Link to="/upload">
                <Add className={className} />
            </Link>
            <Link to="/">
                <Home className={className} />
            </Link>
            <Link to="/people" disabled>
                <Message className={className} disabled />
            </Link>
            <Link to="/misc">
                <More className={className} />
            </Link> */}
        </nav>
    );
};

const linksSync = [
    { path: "/settings", Component: Profile },
    { path: "/upload", Component: Add },
    { path: "/", Component: Home },
    { path: "/people", Component: Message },
    { path: "/misc", Component: More },
];

const activeLink = () => {
    return linksSync.map(link => ({ ...link, className: window.location.pathname.split`/`[1] === link.path ? "nav__icon--active" : "nav__icon" }));
};

export default NavMenu;