import { signal } from "@preact/signals";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { fireAuth } from ".";

/**
 * This signal holds the context of the currently logged in user.
 */
export const authCtx = signal<User | null>(fireAuth.currentUser);

/**
 * This signal holds the context the current loading state.
 */
export const authLoading = signal(true);

// This is to avoid using the `withConverter` method as the data is just fields, no methods
type Data<T> = DocumentData | T;

export type ProductData = Data<{
    uid: string;
    title: string;
    description?: string;
    quantity: number;
    thumbnailUrl?: string;
}>;

export type UserData = Data<{
    name: string;
    username: string;
    // dietaryRequirements?: string[];
    // rating: number;
}>;
