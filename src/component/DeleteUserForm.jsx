import { useState } from "preact/hooks";
import Button from "./base/Button";

export default function DeleteAccountForm({ onDeleteAccount }) {
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        onDeleteAccount({ password });
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="password">
                <span>Password</span>
                <input type="password" name="password" id="password" required onChange={e => setPassword(e.target.value)} />
            </label>

            <Button type="submit">Delete account</Button>
        </form>
    );
}