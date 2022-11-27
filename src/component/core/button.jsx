import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "wouter-preact";
import { Back } from "./icons";

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
            <Back className="icon--back" />
        </Link>
    );
};
