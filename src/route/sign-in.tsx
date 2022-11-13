import { Link, Redirect, useLocation } from "wouter-preact";
import UserLoginForm from "../component/UserLoginForm";
import { useRef } from "preact/hooks";
import { loginUser, userSignal } from "../firebase";
import { FormEvent } from "react";

export default function Page() {
    const { formRef, handleUserLogin, user } = useSignIn();

    if (user.value) return (
        <Redirect to="/dashboard" />
    );

    return (
        <div>
            <h1>Sign-in</h1>

            <UserLoginForm form={formRef} onSubmit={handleUserLogin} />
            <Link href="/sign-up">Don't have an account?</Link>
        </div>
    );
}

// bar___123

const useSignIn = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [_, setLocation] = useLocation();

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

    return { formRef, handleUserLogin, user: userSignal };
};