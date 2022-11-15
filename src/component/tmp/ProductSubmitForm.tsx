import { Ref, HTMLAttributes } from "react";

export default function Form({ form, ...props }: HTMLAttributes<HTMLFormElement> & { form: Ref<HTMLFormElement>; }) {
    return (
        <form {...props} ref={form} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="title">
                <span>Title</span>
                {/* NOTE prevent titles that start with white spaces */}
                <input required pattern="^[\S+]+[\S\s]+" type="text" name="title" id="title" />
            </label>
            <label htmlFor="Quantity">
                <span>Quantity</span>
                {/* NOTE value must be greater than 1 */}
                <input defaultValue={1} type="number" min={1} name="quantity" id="quantity" />
            </label>

            <label htmlFor="image">
                <span>Image</span>
                {/* FIXME mustn't be required */}
                <input required type="file" id="thumbnail" name="thumbnail" accept="image/png, image/jpeg"></input>
            </label>
            <button>Submit</button>
        </form>
    );
}