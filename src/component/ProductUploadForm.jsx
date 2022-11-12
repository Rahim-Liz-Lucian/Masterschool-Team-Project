export default function Form(props) {
    return (
        <form {...props} ref={props.form} style={{ display: "flex", flexDirection: "column" }}>
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
    );
}