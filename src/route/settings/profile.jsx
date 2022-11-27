"use strict";

import "./profile.css";

import { updateProfile } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useState } from "preact/hooks";
import { Redirect, useLocation } from "wouter-preact";
import { signOutUser, updateData, uploadFile, useFireBaseAuth, useFirebaseDocument } from "~/firebase";
import { Avatar, Input, BackButton, WasteLessLite, Select } from "~/component/core";
import ErrorMessage from "~/component/ErrorMessage";
import NavMenu from "~/component/NavMenu";
import { compressFile, useError } from "~/utils";

// keep this optional so can be blank.
export default function Page() {
    const user = useFireBaseAuth();

    const [formData, setFormData] = useState({});

    const { error, resetError, onUpdateProfile, onUpdateAvatar } = useHook({ user, formData });

    const onChange = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.value });
    };

    if (!user) return <Redirect to="/" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <>
            <header className="header">
                <BackButton />
                <h1 className="header__title">Profile</h1>
                <WasteLessLite className="icon" />
            </header>

            <main>
                <form className="form" id="update-profile" onSubmit={onUpdateProfile}>
                    <label className="avatar__control" htmlFor="avatar">
                        <Avatar user={user} />
                        <span>{user.displayName}</span>
                        <input type="file" style={{ display: "none" }} name="avatar" id="avatar" accept="image/jpeg" onChange={onUpdateAvatar} />
                    </label>

                    <Input name="displayName" value={formData.displayName} onChange={onChange("displayName")}>Name</Input>

                    {/* FIXME not implemented */}
                    <Input name="phoneNumber" value={formData.phoneNumber} onChange={onChange("phoneNumber")}>Phone Number</Input>

                    {/* FIXME not implemented */}
                    <Select name="city" title="City" value={formData.city} onChange={onChange("city")}>
                        <option value="none" disabled></option>
                        <option value="amsterdam">Amsterdam</option>
                        <option value="berlin">Berlin</option>
                        <option value="london">London</option>
                        <option value="paris">Paris</option>
                        <option value="tlv">Tel-Aviv</option>
                    </Select>

                    <button className="button--secondary" form="update-profile" type="submit">Update profile</button>
                </form>

                {/* NOTE not ready for MVP */}
                <form className="form" id="delete-profile">
                    <Input required type="password" name="password" value={formData.password} onChange={onChange("password")}>Password</Input>
                    <button className="button--secondary--red" form="update-profile" type="submit">Delete Profile</button>
                </form>
            </main>

            <aside>
                <NavMenu user={user} />
            </aside>
        </>
    );
}

const useHook = ({ user, formData: { displayName } }) => {
    const [, setLocation] = useLocation();

    const [profile, profileError,] = useFirebaseDocument(store => {
        return doc(store, `users/${user.uid}`);
    }, [user]);

    const { error, setError, resetError } = useError(profileError);

    const onUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            // do something if name exists
            // TODO error handling
            await updateProfile(user, { displayName });
            alert(`Your profile display name has been updated for ${displayName}`);
        } catch (error) {
            setError(error);
        }
    };

    const onUpdateAvatar = ({ target: { files: [file] } }) => {
        compressFile(file, async thumbnail => {
            try {
                const photoURL = await uploadFile(thumbnail, `users/${user?.uid}/avatar`);
                await Promise.all([
                    // TODO move into util file
                    updateData(`users/${user?.uid}`, { photoURL }),
                    // this updates the photoURL
                    updateProfile(user, { photoURL }),
                ]);

                // FIXME doSomething with photoURL
                alert(`user image has been updated`);
            } catch (error) {
                setError(error);
            }
        }, error => setError(error));
    };

    const onSignOut = async () => {
        await signOutUser();

        alert(`Goodbye, see you soon 💚`);
        setLocation("/");
    };

    // TODO include user displayName for profile name
    const photoURL = profile?.photoURL ?? user?.photoURL;

    return { error, resetError, onUpdateAvatar, onUpdateProfile, onSignOut, profile: { displayName, photoURL, ...profile } };
};
