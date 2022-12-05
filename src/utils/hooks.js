import { useState } from "preact/hooks";

export const useError = (error) => {
    const [e, setError] = useState(error);
    const resetError = () => setError(undefined);
    return { error: e, setError, resetError };
};
