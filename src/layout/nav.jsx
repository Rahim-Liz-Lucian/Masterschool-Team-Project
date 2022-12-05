import { useFirebaseAuth } from "~/lib/firebase";
import { Navigate } from "~/lib/routing";
import { Button } from "../components/buttons";
import { Add, Home, Message, More, Profile } from "../components/icons";
import styles from "./nav.module.css";

export function Nav() {
    // Could use a prop but seeing as this hook returns the value we need
    // we can just use it directly.
    const user = useFirebaseAuth();

    const photoURL = user?.photoURL;

    if (!user) return (
        <nav className={[styles.menu, "inline-container"].join(" ")}>
            <Navigate to="/sign-in" component={<Button>Login</Button>} />
            <Navigate to="/sign-up" component={<Button variant="secondary">Sign Up</Button>} />
        </nav>
    );



    return (
        <nav className={[styles.menu, "container"].join(" ")}>
            <Navigate to="/settings" component={<img src={photoURL} alt="" />} />
            {/* <Navigate to="/settings" component={Profile} /> */}
            <Navigate to="/upload" element={Add} />
            <Navigate element={Home} />
            <Navigate element={Message} />
            <Navigate element={More} />
        </nav>
    );
}

