import { useRef } from "preact/hooks";
import { Link, useLocation } from "wouter-preact";
import { Button, Checkbox, Control, Logo, Select, Form } from "~/components";
import { Header, Main } from "~/layout";

import cities from "~/data/cities.json";
import { registerUser, updateUserProfile, validateEmailAndPassword } from "~/lib";
import { useSignUpForm } from "~/lib/form";

export default function Page() {
    const { form, handleRegister } = useSignUpForm();

    return (
        <>
            <Header className="flex">
                <Logo />
            </Header>
            <Main classList={["column", "h-full"]}>
                <Form classList={["h-full"]} ref={form} onSubmit={handleRegister}>
                    <Control name="displayName" required>Name</Control>

                    <Control name="email" required type="email">Email</Control>

                    <Control name="password" required type="password">Password</Control>

                    <Control name="repeatPassword" type="password">Verify Password</Control>

                    <Select required title="City" name="city" value="" items={[{ value: "", label: "", disabled: true }, ...cities]} >
                        {(city) => (<option key={city.value} {...city}>{city.label}</option>)}
                    </Select>

                    <Control name="phoneNumber" required type="tel">Phone Number</Control>

                    <Checkbox required>I agree to the <Link to="/terms-and-conditions">terms and conditions</Link></Checkbox>
                    <Checkbox>Sign me up to the newsletter</Checkbox>

                    <Button style={{ marginTop: "auto" }} type="submit">Sign Up</Button>

                    {/* Already have an account? */}
                </Form>
            </Main>
        </>
    );
}