import { useState } from "preact/hooks";

export const useError = () => {
    const [error, setError] = useState();
    const resetError = () => setError(undefined);

    return { error, setError, resetError };
};
