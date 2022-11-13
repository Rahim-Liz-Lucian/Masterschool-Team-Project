import { Link, Redirect, useLocation } from "wouter-preact";
import UserSignInForm from "../component/UserSignInForm";
import { useRef } from "preact/hooks";
import { loginUser, userSignal } from "../firebase";
import { FormEvent } from "react";

export default function Page() {
    const { formRef, handleUserLogin, user } = useSignIn();

    if (user) return (
        <Redirect to="/dashboard" />
    );

    return (
        <div>
            <h1>Sign-in</h1>

            <UserSignInForm form={formRef} onSubmit={handleUserLogin} />
            <Link href="/sign-up">Don't have an account?</Link>
        </div>
    );
}

// bar___123

const useSignIn = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [_, setLocation] = useLocation();

    const user = userSignal.peek();

    async function handleUserLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const [email, password] = [...new FormData(formRef.current!).values()];


        try {
            await loginUser(email.toString(), password.toString());
            setLocation("/dashboard");
        } catch (error) {
            const e = error as Error;
            console.error(`failed to login user: ${e.message}`);
        }
    }

    return { formRef, handleUserLogin, user };
};