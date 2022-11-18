import { DocumentData } from "firebase/firestore";

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
