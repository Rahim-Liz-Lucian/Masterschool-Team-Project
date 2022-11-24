import "./button.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "wouter-preact";

export const Button = ({ ...props }) => {
    return (
        <button {...props}>
            {props.children}
        </button>
    );
};

export const BackButton = () => {
    return (
        <Link to="..">
            <RiArrowGoBackFill className="back-btn" size="2.5rem" />
        </Link>
    );
};

export default Button;