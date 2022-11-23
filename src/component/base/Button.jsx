import "./button.css";

export default function Button({ ...props }) {
  return (
    <button {...props} type="submit" className={props.classes}>
      {props.children}
    </button>
  );
}
