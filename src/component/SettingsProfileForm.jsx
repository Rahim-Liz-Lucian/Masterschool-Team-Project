import { useState } from "preact/hooks";
import Back from "./base/Back";
import Button from "./base/Button";
import "../index.css";

export default function SettingsProfileForm({ onUpdateProfile }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onUpdateProfile({ name });
  };

  return (
    <div className="page">
      <Back />
      <form onSubmit={handleSubmit}>
        <div className="input-control">
          <label className="form-label">Update Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            // NOTE Current value should actually
            // be the users current name
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button type="submit" classes="btn btn-primary">
          Update profile
        </Button>
      </form>
    </div>
  );
}
