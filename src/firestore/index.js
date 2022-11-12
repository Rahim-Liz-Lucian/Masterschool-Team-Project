import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

const fireApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
});

const fireAuth = getAuth(fireApp);

// should have a default state
const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

/**
 * The value passed around will be the `currentUser`
 */
export function authContext() {
    return function ({ children }) {
        const [currentUser, setCurrentUser] = useState();

        function authSignUp({ email, password }) {
            return createUserWithEmailAndPassword(fireAuth, email, password);
        }

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(fireAuth, user => setCurrentUser(user));
            // return unsubscribe when unmounting the component
            return unsubscribe;
        }, []);


        return (
            <AuthContext.Provider value={{ currentUser, authSignUp }}>
                {children}
            </AuthContext.Provider>
        );
    };
}



const fireStore = getFirestore(fireApp);

