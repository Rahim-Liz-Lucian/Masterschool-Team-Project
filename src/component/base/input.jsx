import "./input.css";

export const Select = ({ name, value, placeholder, children, ...props }) => {
    return (
        <label htmlFor={name}>
            {/* <span>{name}</span> */}
            <select name={name} id={name} value={value} {...props}>
                <option value={value} disabled>
                    {placeholder}
                </option>
                {/* options from select */}
                {children}
            </select>
        </label>
    );
};

export const Input = ({ name, type = "text", children, ...props }) => {
    return (
        <label htmlFor={name}>
            <span>{children ?? name}</span>
            <input type={type} name={name} id={name} {...props} />
        </label>
    );
};

export const Checkbox = ({ name, children, className, ...props }) => {
    return (
        <label htmlFor={name} className={className}>
            <input type="checkbox" name={name} id={name} />
            <span>{children}</span>
        </label>
    );
};