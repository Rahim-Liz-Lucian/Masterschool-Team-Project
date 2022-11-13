import { MutableRefObject, HTMLAttributes } from "react";
import { Ref } from "preact/hooks";

export default function Form({ form, ...props }: HTMLAttributes<HTMLFormElement> & { form: Ref<HTMLFormElement>; }) {
    // name
    // username
    // email
    // location
    // password
    // confirm password

    return (
        <form {...props} ref={form} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="name">
                <span>Name</span>
                <input required pattern="^[\S+]+[\S\s]+" type="text" name="name" id="name" placeholder="Enter a name" />
            </label>

            <label htmlFor="username">
                <span>Username</span>
                <input required pattern="^[\S+]+[\S\s]+" type="text" name="username" id="username" placeholder="Enter a username" />
            </label>

            <label htmlFor="email">
                <span>Email</span>
                <input required type="email" name="email" id="email" placeholder="Enter email" />
            </label>


            <label htmlFor="password">
                <span>Password</span>
                <input required type="password" name="password" id="password" placeholder="Enter password" />
            </label>

            <label htmlFor="confirm">
                <span>Confirm Password</span>
                <input required type="password" name="confirm" id="confirm" placeholder="Confirm password" />
            </label>

            <button type="submit">Sign-in</button>
        </form>
    );
}