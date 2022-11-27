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

    console.log(location);

    const className = "nav__icon";

    return (
        <nav className="nav--main">
            <Link to="/settings/">
                <Profile className={className} />
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
            </Link>
        </nav>
    );
};

export default NavMenu;