import { Link as WouterLink, useLocation } from "wouter-preact";
import { Add, Home, Message, More, Profile } from "../core";

import { nav, link, linkActive } from "./nav.module.css";

const linksSync = [
    { path: "/settings", component: Profile },
    { path: "/upload", component: Add },
    { path: "/", component: Home },
    { path: "/people", component: Message },
    { path: "/misc", component: More },
];


export const Nav = ({ user }) => {

    if (!user) return (
        <div className={nav}>
            <WouterLink to="/sign-in">Login</WouterLink>
            <WouterLink to="/sign-up">Sign Up</WouterLink>
        </div>
    );

    return (
        <nav className={nav}>
            {linksSync.map((props) => (
                <Link key={props.path} {...props} />
            ))}
        </nav>
    );
};

const Link = ({ path, component: Component }) => {
    const className = "/" + window.location.pathname.split`/`[1] === path ? linkActive : link;

    return (
        <WouterLink to={path}>
            <Component className={className} />
        </WouterLink>
    );
};
