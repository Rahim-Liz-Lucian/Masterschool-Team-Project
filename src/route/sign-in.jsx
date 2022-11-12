import { useEffect, useRef } from "preact/hooks";
import { useAuthContext } from "../firebase";
import { Link, useLocation, Redirect } from "wouter-preact";

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
            await authSignIn(email, password);
            setLocation("/dashboard");
        } catch (error) {
            console.error(`failed to login user: ${error.message}`);
        }

    }

    // if user is already signed-in 
    // redirect to dashboard
    // FIXME this is not a good way to handle redirect
    // please fix 
    // if (user) setLocation("/dashboard");
    if (user) return <Redirect to="/dashboard" />;

    return (
        <div>
            <h1>Sign-in</h1>

            <form ref={formRef} onSubmit={handleUserRegistration}>
                <label htmlFor="email">
                    <span>Email:</span>
                    <input required type="email" name="email" id="email" placeholder={"Enter email"} />
                </label>
                <label htmlFor="password">
                    <span>Password:</span>
                    <input required type="password" name="password" id="password" placeholder={"Enter password"} />
                </label>
                <button type="submit">Sign-in</button>
            </form>

            <Link href="/sign-up">Don't have an account?</Link>
        </div>
    );
}

// bar___123