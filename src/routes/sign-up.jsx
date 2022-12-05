import { Link } from "wouter-preact";
import { Button, Checkbox, Control, Logo, } from "~/components";
import { Form, Header } from "~/layout";

export default function Page() {
    const onRegister = async (e) => {
        e.preventDefault();
        alert("register user");
    };

    return (
        <>
            <Header>
                <Logo />
            </Header>
            <main>
                <article className="container">
                    <Form onSubmit={onRegister}>
                        <Control name="displayNAme" required>Name</Control>
                        <Control name="email" required type="email">Email</Control>
                        <Control name="password" required type="password">Password</Control>
                        <Control name="repeatPassword" type="password">Verify Password</Control>
                        <Control name="phoneNumber" type="tel">Phone Number</Control>

                        <Checkbox>I agree to the <Link to="/terms-and-conditions">terms and conditions</Link></Checkbox>
                        <Checkbox>Sign me up to the newsletter</Checkbox>

                        <Button type="submit">Sign Up</Button>
                    </Form>
                </article>
            </main>
        </>
    );
}
