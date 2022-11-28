// This js function is being used inside a Typescript script
export * from "./hooks";
export * from "./store";

import Compressor from "compressorjs";

// An example of how we are able to use both with compromising usability
export const addOne = (a) => a + 1;

/**
 * Throws an error if `password` and `repeatPassword` are not equal
 */
export function validateEmailAndPassword(email, password, repeatPassword) {
    if (password !== (repeatPassword))
        throw new Error("passwords do not match");
}

/**
 * Throws an error if one occurs
 * 
 * @param {*} file 
 * @param {*} success 
 * @returns 
 */
export const compressFile = (file, success, error) => {
    return new Compressor(file, {
        quality: 0.6, maxWidth: 1500, maxHeight: 1000,
        success, error,
    });
};

export const relativeDays = (time, dateFormatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' })) => {
    return dateFormatter.format(Math.round((time - Date.now()) / (1_000 * 3_600 * 24)), "days");
};

export const onDisabledLink = (e) => {
    e.preventDefault();

    alert(`Resource currently not implemented`);
};