import { Link, useLocation } from "wouter-preact";
import { Back, LogoMini, UserBanner, UserMenu } from "~/components";
import { ASide, Header, Main } from "~/layout";
import { For } from "~/lib";
import { signOutUser, useFirebaseAuth } from "~/lib/firebase";
import settings from "~/data/settings.json";

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
            <Main className={"h-full column scroll-y"}>
                <UserBanner user={user} />
                <For style={{ flexGrow: 1 }} type="ul" items={settings}>
                    {(item) => (
                        <li key={item.to}>
                            <Link to={item.to}>{item.label}</Link>
                        </li>
                    )}
                </For>

                <button onClick={onSignOut}>Sign Out</button>
            </Main>
            <ASide>
                <UserMenu user={user} />
            </ASide>
        </>
    );
}

const Settings = ({ settings, ...props }) => {
    const [, setLocation] = useLocation();

    const onSignOut = async (e) => {
        await signOutUser();
        setLocation("/");
    };

    return (
        <section>
            <For type="ul" className={"row"} items={settings}>
                {(item) => (
                    <li key={item.to}>
                        <Link to={item.to}>{item.label}</Link>
                    </li>
                )}
            </For>

            <button onClick={onSignOut}>Sign Out</button>
        </section>
    );
};