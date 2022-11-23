import { useState } from "preact/hooks";
import styled from "styled-components";
import { useLocation } from "wouter-preact";
import ErrorMessage from "~/component/base/ErrorMessage";
import { WasteLess } from "~/component/icons/icons";
import { registerUser, uploadUserDetails } from "~/firebase/functions";
import { validateEmailAndPassword } from "~/utils";
import { useError } from "~/utils/hooks";

export default function Page() {
    const [formData, setFormData] = useState({ city: "" });
    const { error, resetError, onSignUp } = useHook({ formData });

    if (error) return (
        <ErrorMessage {...{ error, resetError }} />
    );

    return (
        <Container>
            <WasteLess width={220} />

            <Form id="sign-up" onSubmit={onSignUp}>
                <Input required type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
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
            </Form>

            <Button type="submit" form="sign-up">Login</Button>
        </Container>
    );
}

/** HOOK */
const useHook = ({ formData: { email, password, repeatPassword, city, name } }) => {
    const [, setLocation] = useLocation();
    const { error, setError, resetError } = useError();

    const onSignUp = async (e) => {
        e.preventDefault();

        try {
            validateEmailAndPassword(email, password, repeatPassword);

            const { user } = await registerUser(email, password);

            await uploadUserDetails(user, { name, email, password, location: { city } });

            alert(`successfully created an account`);
            setLocation("/x/upload");
        } catch (error) { setError(error); }
    };

    return { onSignUp, error, resetError };
};

/** STYLING */

const Container = styled.div`
    margin: auto;
    outline: 1px dashed gray;
    /* use a more responsive approach */
    width: 390px;
    display: flex;
    flex-direction: column;
    gap: 21px;
    align-items: center;
    padding: 60px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;

    /* styling span */
    text-transform: capitalize;
    
    /* styling placeholder */
    input {
        width: 288px;
        padding: 4px 0;
        border-bottom: 1px solid black;
        
        /* placeholder styling */
        ::placeholder {
            text-transform: capitalize;
            font-style: italic;
        }
        
        :hover {
            border-bottom-color: #76C893;
        }
    }
`;

const Select = ({ name, placeholder, children, ...props }) => {
    return (
        <Label htmlFor={name}>
            <span>{name}</span>
            <select name={name} id={name} {...props}>
                <option value={""} disabled>
                    {placeholder}
                </option>
                {/* options from select */}
                {children}
            </select>
        </Label>
    );
};

const Input = ({ name, type, ...props }) => {
    return (
        <Label htmlFor={name}>
            <span>{name}</span>
            <input type={type} name={name} id={name} {...props} />
        </Label>
    );
};

const Button = styled.button`
    font-size:30px;
    line-height:36px;
    width: 288px;
    color: #fff;
    font-weight: 500;
    padding: 12px;
    border-radius: 16px;
    background: linear-gradient(90deg, #76C893 0%, #52B69A 100%), rgba(0, 0, 0, 0.2);
    
    :hover {
        /* TODO add a transition */
        box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.10);
    }
`;


// amy peacock, trip phone after 12