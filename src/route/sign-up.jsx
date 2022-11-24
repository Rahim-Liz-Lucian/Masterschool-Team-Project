import { Link, Redirect, useLocation } from "wouter-preact";
import ErrorMessage from "~/component/base/ErrorMessage";
import { registerUser, updateUserProfile } from "~/firebase/functions";
import { validateEmailAndPassword } from "~/utils";
import { useError } from "~/utils/hooks";
import { useFireBaseAuth } from "~/firebase/data";
import { useState } from "preact/hooks";
import { WasteLess } from "~/component/icons/icons";
import { Checkbox, Input, Select } from "~/component/base/input";
import Button, { BackButton } from "~/component/base/button";

import "./sign-up.css";

export default function Page() {
    const user = useFireBaseAuth();

    const [formData, setFormData] = useState({ city: "none" });
    const { onRegister, error, resetError } = useHook({ formData });

    const onChange = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.value });
    };

    if (user) return <Redirect to="/" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <div className="page">
            <BackButton />

            <WasteLess width={220} />

            <form id="sign-up" onSubmit={onRegister}>
                <Input required name="displayName" value={formData.displayName} onChange={onChange("displayName")}>
                    Name
                </Input>
                <Input required type="email" name="email" value={formData.email} onChange={onChange("email")}>
                    Email
                </Input>
                <Input required type="password" name="password" value={formData.password} onChange={onChange("password")} >
                    Password
                </Input>
                <Input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={onChange("repeatPassword")}>
                    Repeat Password
                </Input>

                <Select required name="location" placeholder="Select Your City" value={formData.city} onChange={onChange("city")}>
                    <option value="amsterdam">Amsterdam</option>
                    <option value="berlin">Berlin</option>
                    <option value="london">London</option>
                    <option value="paris">Paris</option>
                    <option value="tlv">Tel-Aviv</option>
                </Select>

                <Checkbox required type="checkbox" name="terms">
                    I agree to the <Link href="/">Terms and conditions</Link>
                </Checkbox>

                <Checkbox type="checkbox" name="newsletter">
                    Sign me up to the newsletter
                </Checkbox>

                <Button className="btn btn-primary" type="submit" form="sign-up">Login</Button>
            </form>
        </div>
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

            await updateUserProfile(user, { displayName, email, password, location: { city } });

            alert(`successfully created an account`);
            setLocation("/x/upload");
        } catch (error) { setError(error); }
    };

    return { onRegister, error, resetError };
};

