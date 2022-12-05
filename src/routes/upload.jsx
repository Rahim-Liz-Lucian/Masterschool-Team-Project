import { useRef } from "preact/hooks";
import { Back, Button, Control, LogoMini, } from "~/components";
import { Header, Nav, Main, Form } from "~/layout";
import { formatDate, futureDate } from "~/lib";


export default function Page() {
    const form = useRef(null);

    const handleUpload = (e) => {
        e.preventDefault();

        const { title, description, expirationDate, thumbnail } = form.current.elements;

        console.log(title.value, description.value, expirationDate.value, thumbnail.files[0]);
        alert(`uploaded`);
    };

    return (
        <>
            <Header>
                <Back />
                <h1>Upload</h1>
                <LogoMini />
            </Header>
            <Main>
                <article className="container">
                    <Form ref={form} onSubmit={handleUpload}>
                        <Control required name="title">Title</Control>
                        <Control name="description">Description</Control>
                        <Control required name="expirationDate" type="date" min={formatDate()} value={futureDate(7)}>Expiration Date</Control>

                        {/* FIXME add styling from Liz's branch */}
                        <label htmlFor="thumbnail">
                            <span>Upload Thumbnail</span>
                            <input required type="file" name="thumbnail" id="thumbnail" accept="image/jpeg" />
                        </label>

                        <Button type="submit">Upload</Button>
                    </Form>
                </article>
                <aside>
                    <Nav />
                </aside>
            </Main>
        </>
    );
}
