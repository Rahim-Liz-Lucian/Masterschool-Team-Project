import "./button.css";

export default function Button({ ...props }) {
  return (
    <button {...props} className={props.classes} type="submit">
      {props.children}
    </button>
  );
}
