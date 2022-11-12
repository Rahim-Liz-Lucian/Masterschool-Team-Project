import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, User, UserCredential } from "firebase/auth";
// TODO find the location of this function to 
// minimise the import size
import { getFirestore } from "firebase/firestore";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

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
    user?: User;
    authSignUp: (email: string, password: string) => Promise<UserCredential>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthContext = createContext<Auth>({
    authSignUp
});

async function authSignUp(email: string, password: string) {
    // Firebase is setting local storage for us using tokens
    // so is automatically logging user after refresh
    return createUserWithEmailAndPassword(fireAuth, email, password);
}

export const authContext = () => {
    return function ({ children }: { children: JSX.Element[]; }) {
        const [me, setMe] = useState<User | undefined>();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(fireAuth, user => {
                user && setMe(user);
            });

            return unsubscribe;
        }, [me]);



        const value = {
            user: me,
            authSignUp
        };

        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
    };
};

const fireStore = getFirestore(fireApp);