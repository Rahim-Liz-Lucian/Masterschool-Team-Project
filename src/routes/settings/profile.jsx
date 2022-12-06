import { useRef } from "preact/hooks";
import { Back, Button, Control, LogoMini, Select, UserMenu, Form } from "~/components";
import { ASide, Header, Main } from "~/layout";
import { futureDate, useFirebaseAuth } from "~/lib";
import cities from "~/data/cities.json";
import { useUpdateProfileForm } from "~/lib/form";


export default function Page() {
    const user = useFirebaseAuth();
    const { form, handleUpdateProfile } = useUpdateProfileForm(user);

    return (
        <>
            <Header>
                <Back />
                <h1>Profile</h1>
                <LogoMini />
            </Header>
            <Main style={{ gap: 12 }} className={"h-full column scroll-y justify-between"}>
                <Form className={"h-full"} ref={form} onSubmit={handleUpdateProfile}>
                    <Control name="displayName">Name</Control>

                    <Control name="email" type="email">Email</Control>

                    <Select title="City" name="city" value="" items={[{ value: "", label: "", disabled: true }, ...cities]} >
                        {(city) => (<option key={city.value} {...city}>{city.label}</option>)}
                    </Select>

                    <Control name="phoneNumber" type="tel">Phone Number</Control>

                    <Button style={{ marginTop: "auto" }} variant="secondary" type="submit">Update Profile</Button>
                </Form>

                <Form style={{ gap: 16 }}>
                    <Control type="password" name="password">Password</Control>

                    <Button variant="caution" type="submit">Delete Account</Button>
                </Form>
            </Main>
            <ASide>
                <UserMenu />
            </ASide>
        </>
    );
}