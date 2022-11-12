import { useRef } from "preact/hooks";
import { useAuthContext } from "../firebase";
import { Link, useLocation, Redirect } from "wouter-preact";

export default function Page() {
    const formRef = useRef();
    const { user, authSignUp } = useAuthContext();
    const [_, setLocation] = useLocation();

    async function handleUserRegistration(e) {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            await authSignUp(email, password);
            setLocation("/dashboard");
        } catch (error) {
            console.error(`failed to create user: ${error.message}`);
        }
    }

    // if user is already signed-in 
    // redirect to dashboard
    // FIXME this is not a good way to handle redirect
    // please fix 
    if (user) return <Redirect to="/dashboard" />;


    return (
        <div>
            <h1>Sign-up</h1>

            <form ref={formRef} onSubmit={handleUserRegistration}>
                <label htmlFor="email">
                    <span>Email:</span>
                    <input required type="email" name="email" id="email" />
                </label>
                <label htmlFor="password">
                    <span>Password:</span>
                    <input required type="password" name="password" id="password" />
                </label>
                <button type="submit">Sign-up</button>
            </form>

            <Link href="/sign-in">Already have an account?</Link>
        </div>
    );
}