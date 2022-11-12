import { useRef } from "preact/hooks";
import { Redirect } from "wouter-preact";
import { useDashboard } from "../hook";

export default function Page() {
    const { handleSignOut, user } = useDashboard();
    const formRef = useRef();

    function handleProductUpload(e) {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        for (const [key, value] of formData) {
            console.log(`key: ${key}, value: ${value}`);
        }
    }

    if (!user.value) return (
        <Redirect to="/" />
    );

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h3>Current user logged in</h3>
                <p>Uid: {user.peek().uid}</p>
                <p>Email: {user.peek().email}</p>
            </div>

            <div>
                Upload a new product
                <form ref={formRef} onSubmit={handleProductUpload} style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="title">
                        <span>Title:</span>
                        <input type="text" name="title" id="title" required />
                    </label>

                    <label htmlFor="description">
                        <span>Description:</span>
                        <textarea name="description" id="description" cols="30" rows="10" style={{ resize: "none" }}></textarea>
                    </label>

                    <label htmlFor="expiration">
                        <span>Expiration Date:</span>
                        <input type="date" name="expiration" id="expiration" />
                    </label>

                    <button type="submit">Upload</button>
                </form>
            </div>

            <button onClick={handleSignOut}>
                Log out
            </button>
        </div>
    );
}

// list of tags could be handled with: https://www.w3schools.com/tags/att_input_list.asp
// https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd