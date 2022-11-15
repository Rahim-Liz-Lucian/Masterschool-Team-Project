import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import { ReactComponent as ReactLogo } from "../branding/Logo_with_text.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUserName, setUserEmail, setIsLoggedIn, setUserCity, setDbRefId } =
    useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserEmail(email);
        setUserName(name);
        setUserCity(city);
        setIsLoggedIn(true);
        handleAddUserInfoIntoDb(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          `error code: ${errorCode}\n error message: ${errorMessage}`
        );
      });
    console.log("signup");
  };

  const handleAddUserInfoIntoDb = async (uuid) => {
    try {
      await setDoc(doc(db, "users", uuid), {
        name: name,
        email: email,
        city: city,
      });
      setDbRefId(uuid);
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <section>
        <ReactLogo
          style={{ height: "160px", width: "100%", margin: "0 auto" }}
        />
        <h2 className="heading">Sign up to wasteless</h2>
        <form className="mx-1 mx-md-4">
          <div className="input-control">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="input-control">
            <label className="form-label">Your Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-control">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="input-control">
            <label className="form-label" htmlFor="form3Example4cd">
              Repeat your password
            </label>
            <input
              type="password"
              id="form3Example4cd"
              className="form-control"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />
          </div>

          <div className="input-control">
            <label htmlFor="city" className="form-label">
              Your City
            </label>
            <select
              name="city"
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            >
              <option value="none" disabled>
                Select City
              </option>
              <option value="amsterdam">Amsterdam</option>
              <option value="london">London</option>
              <option value="berlin">Berlin</option>
              <option value="paris">Paris</option>
              <option value="tlv">Tel-Aviv</option>
            </select>
          </div>

          <label htmlFor="terms">
            <input type="checkbox" name="terms" required />I agree to the{" "}
            <a href="/">Terms and conditions</a>
          </label>
          <label htmlFor="newsletter">
            <input type="checkbox" name="newsletter" />
            Sign me up to the newsletter
          </label>
          <Button text="Create Account" handleClick={handleSignUp} />
        </form>
      </section>
    </>
  );
};

export default SignUp;
