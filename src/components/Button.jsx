import "./button.css";
const Button = (props) => {
  return (
    <button type="submit" {...props} className="btn btn-primary">
      {props.children}
    </button>
  );
};

export default Button;
