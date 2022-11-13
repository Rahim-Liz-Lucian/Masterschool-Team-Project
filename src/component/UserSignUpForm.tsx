import { Ref, HTMLAttributes } from "react";

export default function Form({ form, ...props }: HTMLAttributes<HTMLFormElement> & { form: Ref<HTMLFormElement>; }) {
    return (
        <form {...props} ref={form} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="email">
                <span>Email:</span>
                <input required pattern="^[\S+]+[\S\s]+" type="email" name="email" id="email" placeholder={"Enter email"} />
            </label>
            <label htmlFor="password">
                <span>Password:</span>
                <input required pattern="^[\S+]+[\S\s]+" type="password" name="password" id="password" placeholder={"Enter password"} />
            </label>
            <button type="submit">Sign-in</button>
        </form>
    );
}