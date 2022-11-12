import { Link } from "wouter-preact";
import { useIndex } from "../hook";

export default function Page() {
    // isLoading, if no user, 
    const { user } = useIndex();

    // delay

    // NOTE pop-in as first render will always be undefined
    if (user.value) return (
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
