import { Link } from "wouter-preact";
import { userSignal } from "../firebase";

export default function Page() {
    // isLoading, if no user, 
    const { user } = useIndex();

    // NOTE pop-in as first render will always be undefined
    if (!user) return (
        <div>
            This is the home page
            <Link href="/sign-in">Sign In?</Link>
            <Link href="/sign-up">Sign Up?</Link>
        </div>
    );

    return (
        <div>
            This is the home page
            <Link href="/dashboard">Goto Dashboard</Link>
        </div>
    );
}

export const useIndex = () => {
    return { user: userSignal.peek() };
};