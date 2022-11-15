import "./button.css";

export default function Button({ ...props }) {
    return (
        <button  {...props} className="btn btn-primary">
            {props.children}
        </button>
    );
};