import "./button.css";
const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="btn btn-primary">
      {text}
    </button>
  );
};

export default Button;
{
  /* <button
type="button"
className="btn btn-primary btn-lg"
onClick={() => {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    ) &&
    email &&
    name &&
    city &&
    password &&
    password === repeatPassword
  ) {
    handleSignUp();
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    )
  ) {
    window.alert("your email isnt valid");
  } else if (password !== repeatPassword) {
    window.alert("passwords arent the same");
  } else {
    window.alert("fill out everything");
  }
}}
>
Register
</button> */
}
