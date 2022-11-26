import "./sign-up.css";

import { Link, useLocation } from "wouter-preact";
import { useState } from "preact/hooks";
import { Checkbox, Input, Select, WasteLess, BackButton } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import { registerUser, updateUserProfile, useFireBaseAuth } from "~/firebase";
import { useError, validateEmailAndPassword } from "~/utils";

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
            <header className="header">
                <BackButton />
            </header>

            <main>
                <WasteLess width={220} />

                <form className="form" id="sign-up" onSubmit={onRegister}>
                    <Input required type="text" name="displayName" value={formData.displayName} onChange={onChange("displayName")}>Name</Input>
                    <Input required type="email" name="email" value={formData.email} onChange={onChange("email")}>Email</Input>
                    <Input required type="password" name="password" value={formData.password} onChange={onChange("password")}>Password</Input>
                    <Input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={onChange("repeatPassword")} >Verify Password</Input>

                    <Input required type="tel" name="phoneNumber">Phone Number</Input>

                    {/* <input type="tel" name="" id="" /> */}

                    {/* <Input re>Phone Number</Input> */}


                    {/* FIXME required tag not working */}
                    <Select required name="city" title="Location" value={formData.city} onChange={onChange("city")}>
                        <option value="none" disabled>Select Your City</option>
                        <option value="amsterdam">Amsterdam</option>
                        <option value="berlin">Berlin</option>
                        <option value="london">London</option>
                        <option value="paris">Paris</option>
                        <option value="tlv">Tel-Aviv</option>
                    </Select>

                    <Checkbox name="terms" required>I agree to the <Link href="/">Terms and conditions</Link></Checkbox>
                    <Checkbox name="newsletter">Sign me up to the newsletter</Checkbox>

                    <button className="form__submit" type="submit" form="sign-up">Sign Up</button>
                </form>
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

