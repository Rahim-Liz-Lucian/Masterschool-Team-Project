import { useState } from "preact/hooks";
import { Link } from "wouter-preact";

import Button from "./base/Button";

export default function SignUpForm({ onRegister }) {
    const [formData, setFormData] = useState({ city: "none" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        await onRegister(formData);
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="input-control">
                <label className="form-label">Your Email</label>
                <input
                    required
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="input-control">
                <label className="form-label">Password</label>
                <input
                    required
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
            </div>

            <div className="input-control">
                <label className="form-label" htmlFor="verify">
                    Repeat your password
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={(e) =>
                        setFormData({ ...formData, repeatPassword: e.target.value })
                    }
                />
            </div>
            <div className="input-control">
                <label className="form-label" htmlFor="verify">
                    Phone Number
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                    }
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
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
