import { settings } from "./list.module.css";

export const Settings = ({ children }) => {
    return (
        <ul className={settings}>
            {children}
        </ul>
    );
};