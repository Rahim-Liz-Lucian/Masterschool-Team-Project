import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
// TODO find the location of this function to 
// minimise the import size
import { getFirestore } from "firebase/firestore";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { signal } from "@preact/signals";

const fireApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
});

const fireAuth = getAuth(fireApp);

type Auth = {
    // If user then we are authorized
    // if undefined then this will block
    user?: User | null;
    authSignUp(email: string, password: string): Promise<UserCredential>;
    authSignIn(email: string, password: string): Promise<UserCredential>;
    authSignOut(): Promise<void>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthContext = createContext<Auth>({
    authSignUp,
    authSignIn,
    authSignOut,
});

// TODO rename these helper functions
export async function authSignUp(email: string, password: string) {
    // Firebase is setting local storage for us using tokens
    // so is automatically logging user after refresh
    const cred = createUserWithEmailAndPassword(fireAuth, email, password);
    // fireAuth.updateCurrentUser

    // TODO check if this needs to return a user?
    return cred;
}

export async function authSignIn(email: string, password: string) {
    return signInWithEmailAndPassword(fireAuth, email, password);
}

export async function authSignOut() {
    signOut(fireAuth);
}

// not being used
export async function authDelete(user: User) {
    await deleteUser(user);
}

export const counter = signal(0);

export const testUser = signal<User | null>(null);

export const setupAuthObserver = () => {
    return onAuthStateChanged(fireAuth, user => {
        testUser.value = user;
    });
};

export const authContext = () => {
    return function ({ children }: { children: JSX.Element[]; }) {
        const [me, setMe] = useState<User | null>();

        // I don't think I need to have a dependency in here
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(fireAuth, user => {
                // setMe(user);

            });

            return unsubscribe;
        }, []);

        return (
            <AuthContext.Provider value={{ user: me, authSignUp, authSignIn, authSignOut }}>
                {children}
            </AuthContext.Provider>
        );
    };
};

const fireStore = getFirestore(fireApp);