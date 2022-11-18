import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { fireStorage, fireStore } from ".";

export async function uploadFile(user, file, filePath) {
    const fileRef = ref(fireStorage, filePath);

    const res = await uploadBytes(fileRef, file);
    return await getDownloadURL(res.ref);
}

export function uploadPhoto(user, file) {
    const imgRef = ref(fireStorage, `users/${user?.uid}/${file.name}`);
    const task = uploadBytesResumable(imgRef, file, { contentType: file.type, customMetadata: { /* TODO */ } });

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

    function onComplete(task, currentUser) {
        return async () => {
            const photoURL = await getDownloadURL(task.snapshot.ref);
            console.log('File available at', photoURL);

            await updateProfile(currentUser, { photoURL });
        };
    }

    // could maybe return the error somewhere here
    return task.on("state_changed", onRunning(), error => { throw error; }, onComplete(task, user));
}

export async function uploadProduct(user, product) {
    const productRef = doc(fireStore, `users/${user?.uid}/products/${product.uid}`);

    // upload product image
    console.log(product);

    // upload to the doc
    setDoc(productRef, product);
}
