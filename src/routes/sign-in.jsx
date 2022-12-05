import { useRef } from "preact/hooks";
import { Link, useLocation } from "wouter-preact";
import { Button, Logo, Control, Google, Facebook } from "~/components";
import { Form, Header, Main } from "~/layout";
import { OAuth } from "~/layout/oauth";
import { signInUser } from "~/lib";


export default function Page() {
    const form = useRef(null);
    const [, setLocation] = useLocation();

    const handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = form.current.elements;

        await signInUser(email.value, password.value);
        setLocation("/");
    };

    return (
        <>
            <Header>
                <Logo />
            </Header>
            <Main>
                <article className="container">
                    <Form ref={form} onSubmit={handleSubmit}>
                        <Control required name="email" type="email">Email</Control>
                        <Control name="password" type="password">Password</Control>

                        <Link to="/forgot-password">Forgot Password?</Link>

                        <OAuth aria-label="or sign up using">
                            <Facebook />
                            <Google />
                        </OAuth>

                        <Button type="submit">Login</Button>

                        <span>Don't have an account? <Link to="/sign-up">Sign Up</Link></span>
                    </Form>
                </article>
                <aside>
                    <Link to="/" replace>
                        <Button variant="secondary">Browse</Button>
                    </Link>
                </aside>
            </Main>
        </>
    );
}
