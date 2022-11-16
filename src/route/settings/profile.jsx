import Button from "../../component/base/Button";
import SettingsProfileForm from "../../component/SettingsProfileForm";
import { useFirebaseAuthData } from "../../firebase/hooks";
import defaultAvatar from "../../assets/defaults/avatar.jpg";
import { doc } from "firebase/firestore";
import { fireStore, fireAuth, fireStorage } from "../../firebase";
import { useError } from "../../utils/hooks";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import Compressor from "compressorjs";

// NOTE using Github as a reference, it refreshes the page when changes are made
// Is this behaviour we want or do we want it to update with no refresh. They also
// keep this optional so can be blank.
export default function Page() {
    const [currentUser, done] = useFirebaseAuthData();
    const { update, updateAvatar, unregister, error, resetError } = use({ currentUser });

    if (!done) return (<div>Loading...</div>);

    return !error ? (
        <div>
            <h1>{currentUser.displayName}'s Profile</h1>

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

    const updateAvatar = (e) => {
        // get file, assumption that this exists given this event is only 
        // triggered when there is a change
        const rawFile = e.target.files[0];

        new Compressor(rawFile, {
            quality: 0.6, maxWidth: 1500, maxHeight: 1000,
            error(error) { setError(error); },
            async success(file) {
                // TODO when the file has finished compressing, upload to server
                const imgRef = ref(fireStorage, `users/${currentUser?.uid}/images`);
                const task = uploadBytesResumable(imgRef, file, { contentType: file.type, customMetadata: {/* TODO */ } });

                try {
                    const _ = task.on("state_changed",
                        snapshot => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload is ${progress}% done`);
                            switch (snapshot.state) {
                                case "paused":
                                    console.log("Upload is paused");
                                    break;
                                case "running":
                                    console.log("Upload is running");
                                    break;
                            }
                        },
                        error => setError(error),
                        async () => {
                            const photoURL = await getDownloadURL(task.snapshot.ref);
                            console.log('File available at', photoURL);

                            await updateProfile(currentUser, { photoURL });
                            alert(`Your profile picture has been updated`);
                        });
                } catch (error) {
                    setError(error);
                }
            },
        });
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

    return { update, updateAvatar, unregister, error, resetError };
};
