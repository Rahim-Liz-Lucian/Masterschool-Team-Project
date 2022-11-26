import { BsPersonCircle } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import { Link } from "wouter-preact";
import { onDisabledLink } from "~/utils";

const NavMenu = ({ user }) => {
    if (!user) return (
        <div className="nav--main">
            <Link to="/sign-in">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
        </div>
    );

    return (
        <nav className="nav--main">
            <Link to="/">Home</Link>
            <Link to="/people" disabled>Contact</Link>
            <Link to="/upload">Products</Link>
            <Link to="/profile/">Settings</Link>
        </nav>
    );

    // return (
    //     <nav className="nav--main">
    //         {user && <Link to="/more" onClick={onDisabledLink}>More</Link>}
    //         {user && <Link to="/profile/">
    //             {/* <BsPersonCircle className="icon--profile" /> */}
    //             Profile
    //         </Link>}

    //         {user && <Link to="/chat">Chat</Link>}
    //         {user && <Link to="/upload">
    //             {/* <TbHeartPlus className="icon--upload" /> */}
    //             Upload
    //         </Link>}
    //         <Link to="/">Browse</Link>
    //         {!user && <Link to="/sign-in">Sign In</Link>}
    //     </nav>
    // );
};

export default NavMenu;