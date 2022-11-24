import defaultAvatar from "~/assets/defaults/avatar.jpg";
import { useError } from "~/utils/hooks";
import Compressor from "compressorjs";
import { updateData, uploadFile } from "~/firebase/functions";
import { updateProfile } from "firebase/auth";
import ErrorMessage from "~/component/base/ErrorMessage";
import SettingsProfileForm from "~/component/SettingsProfileForm";
import { Redirect, useLocation } from "wouter-preact";
import { useState } from "preact/hooks";
import styled from "styled-components";
import { useFireBaseAuth } from "~/firebase/data";
import { useFirebaseDocumentData } from "~/firebase/hooks";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { fireStore } from "~/firebase";

// NOTE using Github as a reference, it refreshes the page when changes are made
// Is this behaviour we want or do we want it to update with no refresh. They also
// keep this optional so can be blank.
export default function Page() {
    const user = useFireBaseAuth();

    const [formData, setFormData] = useState({ name: user.displayName });

    const { error, resetError, updateAvatar, onUpdateProfile, profile } = useHook({ user, formData });

    if (!user) return <Redirect to="/" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    return (
        <Container>
            <h1>Profile</h1>
            {user.displayName && <h2>{user.displayName}'s Profile</h2>}
            <p>{user.email}</p>

            {/* FIXME messy but works */}
            <ImageInput src={profile.avatarUrl ?? defaultAvatar} onChange={updateAvatar} onError={(e) => (e.target.src = defaultAvatar)} />

            {/* TODO update user details form */}
            <Form onSubmit={onUpdateProfile}>
                <Input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}>
                    Name
                </Input>

                <Button type="submit">Update profile</Button>
            </Form>
        </Container>
    );
}

const useHook = ({ user, formData: { name } }) => {
    const { error, setError, resetError } = useError();
    // const [, setLocation] = useLocation();
    const [profile, ,] = useFirebaseDocumentData(store => {
        return doc(store, `users/${user.uid}`);
    }, [user]);

    const avatarUrl = profile?.avatarUrl ?? user?.photoURL;

    const onUpdateProfile = async (e) => {
        e.preventDefault();

        // do something if name exists
        // TODO error handling
        await updateProfile(user, { displayName: name });
        alert(`Your profile display name has been updated for ${name}`);
    };

    const updateAvatar = ({ target: { files: [file] } }) => {

        compressFile(file, async thumbnail => {
            try {
                const avatarUrl = await uploadFile(thumbnail, `users/${user?.uid}/avatar`);
                // TODO move into util file
                updateData(`users/${user?.uid}`, { avatarUrl });
                // this updates the photoURL
                updateProfile(user, { photoURL: avatarUrl });

            } catch (error) {
                setError(error);
            }
        }, error => setError(error));
    };

    // TODO include user displayName for profile name
    return { error, resetError, updateAvatar, onUpdateProfile, profile: { name: profile.name ?? user.displayName, avatarUrl: profile?.avatarUrl ?? user?.photoURL, ...profile }, avatarUrl };
};


/**
 * Throws an error if one occurs
 * 
 * @param {*} file 
 * @param {*} success 
 * @returns 
 */
const compressFile = (file, success, error) => {
    return new Compressor(file, {
        quality: 0.6, maxWidth: 1500, maxHeight: 1000,
        success, error,
    });
};

/** COMPONENTS */

const ImageInput = ({ src, onError, onChange, ...props }) => {
    // could dynamically import this asset
    return (
        <Avatar>
            <label htmlFor="avatar">
                <Img
                    src={src}
                    alt="avatar"
                    onError={onError}
                />
            </label>
            <input
                type="file"
                id="avatar"
                accept="image/jpeg"
                onChange={onChange}
            />
        </Avatar>
    );
};

/** STYLING */

const Container = styled.div`
    margin: auto;
    outline: 1px dashed gray;
    /* use a more responsive approach */
    width: 390px;
    display: flex;
    flex-direction: column;
    gap: 21px;
    align-items: center;
    padding: 60px;
`;

const Avatar = styled.figure`
    & > input {
        display: none;
    }
`;

const Img = styled.img`
    /* {{ width: 75, borderRadius: 50, cursor: "pointer" }} */
    width: 75px;
    height: 75px;
    border-radius: 50%;
    cursor: pointer;
    aspect-ratio: 1/1;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;

    /* styling span */
    text-transform: capitalize;
    
    /* styling placeholder */
    input {
        width: 288px;
        padding: 4px 0;
        border-bottom: 1px solid black;
        
        /* placeholder styling */
        ::placeholder {
            text-transform: capitalize;
            font-style: italic;
        }
        
        :hover {
            border-bottom-color: #76C893;
        }
    }
`;

const Select = ({ name, placeholder, children, ...props }) => {
    return (
        <Label htmlFor={name}>
            <span>{name}</span>
            <select name={name} id={name} {...props}>
                <option value={""} disabled>
                    {placeholder}
                </option>
                {/* options from select */}
                {children}
            </select>
        </Label>
    );
};

const Input = ({ name, type, ...props }) => {
    return (
        <Label htmlFor={name}>
            <span>{name}</span>
            <input type={type} name={name} id={name} {...props} />
        </Label>
    );
};

const Button = styled.button`
    font-size:30px;
    line-height:36px;
    width: 288px;
    color: #fff;
    font-weight: 500;
    padding: 12px;
    border-radius: 16px;
    background: linear-gradient(90deg, #76C893 0%, #52B69A 100%), rgba(0, 0, 0, 0.2);
    
    :hover {
        /* TODO add a transition */
        box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.10);
    }
`;
