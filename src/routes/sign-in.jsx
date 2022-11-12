import { useRef } from "preact/hooks";
import { useAuthContext } from "../firebase";
import { Link, useLocation } from "wouter";

export default function Page() {
    const formRef = useRef();
    const { user, authSignIn } = useAuthContext();
    const [_, setLocation] = useLocation();

    async function handleUserRegistration(e) {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const { user: { uid } } = await authSignIn(email, password);
            setLocation("/dashboard");
        } catch (error) {
            console.error(`failed to login user: ${error.message}`);
        }
    }

    return (
        <div>
            <h1>Sign-in</h1>
            {user && (
                <div>
                    <h3>Current user logged in</h3>
                    <p>Uid: {user.uid}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}

            <form ref={formRef} onSubmit={handleUserRegistration}>
                <label htmlFor="email">
                    <span>Email:</span>
                    <input required type="email" name="email" id="email" />
                </label>
                <label htmlFor="password">
                    <span>Password:</span>
                    <input required type="password" name="password" id="password" />
                </label>
                <button type="submit">Sign-in</button>
            </form>

            <Link href="/sign-up">Don't have an account?</Link>
        </div>
    );
}

// bar___123