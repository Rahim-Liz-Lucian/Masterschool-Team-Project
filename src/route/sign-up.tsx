import { useRef } from "preact/hooks";
import { Link, Redirect, useLocation } from "wouter-preact";
import UserSignUpForm from "../component/UserSignUpForm";
import { registerUser, userSignal } from "../firebase";
import { FormEvent } from "react";

export default function Page() {
    const { formRef, handleUserRegistration, user } = useSignUp();

    if (user.value) return (
        <Redirect to="/dashboard" />
    );

    return (
        <div>
            <h1>Sign-up</h1>

            <UserSignUpForm form={formRef} onSubmit={handleUserRegistration} />

            <Link href="/sign-in">Already have an account?</Link>
        </div>
    );
}

export const useSignUp = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [_, setLocation] = useLocation();

    async function handleUserRegistration(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const [email, password] = [...new FormData(formRef.current!).values()];

        try {
            await registerUser(email.toString(), password.toString());
            setLocation("/dashboard");
        } catch (error) {
            const e = error as Error;
            console.error(`failed to login user: ${e.message}`);
        }
    }

    return { formRef, handleUserRegistration, user: userSignal };
};