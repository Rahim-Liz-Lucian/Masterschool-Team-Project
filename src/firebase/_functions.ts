import { User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireStorage } from ".";

export async function uploadFile(user: User, file: File, filePath: string) {
    const fileRef = ref(fireStorage, filePath);

    const res = await uploadBytes(fileRef, file);
    return await getDownloadURL(res.ref);
}