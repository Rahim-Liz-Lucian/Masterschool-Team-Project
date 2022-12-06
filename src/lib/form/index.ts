import { Ref, useRef } from "preact/hooks";
import { JSX } from "preact/compat";
import { compressFile } from "../io";
import { updateProfile, User } from "firebase/auth";
import { registerUser, signInUser, updateUserProfile, uploadProduct } from "../firebase";
import { useLocation } from "wouter-preact";
import { validateEmailAndPassword } from "../validation";

type Handler<T> = T extends Ref<infer E extends EventTarget> ? JSX.GenericEventHandler<E> : never;
type Inputs = Record<string, HTMLInputElement>;

export const useSignInForm = () => {
    const form = useRef<HTMLFormElement>(null);
    const [, setLocation] = useLocation();

    const handleSignIn: Handler<typeof form> = async e => {
        e.preventDefault();

        // @ts-ignore
        // FIXME This is not type-safe and `namedItem` would be preferred 
        const { email, password }: Inputs = form.current!.elements;

        try {
            await signInUser(email.value, password.value);

            alert(`successfully signed in 💚`);
            setLocation("/");
        } catch (error) {
            alert(`sign-in error: ${(error as Error).message}`);
        }
    };

    return { form, handleSignIn };
};

export const useSignUpForm = () => {
    const form = useRef(null);
    const [, setLocation] = useLocation();

    const handleRegister: Handler<typeof form> = async (e) => {
        e.preventDefault();

        // @ts-ignore
        // FIXME This is not type-safe and `namedItem` would be preferred 
        const { email, password, repeatPassword, displayName, city, phoneNumber }: Inputs = form.current!.elements;

        try {
            validateEmailAndPassword(email.value, password.value, repeatPassword.value);

            const { user } = await registerUser(email.value, password.value);

            const details = {
                displayName: displayName.value,
                phoneNumber: phoneNumber.value,
                email: email.value,
                location: {
                    city: city.value
                }
            };

            await updateUserProfile(user, { displayName, phoneNumber, email, location: { city } });

            alert(`successfully signed out 👋🏿`);
            setLocation("/");
        } catch (error) {
            alert(`sign-up error: ${(error as Error).message}`);
        }
    };

    return { form, handleRegister };
};

export const useUploadForm = (user: User | null) => {
    const form = useRef<HTMLFormElement>(null);

    const handleUpload: Handler<typeof form> = e => {
        e.preventDefault();

        // @ts-ignore
        // FIXME This is not type-safe and `namedItem` would be preferred 
        const { title, description, expirationDate, thumbnail }: Inputs = form.current!.elements;

        const product = {
            title: title.value,
            description: description.value ?? "",
            // TODO tags: formData.tags
            expirationDate: new Date(expirationDate.value),
            createdAt: new Date(),
        };

        compressFile(thumbnail.files![0], async file => {
            try {
                await uploadProduct(user, { product, file });
                alert(`product has been uploaded 💚`);
            } catch (error) {
                alert(`uploading product error: ${(error as Error).message}`);
            }
        }, error => alert(`compressing file error: ${error.message}`));
    };

    return { form, handleUpload };
};

export const useUpdateProfileForm = (user: User) => {
    const form = useRef<HTMLFormElement>(null);

    const handleUpdateProfile: Handler<typeof form> = async e => {
        e.preventDefault();

        // @ts-ignore
        // FIXME This is not type-safe and `namedItem` would be preferred 
        const { displayName, city, phoneNumber }: Inputs = form.current.elements as Inputs;


        try {
            // TODO update user displayName, city & phoneNumber
            await updateProfile(user, { displayName: displayName.value });
            alert(`Your profile display name has been updated for ${displayName}`);
        } catch (error) {
            alert(`updating user details error: ${(error as Error).message}`);
        }
    };


    return { form, handleUpdateProfile };
};

