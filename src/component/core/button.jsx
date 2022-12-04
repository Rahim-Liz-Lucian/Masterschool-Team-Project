import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "wouter-preact";
import { Back } from "./icons";
import "../../assets/styles/button.css";

export const Button = ({ ...props }) => {
  return (
    <button className={props.classes} {...props}>
      {props.children}
    </button>
  );
};

export const BackButton = ({ className }) => {
  return (
    <Link to="..">
      <Back className="icon--back" />
    </Link>
  );
};
