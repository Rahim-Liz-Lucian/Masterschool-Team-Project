/**
 * Throws an error if `password` and `repeatPassword` are not equal
 */
export function validateEmailAndPassword(email: string, password: string, repeatPassword: string) {
    if (password !== (repeatPassword))
        throw new Error("passwords do not match");
}
