import { useState } from "preact/hooks";
import Button from "./base/Button";

export default function SettingsProfileForm({ onUpdateProfile }) {
    const [name, setName] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        await onUpdateProfile({ name });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-control">
                <label className="form-label">Name</label>
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

            <Button type="submit">Update profile</Button>
        </form>
    );
}