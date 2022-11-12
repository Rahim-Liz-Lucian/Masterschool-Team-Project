import { Link, Redirect } from "wouter-preact";
import { useSignIn } from "../hook";


export default function Page() {
    const { formRef, handleUserLogin, user } = useSignIn();

    if (user.value) return (
        <Redirect to="/dashboard" />
    );

    return (
        <div>
            <h1>Sign-in</h1>

            <form ref={formRef} onSubmit={handleUserLogin} style={{ display: "flex", flexDirection: "column" }}>
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