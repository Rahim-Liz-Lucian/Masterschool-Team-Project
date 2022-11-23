import { Facebook, Google, WasteLess } from "~/component/icons/icons";
import styled from "styled-components";
import { Link as WouterLink } from "wouter-preact";
import { useState } from "preact/hooks";

export default function Page() {
    const [formData, setFormData] = useState({});
    const { onSignIn } = useHook({ formData });

    return (
        <Container>
            <WasteLess width={220} />

            <Form id="sign-in" onSubmit={onSignIn}>
                <Input required name="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <Input required name="password" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </Form>

            <Link href="/">Forgot Password</Link>
            <Button type="submit" form="sign-in">Login</Button>
            <p>Don't have an account?&nbsp;<Link href="/">Sign Up</Link></p>

            <SocialMedia>
                <span>Or Sign Up Using</span>
                {/* TODO make these clickable */}
                <Facebook width={33} fill={"#1977f3"} />
                <Google width={33} fill={"#DC4E41"} />
            </SocialMedia>

            {/* Continue as guest option may not be required here if we have a bottom nav */}
        </Container>
    );
}

/** HOOK */
const useHook = ({ formData }) => {
    const onSignIn = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return { onSignIn };
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

// https://blog.logrocket.com/how-style-react-router-links-styled-components/
const Link = styled(WouterLink)`
    color:#76C893;
        
    :hover {
        /* add transformation */
        text-decoration: underline;
    }
`;

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

const Input = ({ name, type, ...props }) => {
    return (
        <Label htmlFor={name}>
            <span>{name}</span>
            <input type={type} name={name} id={name} {...props} />
        </Label>
    );
};

const SocialMedia = styled.div`
    /* outline: 1px black solid; */
    font-weight: 400;
    text-align: center;
    font-size: 16px;
    /* FIXME width needs to be checked */
    width: 120px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
`;