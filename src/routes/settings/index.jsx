import { useLocation } from "wouter-preact";
import { Back, LogoMini, UserBanner } from "~/components";
import { Header, Nav, Main } from "~/layout";
import { signOutUser, useFirebaseAuth } from "~/lib/firebase";

export default function Page() {
    const user = useFirebaseAuth();

    const [, setLocation] = useLocation();

    const onSignOut = async (e) => {
        await signOutUser();
        setLocation("/");
    };

    return (
        <>
            <Header>
                <Back />
                <h1>Settings</h1>
                <LogoMini />
            </Header>
            <Main>
                <article>
                    <UserBanner user={user} />
                    <button onClick={onSignOut}>Sign Out</button>
                </article>
                <aside>
                    <Nav />
                </aside>
            </Main>
        </>
    );
}