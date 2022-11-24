import { useState } from "preact/hooks";
import { Redirect, useLocation } from "wouter-preact";
import ErrorMessage from "~/component/base/ErrorMessage";
import { WasteLess } from "~/component/icons/icons";
import { useFireBaseAuth } from "~/firebase/data";
import { registerUser, updateUserProfile } from "~/firebase/functions";
import { validateEmailAndPassword } from "~/utils";
import { useError } from "~/utils/hooks";

import "./sign-up.css";

export default function Page() {
    const user = useFireBaseAuth();
    const [formData, setFormData] = useState({ city: "none" });
    const { error, resetError, onSignUp } = useHook({ formData });

    // will redirect elsewhere later
    if (user) return <Redirect to="/x/upload" />;

    if (error) return (
        <ErrorMessage {...{ error, resetError }} />
    );

    return (
        <div className="page">
            <WasteLess width={220} />

            <form id="sign-up" onSubmit={onSignUp}>
                <Input required type="text" name="displayName" value={formData.displayName} onChange={e => setFormData({ ...formData, displayName: e.target.value })} />
                <Input required type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <Input required type="password" name="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                <Input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={e => setFormData({ ...formData, repeatPassword: e.target.value })} />
                <Select required name="location" placeholder="Select a Location" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                    <option value="amsterdam">Amsterdam</option>
                    <option value="berlin">Berlin</option>
                    <option value="london">London</option>
                    <option value="paris">Paris</option>
                    <option value="tlv">Tel-Aviv</option>
                </Select>
            </form>

            <button type="submit" form="sign-up">Login</button>
        </div>
    );
}

/** HOOK */
const useHook = ({ formData: { email, password, repeatPassword, city, displayName } }) => {
    const [, setLocation] = useLocation();
    const { error, setError, resetError } = useError();

    const onSignUp = async (e) => {
        e.preventDefault();

        try {
            validateEmailAndPassword(email, password, repeatPassword);

            const { user } = await registerUser(email, password);

            await updateUserProfile(user, { displayName, email, password, location: { city } });

            alert(`successfully created an account`);
            setLocation("/x/upload");
        } catch (error) { setError(error); }
    };

    return { onSignUp, error, resetError };
};

/** COMPONENTS */

const Select = ({ name, placeholder, children, value, ...props }) => {
    return (
        <label htmlFor={name}>
            <span>{name}</span>
            <select name={name} id={name} value={value} {...props}>
                <option value={value} disabled>
                    {placeholder}
                </option>
                {children}
            </select>
        </label>
    );
};

const Input = ({ name, type, ...props }) => {
    return (
        <label htmlFor={name}>
            <span>{name}</span>
            <input type={type} name={name} id={name} {...props} />
        </label>
    );
};