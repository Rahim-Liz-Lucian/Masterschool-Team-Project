import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter-preact";

import Button from "./base/Button";

export default function Form({ register, error }) {
  // TODO REFACTOR
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register({ name, email, city, password, repeatPassword });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-control">
        <label className="form-label">Your Name</label>
        <input
          required
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-control">
        <label className="form-label">Your Email</label>
        <input
          required
          type="email"
          className="form-control"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-control">
        <label className="form-label">Password</label>
        <input
          required
          type="text"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p>{error.message}</p>}
      <div className="input-control">
        <label className="form-label" htmlFor="verify">
          Repeat your password
        </label>
        <input
          type="text"
          className="form-control"
          name="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>

      <div className="input-control">
        <label htmlFor="city" className="form-label">
          Your City
        </label>
        <select
          required
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
        <input required type="checkbox" name="terms" />
        <span>
          I agree to the <Link href="/">Terms and conditions</Link>
        </span>
      </label>

      <label htmlFor="newsletter">
        <input type="checkbox" name="newsletter" />
        <span>Sign me up to the newsletter</span>
      </label>

      <Button classes="btn btn-primary" type="submit">
        Create Account
      </Button>
    </form>
  );
}
