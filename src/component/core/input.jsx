export const Input = ({ name, children, type = "text", ...props }) => {
    return (
        <label className="form__control" htmlFor={name}>
            <span className="form__title">{children}</span>
            <input type={type} name={name} id={name} {...props} />
        </label>
    );
};

export const Checkbox = ({ name, required, children }) => {
    return (
        <label className="form__control--checkbox" htmlFor={name}>
            <input required={required} type="checkbox" name={name} id={name} />
            <span>{children}</span>
        </label>
    );
};

export const Select = ({ name, title = name, required = true, value, onChange, children }) => {
    return (
        <label className="form__control" htmlFor="city">
            <span className="form__title">{title}</span>
            <select required={required} name={name} id={name} value={value} onChange={onChange}>
                {children}
            </select>
        </label>
    );
};