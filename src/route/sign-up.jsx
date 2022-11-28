import { Link, useLocation } from "wouter-preact";
import { useState } from "preact/hooks";
import { Button, Checkbox, WasteLess } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { registerUser, updateUserProfile, useFireBaseAuth } from "~/firebase";
import { useError, validateEmailAndPassword } from "~/utils";
import { Header } from "~/component/layout";
import { Form, Input, Main, Select } from "~/state/sign-up";


export default function Page() {
    // const [formData, setFormData] = useState({ city: "none" });
    // const { onRegister, error, resetError } = useHook({ formData });

    // if (user) return <Redirect to="/" />;

    // if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <Header>
                <WasteLess />
            </Header>

            <Main>
                <Form>
                    <Input required type="text" name="displayName">Name</Input>
                    <Input required type="email" name="email">Email</Input>
                    <Input required type="password" name="password">Password</Input>
                    <Input required type="password" name="repeatPassword">Verify Password</Input>

                    <Select name="city" title="City">
                        <option value="none" disabled></option>
                        <option value="amsterdam">Amsterdam</option>
                        <option value="berlin">Berlin</option>
                        <option value="london">London</option>
                        <option value="paris">Paris</option>
                        <option value="tlv">Tel-Aviv</option>
                    </Select>

                    <Checkbox name="terms" required>I agree to the <Link href="/">Terms and conditions</Link></Checkbox>
                    <Checkbox name="newsletter">Sign me up to the newsletter</Checkbox>

                    <Button className="primary" type="submit">Sign Up</Button>
                </Form>
            </Main>
        </>
    );
}

const useHook = ({ formData: { email, password, repeatPassword, city, displayName } }) => {
    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const onRegister = async (e) => {
        e.preventDefault();

        try {
            validateEmailAndPassword(email, password, repeatPassword);

            const { user } = await registerUser(email, password);

            await updateUserProfile(user, { displayName, email, location: { city } });

            alert(`successfully created an account`);
            setLocation("/");
        } catch (error) { setError(error); }
    };

    return { onRegister, error, resetError };
};

