import { updateCurrentUser, updateProfile, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Ref, useRef } from "preact/hooks";
import IsLoading from "../../component/IsLoading";
import { fireStorage, fireStore } from "../../firebase";
import { UserData } from "../../firebase/data";
import Compressor from 'compressorjs';

import { useFirebaseAuthData, useFirebaseDocumentData } from "../../firebase/hook";

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);

    const [auth,] = useFirebaseAuthData();

    console.log(auth?.photoURL); //this is updating twice for some reason
    const { done, user } = use({ auth, formRef });


    return done ? (
        <div>
            <h1>Settings {auth ? auth.displayName : "User"}</h1>
            {auth && (<img style={{ borderRadius: 50, width: 100 }} src={auth.photoURL ?? ""} alt={auth.displayName ?? ""} />)}

            <form ref={formRef} onSubmit={user.update}>
                <label htmlFor="name">
                    <span>Name</span>
                    <input pattern="^[\S+]+[\S\s]+" type="text" name="name" id="name" placeholder="Enter a name" />
                </label>

                <label htmlFor="username">
                    <span>Username</span>
                    <input pattern="^[\S+]+[\S\s]+" type="text" name="username" id="username" placeholder="Enter a username" />
                </label>

                <label htmlFor="image">
                    <span>Image</span>
                    {/* FIXME mustn't be required */}
                    <input required type="file" id="thumbnail" name="thumbnail" accept="image/png, image/jpeg"></input>
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    ) : <IsLoading />;
}

const use = ({ auth, formRef }: { auth: User | null; formRef: Ref<HTMLFormElement>; }) => {
    const [userData, , userPending] = useFirebaseDocumentData<UserData>(store => {
        return doc(store, `users/${auth?.uid}`);
    }, []);

    const user = {
        data: userData,
        // TODO update just the docRef
        async update(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const formData = new FormData(formRef.current!);
            const [name, username, file] = [...formData.values()];


            const docRef = doc(fireStore, `users/${auth?.uid}`);
            const _ = await setDoc(docRef, { name, username });
            // if value is the same then reject

            if (file) {
                // FIXME: make file optional
                const _ = new Compressor(file as File, {
                    // NOTE: maxWidth and maxHeight could be smaller
                    quality: 0.6, maxWidth: 1500, maxHeight: 1000, error: (error) => console.error(error),
                    async success(file) {
                        const fileRef = ref(fireStorage, `image/`);

                        const _ = await uploadBytes(fileRef, file);
                        const photoURL = await getDownloadURL(fileRef);

                        // profile updates displayName and photoURL
                        auth && await updateProfile(auth, { displayName: name.toString(), photoURL });
                    },
                });

            }
        }
    };

    return { done: !(userPending), user };
};;