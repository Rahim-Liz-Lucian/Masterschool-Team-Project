import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Label = styled.label`
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

export const Select = ({ name, placeholder, children, ...props }) => {
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

export const Input = ({ name, type, ...props }) => {
    return (
        <Label htmlFor={name}>
            <span>{name}</span>
            <input type={type} name={name} id={name} {...props} />
        </Label>
    );
};