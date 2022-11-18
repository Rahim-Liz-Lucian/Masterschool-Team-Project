import defaultAvatar from "../../assets/defaults/avatar.jpg";
import { useError } from "../../utils/hooks";
import Compressor from "compressorjs";
import { deleteUserAccount, uploadFile } from "../../firebase/functions";
import { updateProfile } from "firebase/auth";
import ErrorMessage from "../../component/base/ErrorMessage";
import SettingsProfileForm from "../../component/SettingsProfileForm";
import { useLocation } from "wouter-preact";
import Button from "../../component/base/Button";
import { useFirebaseAuth } from "../../firebase/hooks";

// NOTE using Github as a reference, it refreshes the page when changes are made
// Is this behaviour we want or do we want it to update with no refresh. They also
// keep this optional so can be blank.
export default function Page() {
    const [auth, authLoaded] = useFirebaseAuth();
    const { error, resetError, updateAvatar, onUpdateProfile, onDeleteAccount } = use({ auth });

    if (error) return (
        <ErrorMessage {...{ error, resetError }} />
    );

    // TODO rename authLoaded to isLoading to save needing to use a boolean
    if (!authLoaded) return (
        <div>Loading...</div>
    );

    return (
        <div>
            <h1>Profile</h1>
            {auth.displayName && <h2>{auth.displayName}'s Profile</h2>}
            <p>{auth.email}</p>

            <div>
                <label htmlFor="avatar">
                    <img src={auth?.photoURL ?? defaultAvatar} alt="avatar" onError={e => e.target.src = defaultAvatar} style={{ width: 75, borderRadius: 50, cursor: "pointer" }} />
                </label>
                <input type="file" id="avatar" accept="image/jpeg" onChange={updateAvatar} style={{ display: "none" }} />
            </div>

            {/* TODO update user details form */}
            <SettingsProfileForm onUpdateProfile={onUpdateProfile} />

            {/* have this in red */}
            <Button onClick={onDeleteAccount} type="submit">Delete account</Button>
        </div>
    );
}

const use = ({ auth: user }) => {
    const { error, setError, resetError } = useError();
    const [, setLocation] = useLocation();

    const onUpdateProfile = async ({ name }) => {
        // do something if name exists
        // TODO error handling
        await updateProfile(user, { displayName: name });
        alert(`Your profile display name has been updated for ${name}`);
    };

    const updateAvatar = (e) => {
        new Compressor(e.target.files[0], {
            quality: 0.6, maxWidth: 1500, maxHeight: 1000,
            error(error) { setError(error); },
            async success(file) {
                try {
                    // file.name = "avatar";
                    // TODO return the url of the displayPhoto for this function
                    const photoURL = await uploadFile(file, `users/${user?.uid}/avatar`);
                    updateProfile(user, { photoURL });
                    alert(`Your profile picture has been updated 💚`); //NOTE to replace with a better message 
                } catch (error) { setError(error); }
            },
        });
    };


    const onDeleteAccount = async () => {
        try {
            alert(`Sad to see you leave ☹️`);
            await deleteUserAccount(user);
            setLocation("/");
        } catch (error) { setError(error); }
    };

    return { error, resetError, updateAvatar, onUpdateProfile, onDeleteAccount };
};



