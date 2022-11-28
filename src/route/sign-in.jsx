import { Link as WouterLink } from "wouter-preact";
import { WasteLess, Google, Facebook, Button, Link } from "~/component/core";
import { Header } from "~/component/layout";
import { OAuth } from "~/component/layout/container";
import { Main, Form, Input } from "~/state/sign-in";

export default function Page() {
    return (
        <>
            <Header>
                <WasteLess />
            </Header>

            <Main>
                <Form>
                    <Input type="email" name="email">Email</Input>
                    <Input type="password" name="password">Password</Input>

                    <a className="form__reset" href="/forgot-password">Forgot Password?</a>

                    <OAuth>
                        <span>Or Sign Up using</span>
                        <Facebook />
                        <Google />
                    </OAuth>

                    <Button className="primary" type="submit">Login</Button>

                    <span>Don't have an account yet?<WouterLink href="/sign-up"> Sign up!</WouterLink></span>
                </Form>

                <Link to="/" className="secondary">Browse</Link>
            </Main>
        </>
    );
}
