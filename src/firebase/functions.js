import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { fireStorage } from ".";

export function uploadPhoto(currentUser, file) {
    const imgRef = ref(fireStorage, `users/${currentUser?.uid}/${file.name}`);
    const task = uploadBytesResumable(imgRef, file, { contentType: file.type, customMetadata: { /* TODO */ } });
    // could maybe return the error somewhere here
    task.on("state_changed", onRunning(), onError(), onComplete(task, currentUser));
}

function onComplete(task, currentUser) {
    return async () => {
        const photoURL = await getDownloadURL(task.snapshot.ref);
        console.log('File available at', photoURL);

        await updateProfile(currentUser, { photoURL });
    };
}

function onRunning() {
    return snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
            case "paused":
                console.log("Upload is paused");
                break;
            case "running":
                console.log(`Upload is ${progress}% done`);
                break;
        }
    };
}

function onError() {
    return (error) => { throw error; };
}