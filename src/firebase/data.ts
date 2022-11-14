import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export type Profile = Pick<User, "uid"> & {
    dietaryRequirements?: string[];
    rating: number;
};

export type ProductData = DocumentData | {
    uid: string;
    title: string;
    quantity: number;
    thumbnailUrl?: string;
};

export type UserData = DocumentData | {
    name: string;
    username: string;
};