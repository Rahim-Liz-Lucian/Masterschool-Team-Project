import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "wouter-preact";

export const Button = ({ ...props }) => {
    return (
        <button {...props}>
            {props.children}
        </button>
    );
};

export const BackButton = ({ className }) => {
    return (
        <Link to=".." >
            <RiArrowGoBackFill size="2.5rem" className="header__nav" />
        </Link>
    );
};
