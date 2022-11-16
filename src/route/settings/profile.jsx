import Button from "../../component/base/Button";
import ProfileUpdateForm from "../../component/ProfileUpdateForm";
import { useFirebaseAuthData } from "../../firebase/hook";
import defaultAvatar from "../../assets/defaults/avatar.jpg";
import { doc } from "firebase/firestore";
import { fireStore, fireAuth } from "../../firebase";
import { useError } from "../../utils/hooks";
import { updateCurrentUser, updateProfile } from "firebase/auth";

// NOTE using Github as a reference, it refreshes the page when changes are made
// Is this behaviour we want or do we want it to update with no refresh. They also
// keep this optional so can be blank.
export default function Page() {
    const [currentUser, done] = useFirebaseAuthData();
    const { update, unregister, error, resetError } = use({ currentUser });

    if (!done) return (<div>Loading...</div>);

    return !error ? (
        <div>
            <h1>{currentUser.displayName}'s Profile</h1>

            <div>
                <label htmlFor="avatar">
                    <img src={currentUser?.photoURL ?? defaultAvatar} alt="avatar" onError={e => e.target.src = defaultAvatar} style={{ width: 75, borderRadius: 50, cursor: "pointer" }} />
                </label>
                <input type="file" id="avatar" accept="image/jpeg" style={{ display: "none" }} />
            </div>

            {/* TODO update user details form */}
            <ProfileUpdateForm update={update} />

            {/* have this in red */}
            <Button onClick={unregister} type="submit">Delete account</Button>
        </div>
    ) : <button onClick={resetError}>reset</button>;
}

const use = ({ currentUser }) => {
    const { error, setError, resetError } = useError();

    const update = async ({ name }) => {
        if (name) {
            // do something if name exists
            // TODO error handling
            await updateProfile(currentUser, { displayName: name });
            alert(`Profile updated for ${name}`);
        }
    };

    const updatePhotoURL = () => {
        try {
            // updateProfile(auth, { photoURL: `` });

        } catch (error) {
            setError(error);
        }

    };

    const unregister = (e) => {
        console.log(e);

        try {
            // delete top level collection for you: `users/${USER_ID}`

            // delete images associated with user: `images/${USER_ID}`
            const docRef = doc(fireStore, `users/${currentUser.uid}`);

        } catch (error) {
            setError(error);
        }
    };

    return { update, updatePhotoURL, unregister, error, resetError };
};
