import "./button.css";

export default function Button({ ...props }) {
    return (
        <button {...props} type="submit" className="btn btn-primary">
            {props.children}
        </button>
    );
};