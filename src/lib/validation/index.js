/**
 * Throws an error if `password` and `repeatPassword` are not equal
 */
export function validateEmailAndPassword(email, password, repeatPassword) {
    if (password !== (repeatPassword))
        throw new Error("passwords do not match");
}
