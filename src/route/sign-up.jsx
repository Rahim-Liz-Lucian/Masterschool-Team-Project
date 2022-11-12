import { Link, Redirect } from "wouter-preact";
import { useSignUp } from "../hook";


export default function Page() {
    const { formRef, user, handleUserRegistration } = useSignUp();

    if (user.value) return (
        <Redirect to="/dashboard" />
    );

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