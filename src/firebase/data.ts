import { signal, useSignal } from "@preact/signals";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "preact/hooks";
import { fireAuth } from ".";

const user = signal<User | null>(fireAuth.currentUser);

export const initApp = () => {
    const isLoading = useSignal(true);

    useEffect(() => {
        return onAuthStateChanged(fireAuth, next => {
            [user.value, isLoading.value] = [next, false];
        });
    }, []);

    return { isLoading: isLoading.value };
};

export const useFireBaseAuth = () => {
    return user.value;
};