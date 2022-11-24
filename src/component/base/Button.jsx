import "./button.css";

export default function Button({ ...props }) {
  return (
    <button {...props} type={props.type} className={props.classes}>
      {props.children}
    </button>
  );
}
