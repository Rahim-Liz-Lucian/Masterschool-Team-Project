import { useEffect, useRef } from "preact/hooks";
import { fireAuth, loginUser, logoutUser, registerUser, userSignal } from "../firebase";
import { useLocation } from "wouter-preact";
import { onAuthStateChanged } from "firebase/auth";

export const useSignIn = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [_, setLocation] = useLocation();

    async function handleUserLogin(e: Event) {
        e.preventDefault();

        const formData = new FormData(formRef.current!);

        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        try {
            await loginUser(email, password);
            setLocation("/dashboard");
        } catch (error) {
            const e = error as Error;
            console.error(`failed to login user: ${e.message}`);
        }
    }

    return { formRef, handleUserLogin, user: userSignal };
};

export const useSignUp = () => {
    const formRef = useRef();
    const [_, setLocation] = useLocation();

    async function handleUserRegistration(e: Event) {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        try {
            await registerUser(email, password);
            setLocation("/dashboard");
        } catch (error) {
            const e = error as Error;
            console.error(`failed to login user: ${e.message}`);
        }
    }

    return { formRef, handleUserRegistration, user: userSignal };
};

export const useDashboard = () => {
    const [_, setLocation] = useLocation();

    async function handleSignOut(_e: Event) {
        try {
            await logoutUser();
            setLocation("/sign-in");
        } catch (error) {
            // NOTE user must exist in this context
            console.error(`error signing-out user`);
        }
    }

    return { handleSignOut, user: userSignal };
};

export const useIndex = () => {
    return { user: userSignal };
};

export const useApp = () => {
    // NOTE for testing
    // loginUser("admin@mail.com", "thisisadmin1");

    useEffect(() => {
        return onAuthStateChanged(fireAuth, next => {
            userSignal.value = next;
        });
    }, []);

    return { user: userSignal };
};