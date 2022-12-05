import { Back, LogoMini } from "~/components";
import { Header, Nav, Main } from "~/layout";

export default function Page() {
    return (
        <>
            <Header>
                <Back />
                <h1>Update Profile</h1>
                <LogoMini />
            </Header>
            <Main>
                <article>
                    content
                </article>
                <aside>
                    <Nav />
                </aside>
            </Main>
        </>
    );
}