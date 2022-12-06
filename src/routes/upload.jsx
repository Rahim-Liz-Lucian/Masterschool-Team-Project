import { useRef } from "preact/hooks";
import { Back, Button, Control, LogoMini, UserMenu, Form } from "~/components";
import { Header, Main, ASide } from "~/layout";
import { compressFile, formatDate, futureDate, uploadProduct, useFirebaseAuth } from "~/lib";
import { useUploadForm } from "~/lib/form";


export default function Page() {
    const user = useFirebaseAuth();

    const { form, handleUpload } = useUploadForm(user);

    return (
        <>
            <Header>
                <Back />
                <h1>Upload</h1>
                <LogoMini />
            </Header>
            <Main className={"h-full scroll-y"}>
                <Form ref={form} onSubmit={handleUpload} className={"column"}>
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
            </Main>
            <ASide>
                <UserMenu />
            </ASide>
        </>
    );
}
