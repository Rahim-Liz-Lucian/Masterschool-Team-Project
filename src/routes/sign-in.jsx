import { useRef } from "preact/hooks";
import { Link, useLocation } from "wouter-preact";
import { OAuth, Button, Logo, Control, Google, Facebook, Form } from "~/components";
import { Header, Main } from "~/layout";
import { signInUser } from "~/lib";
import { useSignInForm } from "~/lib/form";


export default function Page() {
    const { form, handleSignIn } = useSignInForm();

    return (
        <>
            <Header className="flex">
                <Logo />
            </Header>
            <Main classList={["column", "h-full"]}>
                {/* TODO style this one as unique, with button having an auto margin-top */}
                <Form ref={form} onSubmit={handleSignIn}>
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
                <Link to="/" replace>
                    <Button style={{ marginTop: "auto" }} variant="secondary">Browse</Button>
                </Link>
            </Main>
        </>
    );
}
