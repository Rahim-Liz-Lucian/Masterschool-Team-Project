import { nav, link, linkActive } from "./nav.module.css";

import { Add, Home, Message, More, Profile } from "../core";
import { Link as WouterLink } from "wouter-preact";

const linksSync = [
    { path: "/settings", component: Profile },
    { path: "/upload", component: Add },
    { path: "/", component: Home, aliases: ["/products"] },
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

const Link = ({ path, component: Component, aliases }) => {
    const className = ([path, ...(aliases ?? [])].includes("/" + window.location.pathname.split`/`[1])) ? linkActive : link;

    return (
        <WouterLink to={path}>
            <Component className={className} />
        </WouterLink>
    );
};
