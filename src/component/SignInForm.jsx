import { useState } from "preact/hooks";
import Button from "./base/Button";

export default function Form({ authenticate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await authenticate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <div className="input-control">
        <label className="form-label">Email</label>
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
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <a href="/">Forgot Password?</a>

      <Button classes="btn btn-primary" type="submit">
        Login
      </Button>
    </form>
  );
}
