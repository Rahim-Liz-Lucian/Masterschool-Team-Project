import { header } from "./header.module.css";

export const Header = ({ children }) => {
    return (
        <header className={header}>
            {children}
        </header>
    );
};