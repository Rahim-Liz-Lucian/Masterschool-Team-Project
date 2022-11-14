import { useRef } from "preact/hooks";
import { Link, Redirect, useLocation } from "wouter-preact";
import UserSignUpForm from "../component/UserSignUpForm";
import { fireAuth, fireStore, registerUser, authCtx } from "../firebase";
import { FormEvent } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Page() {
    const { formRef, handleUserRegistration, user } = useSignUp();

    if (user) return (
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

    const user = authCtx.value;

    async function handleUserRegistration(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const [name, username, email, password, confirmPassword] = [...new FormData(formRef.current!).values()];

        try {
            console.log(`attempt to sign-up successful`);
            console.log(email, username, name, password === confirmPassword);

            const userCred = await createUserWithEmailAndPassword(fireAuth, email.toString(), password.toString());
            // FIXME this depends on the prev line so if it fails need to delete the created user
            const docRef = doc(fireStore, `users/${userCred.user.uid}`);
            await setDoc(docRef, { username: username.toString(), name: name.toString() });
            setLocation("/dashboard");
        } catch (error) {
            const e = error as Error;
            console.error(`failed to login user: ${e.message}`);
        }
    }

    return { formRef, handleUserRegistration, user };
};