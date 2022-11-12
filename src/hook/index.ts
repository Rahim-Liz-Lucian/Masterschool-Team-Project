import { useRef } from "preact/hooks";
import { authSignIn, authSignOut, authSignUp, useAuthContext } from "../firebase";
import { useLocation } from "wouter-preact";

export const useSignIn = () => {
    const formRef = useRef();
    const { user } = useAuthContext();
    const [_, setLocation] = useLocation();

    async function handleUserRegistration(e: Event) {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        try {
            await authSignIn(email, password);
            setLocation("/dashboard");
        } catch (error) {
            const e = error as Error;
            console.error(`failed to login user: ${e.message}`);
        }
    }

    return { formRef, user, handleUserRegistration };
};

export const useSignUp = () => {
    const formRef = useRef();
    const { user } = useAuthContext();
    const [_, setLocation] = useLocation();

    async function handleUserRegistration(e: Event) {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        try {
            await authSignUp(email, password);
            setLocation("/dashboard");
        } catch (error) {
            const e = error as Error;
            console.error(`failed to login user: ${e.message}`);
        }
    }

    return { formRef, user, handleUserRegistration };
};

export const useDashboard = () => {
    const { user } = useAuthContext();
    const [_, setLocation] = useLocation();


    async function handleSignOut(_e: Event) {
        try {
            await authSignOut();
            setLocation("/sign-in");
        } catch (error) {
            // NOTE user must exist in this context
            console.error(`Error signing-out ${user!.uid}`);
        }
    }

    return { user, handleSignOut };
};
