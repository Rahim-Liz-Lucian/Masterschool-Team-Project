import { Link, Redirect } from "wouter-preact";
import { useAuthContext } from "../firebase";
import { useDashboard } from "../hook";

export default function Page() {
    const { user, isLoading } = useAuthContext();
    // isLoading, if no user, 

    // delay

    // NOTE pop-in as first render will always be undefined
    if (user) return (
        <div>
            This is the home page
            <Link href="/dashboard">Goto Dashboard</Link>
        </div>
    );

    return (
        <div>
            This is the home page
            <Link href="/sign-in">Sign In?</Link>
            <Link href="/sign-up">Sign Up?</Link>
        </div>
    );
}
