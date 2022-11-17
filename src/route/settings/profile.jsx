import Button from "../../component/base/Button";
import SettingsProfileForm from "../../component/SettingsProfileForm";
import { useFirebaseAuthData } from "../../firebase/hooks";
import defaultAvatar from "../../assets/defaults/avatar.jpg";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { fireStore, fireStorage } from "../../firebase";
import { useError } from "../../utils/hooks";
import { deleteUser, updateProfile } from "firebase/auth";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Compressor from "compressorjs";
import { uploadPhoto } from "../../firebase/functions";
import ErrorMessage from "../../component/base/ErrorMessage";
import { useLocation } from "wouter-preact";

// NOTE using Github as a reference, it refreshes the page when changes are made
// Is this behaviour we want or do we want it to update with no refresh. They also
// keep this optional so can be blank.
export default function Page() {
    // const [currentUser, done] = useFirebaseAuthData();
    const { update, updateAvatar, unregister, error, resetError } = use({ currentUser });

    if (!done) return (<div>Loading...</div>);

    return !error ? (
        <div>
            <h1>Profile</h1>
            {currentUser.displayName && <h2>{currentUser.displayName}'s Profile</h2>}
            <p>{currentUser.email}</p>

            <div>
                <label htmlFor="avatar">
                    <img src={currentUser?.photoURL ?? defaultAvatar} alt="avatar" onError={e => e.target.src = defaultAvatar} style={{ width: 75, borderRadius: 50, cursor: "pointer" }} />
                </label>
                <input type="file" id="avatar" accept="image/jpeg" onChange={updateAvatar} style={{ display: "none" }} />
            </div>

            {/* TODO update user details form */}
            <SettingsProfileForm update={update} />

            {/* have this in red */}
            <Button onClick={unregister} type="submit">Delete account</Button>
        </div>
    ) : <ErrorMessage error={error} resetError={resetError} />;
}

const use = ({ currentUser }) => {
    const { error, setError, resetError } = useError();

    const update = async ({ name }) => {
        // do something if name exists
        // TODO error handling
        await updateProfile(currentUser, { displayName: name });
        alert(`Your profile display name has been updated for ${name}`);
    };

    const updateAvatar = (e) => {
        new Compressor(e.target.files[0], {
            quality: 0.6, maxWidth: 1500, maxHeight: 1000,
            error(error) { setError(error); },
            async success(file) {
                try {
                    file.name = "avatar";
                    // TODO return the url of the displayPhoto for this function
                    uploadPhoto(currentUser, file);
                    alert(`Your profile picture has been updated 💚`);
                } catch (error) { setError(error); }
            },
        });
    };

    const [, setLocation] = useLocation();

    const unregister = async (e) => {
        const userRef = ref(fireStorage, `users/${currentUser.uid}`);
        const colRef = doc(fireStore, `users/${currentUser.uid}`);
        try {
            await Promise.all([deleteDoc(colRef), deleteObject(userRef), deleteUser(currentUser)]);

            alert(`Sad to see you leave ☹️`);
            setLocation("/");
        } catch (error) { setError(error); }
    };

    return { update, updateAvatar, unregister, error, resetError };
};



