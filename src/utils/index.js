// This js function is being used inside a Typescript script
// An example of how we are able to use both with compromising usability
export const addOne = (a) => a + 1;

/**
 * Throws an error is passwords are not equal
 */
export function validateEmailAndPassword(email, password, repeatPassword) {
    if (password !== (repeatPassword))
        throw new Error("passwords do not match");
}