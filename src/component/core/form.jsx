import { form, input, select, checkbox } from "./form.module.css";

export const Form = ({ children, ...props }) => {
    return (
        <form className={form} {...props}>
            {children}
        </form>
    );
};

export const Input = ({ name, children: title, className, type = "text", ...props }) => {
    return (
        <label className={input} htmlFor={name}>
            <span>{title}</span>
            <input type={type} name={name} id={name} {...props} />
        </label>
    );
};

// File input
export const FileInput = () => {
    return (
        <label>
            <span>File input</span>
        </label>
    );
};

export const Checkbox = ({ name, required, children }) => {
    return (
        <label className={checkbox} htmlFor={name}>
            <input required={required} type="checkbox" name={name} id={name} />
            <span>{children}</span>
        </label>
    );
};

export const Select = ({ name, title = name, required = true, value, onChange, children }) => {
    return (
        <label className={select} htmlFor="city">
            <span>{title}</span>
            <select required={required} name={name} id={name} value={value} onChange={onChange}>
                {children}
            </select>
        </label>
    );
};