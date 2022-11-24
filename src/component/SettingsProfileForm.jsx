import { useState } from "preact/hooks";
import Back from "./base/Back";
import Button from "./base/button";
import "../index.css";

export default function SettingsProfileForm({ onUpdateProfile }) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onUpdateProfile({ name, location });
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
                <div className="input-control">
                    <label htmlFor="city" className="form-label">
                        Your City
                    </label>
                    <select
                        required
                        id="city"
                        name="city"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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

                <Button type="submit" classes="btn btn-primary">
                    Update profile
                </Button>
            </form>
        </div>
    );
}