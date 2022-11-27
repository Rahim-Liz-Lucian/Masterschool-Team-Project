import { Link, useLocation } from "wouter-preact";
import { useState } from "preact/hooks";
import { Button, Checkbox, Input, Select, WasteLess, Form } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { registerUser, updateUserProfile, useFireBaseAuth } from "~/firebase";
import { useError, validateEmailAndPassword } from "~/utils";
import { Header } from "~/component/layout";

// FIXME don't do this

export default function Page() {
    const user = useFireBaseAuth();

    const [formData, setFormData] = useState({ city: "none" });
    const { onRegister, error, resetError } = useHook({ formData });

    const onChange = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.value });
    };

    // if (user) return <Redirect to="/" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <Header>
                <WasteLess />
            </Header>

            <main className="sign-up">
                <Form id="sign-up" onSubmit={onRegister}>
                    <Input required type="text" name="displayName" value={formData.displayName} onChange={onChange("displayName")}>Name</Input>

                    <Input required type="email" name="email" value={formData.email} onChange={onChange("email")}>Email</Input>

                    <Input required type="password" name="password" value={formData.password} onChange={onChange("password")}>Password</Input>

                    <Input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={onChange("repeatPassword")} >Repeat Password</Input>

                    {/* FIXME required tag not working */}
                    <Select required name="city" title="City" value={formData.city} onChange={onChange("city")}>
                        <option value="none" disabled></option>
                        <option value="amsterdam">Amsterdam</option>
                        <option value="berlin">Berlin</option>
                        <option value="london">London</option>
                        <option value="paris">Paris</option>
                        <option value="tlv">Tel-Aviv</option>
                    </Select>

                    <Input required type="tel" name="phoneNumber">Phone Number</Input>

                    <div>
                        <Checkbox name="terms" required>I agree to the <Link href="/">Terms and conditions</Link></Checkbox>
                        <Checkbox name="newsletter">Sign me up to the newsletter</Checkbox>
                    </div>

                    <Button type="submit" form="sign-up">Sign Up</Button>
                </Form>
            </main>
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

